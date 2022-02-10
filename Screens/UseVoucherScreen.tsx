import React, { useState, useEffect, Fragment } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Keyboard, ScrollView,Image, Dimensions } from 'react-native';
import AppInput from '../Components/AppInput';
import BarCodeReader from '../Components/BarCodeReader';
import Bonus, {IVouchers, IUseVoucherRequest} from '../services/Bonus';
import PointModal from '../Components/PointModal';
import AppButton from '../Components/AppButton';
import { validateAmountInput } from '../services/commonServices';
import CheckBox from '@react-native-community/checkbox';


export interface IUserInfo {
    amount: number | string | undefined,
    score: number | string | undefined,
    initials: string | undefined,
    clientStatus: string | undefined
    vouchers?: any[]
}


const ManagePoints = (props: any) => {


    const [step, setStep] = useState<number>(0);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [scanCode, setScanCode] = useState<boolean>(false);
    const [scannedCode, setScannedCode] = useState<string>('');
    const [btnLoading, setBtnLoading] = useState<boolean>(false);
    const [amount, setAmount] = useState<string>('');
    const [voucher, setVoucher] = useState<IVouchers>();
    const [discountAmount, setDiscountAmount] = useState<number | undefined>(0);
    const [userInfo, setUserInfo] = useState<IUserInfo>();
    const [errorMessage, setErrorMessage] = useState<string | undefined>('');

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", keyboardDidShow);
        // cleanup function
        return () => {
            Keyboard.removeListener("keyboardDidShow", keyboardDidShow);
        };
    }, []);

    useEffect(() => {
        if(amount !== '' && voucher !== undefined) {
            let newPrice = Number(amount) -  (Number(amount) * (voucher?.discountPercentage!/100));
            setDiscountAmount(newPrice);
        } else {
            setDiscountAmount(undefined);
        } 
    }, [amount, voucher]);

    useEffect(() => {
        if (scannedCode?.length === 16) GetUserInfo();

    }, [scannedCode]);

  

    const keyboardDidShow = () => setScanCode(false);

    const getScannedValue = (value: any) => {
        setScannedCode(value);
        if (value) {
            setScanCode(false);
        };
    };

    const handleCardNumber = (value: string) => {
        let reg = new RegExp('^[0-9]+$');
        if (!reg.test(value) && value.length !== 0) {
            return;
        } else {
            setScannedCode(value)
        }
    };

    const handleAmount = (value: string) => {
        if (validateAmountInput(value)) {
            if(voucher !== undefined) {
                let newPrice = Number(amount) -  (Number(value) * (voucher?.discountPercentage!/100));
                setDiscountAmount(newPrice);
            };
            setAmount(value.trim());
        };
    };
    
    const GetUserInfo = () => {
        setBtnLoading(true);
        setErrorMessage('');
        Bonus.GetAccountInfo(scannedCode).then(res => {
            console.log(res.data.data)
            if (res.data.success) {

                setUserInfo({
                    amount: res.data.data?.amount,
                    score: res.data.data?.score,
                    initials: res.data.data?.initials,
                    clientStatus: res.data.data?.clientStatus,
                    vouchers: res.data.data?.vouchers

                });
            } else {
                setErrorMessage(res.data.error?.errorDesc)
            };
            setBtnLoading(false);
        }).catch((e) => { console.log((e)); setBtnLoading(false) })
    };


    


    const onCloseModal = () => {
        setUserInfo({ amount: 0, score: 0, initials: '', clientStatus: '' });
        setScannedCode('');
        setAmount('');
        setShowModal(false);
    };

    const handleSetVoucher = (v: IVouchers) => {
        if(v.voucherCode === voucher?.voucherCode) {
            setVoucher(undefined)
        } else {
            setVoucher(v)
        };
    };

    const handleUseVoucher = () => {
        if(!amount || !scannedCode) {
            return;
        };
        setBtnLoading(true);
        let data: IUseVoucherRequest = {
            card: scannedCode,
            voucherCode: voucher?.voucherCode!,
            initialAmount: amount,
            amount: discountAmount!
        }

        Bonus.UseVoucher(data).then(res => {
            setBtnLoading(false);
            setStep(1);
        }).catch(e => {
            console.log(e);
            setBtnLoading(false);
        })
    };


    let PayStep = null;
    if (step === 0) {
        PayStep = (
            <View style={{ marginHorizontal: 10, flex: 8, justifyContent: 'space-between' }}>

                <AppInput
                    label='ბარათი'
                    keyboardType='numeric'
                    maxLength={16}
                    value={scannedCode}
                    error={scannedCode.length < 16 ? 'ბარათის ნომერი უნდა შედგებოდეს 16 ციფრისგან' : ''}
                    onChangeText={(newValue: string) => handleCardNumber(newValue)}
                />
                <AppInput
                    label='თანხა'
                    keyboardType='number-pad'
                    error={amount === '' ? 'გთხოვთ შეავსოთ ველი' : ''}
                    value={amount}
                    onChangeText={(newValue: string) => handleAmount(newValue)}
                    editable={errorMessage !== '' ? false : true} />
                
                    <View>
                        {
                             userInfo?.vouchers!.map((v, i) => (
                                <TouchableOpacity style={styles.checkBox} onPress={() => handleSetVoucher(v)} key={i}>
                                    <CheckBox value={voucher?.voucherCode === v.voucherCode ? true : false} onChange={() => handleSetVoucher(v)} />
                                    <Text style={{color: 'black', fontSize: 14}}>{v.discountPercentage + ' % ' + v.voucherDescription}</Text>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                   
                

                {discountAmount && voucher !== undefined?
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{color: 'black', fontSize: 20}}>ფასდაკლებული თანხა: </Text>
                        <Text style={{color: 'black', fontSize: 20}}>{discountAmount || ''}</Text>
                    </View> : null}
                <View >
                    <TouchableOpacity style={styles.button} onPress={() => { setScanCode(true); Keyboard.dismiss() }}>
                        <Text style={styles.btntext}>ბარათის დასკანერება</Text>
                    </TouchableOpacity>
                    <AppButton 
                      buttonTitle = {'გადახდა'}
                      isLoading = {btnLoading} 
                      onPress ={handleUseVoucher}
                      btnStyle = {styles.button}
                      titleStyle = {styles.btntext}/>
                       

                </View>
                <View style={{ marginTop: 30 }}>
                    <Text style={[styles.infoText, { marginBottom: 30 }]}>ბარათის ინფორმაცია: </Text>
                    {errorMessage ?
                        <Text style={[styles.infoText, styles.infoError]}>{errorMessage} </Text>
                        :
                        userInfo !== undefined ?
                            <Fragment>
                                <Text style={styles.infoText}>მფლობელი: {userInfo!.initials!} </Text>
                                <Text style={styles.infoText}>ხელმისაწვდომი თანხა: {userInfo!.amount!} </Text>
                                <Text style={styles.infoText}>ხელმისაწვდომი ქულა: {userInfo!.score!} </Text>
                                <Text style={styles.infoText}>კლიენტის სტატუსი: {userInfo!.clientStatus}</Text>
                            </Fragment>
                            : null
                    }
                </View>
            </View>
        );
    } else {
        PayStep = (
            <View style={{flex: 1, height: Dimensions.get('window').height- 150, justifyContent: 'center', alignItems: 'center'}}>
                 <Image source = {require('../assets/images/success_mark.png')} style = {{width: 70, height: 70}} />
                 <Text style={{fontSize: 20, color: 'black'}}>გადახდა წარმატებით დასრულდა</Text>   
            </View>
        )
    }

    return (
        <ScrollView keyboardShouldPersistTaps='always' style={{ flex: 1 }}>
            {showModal && <PointModal modalVisible={showModal} closeModal={onCloseModal} />}
            {scanCode ? <View style={{ flex: 4, backgroundColor: '#130D1E', opacity: 0.8, }}>
                <BarCodeReader getValue={getScannedValue} />
            </View> : null}
            {PayStep}
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 60,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        backgroundColor: '#012d08',
    },

    btntext: {
        fontSize: 16,
        fontWeight: '500',
        color: 'white'
    },

    infoText: {
        fontWeight: '700',
        fontSize: 16,
        color: '#000'
    },

    infoError: {
        color: '#E50B09'
    },
    checkBox: {
        flexDirection: 'row',
        alignItems: 'center'

    }

});

export default ManagePoints;

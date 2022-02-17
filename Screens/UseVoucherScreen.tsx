import React, { useState, useEffect, Fragment } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Keyboard, ScrollView, Image, Dimensions } from 'react-native';
import AppInput from '../Components/AppInput';
import BarCodeReader from '../Components/BarCodeReader';
import Bonus, { IVouchers, IUseVoucherRequest } from '../services/Bonus';
import PointModal from '../Components/PointModal';
import AppButton from '../Components/AppButton';
import { validateAmountInput } from '../services/commonServices';
import CheckBox from '@react-native-community/checkbox';
import { formatDate, formatNumber } from '../utils/Utils';
import VoucherSuccessModal from '../Components/VoucherSuccessModal';


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

    const [voucher, setVoucher] = useState<IVouchers>();
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





    const handleSetVoucher = (v: IVouchers) => {
        if (v.voucherCode === voucher?.voucherCode) {
            setVoucher(undefined)
        } else {
            setVoucher(v)
        };
    };

    const handleUseVoucher = () => {
        if (!scannedCode || !voucher?.voucherCode) {
            return;
        };
        setBtnLoading(true);
        let data: IUseVoucherRequest = {
            card: scannedCode,
            voucherCode: voucher?.voucherCode!,


        }

        Bonus.UseVoucher(data).then(res => {
            setBtnLoading(false);
            setShowModal(true);
        }).catch(e => {
            console.log(e);
            setBtnLoading(false);
        })
    };

    const onCloseModal = () => {
        setShowModal(false);
        setUserInfo(undefined);

    }

    console.log(userInfo?.vouchers)

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


                <View>

                    {
                        scannedCode.length === 16 && userInfo?.vouchers?.length === 0 ?
                            <View style={styles.noTransactions}>
                                <Image style={styles.searchIcon} source={require('../assets/images/search.png')} />
                                <Text style={{ fontSize: 18, textAlign: 'center' }}>ვაუჩერები არ მოიძებნა</Text>
                            </View>
                            :
                            userInfo?.vouchers!.map((v: IVouchers, i) => (
                                <TouchableOpacity style={styles.checkBox} onPress={() => handleSetVoucher(v)} key={i}>
                                    <CheckBox value={voucher?.voucherCode === v.voucherCode ? true : false} onChange={() => handleSetVoucher(v)} />
                                    <View>
                                        <Text style={[styles.infoText, { fontSize: 16, lineHeight: 22 }]}>{v.voucherDescription}</Text>
                                        <Text style={[styles.infoText, { fontSize: 14, lineHeight: 22 }]}>მოქმედების ვადა: {formatDate(v.voucherStartDate) + ' - ' + formatDate(v.voucherEndDate)}</Text>
                                        <Text style={[styles.infoText, { fontSize: 14, lineHeight: 22 }]}>რაოდენობა: {v.numberOfVouchers}</Text>
                                    </View>

                                </TouchableOpacity>
                            ))


                    }
                </View>
                <View >
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#475264' }]} onPress={() => { setScanCode(true); Keyboard.dismiss() }}>
                        <Text style={styles.btntext}>ბარათის დასკანერება</Text>
                    </TouchableOpacity>
                    <AppButton
                        buttonTitle={'ვაუჩერის განაღდება'}
                        isLoading={btnLoading}
                        onPress={handleUseVoucher}
                        btnStyle={styles.button}
                        titleStyle={styles.btntext} />


                </View>
                <View style={{ marginTop: 30 }}>
                    <Text style={[styles.infoText, { marginBottom: 30 }]}>ბარათის ინფორმაცია: </Text>
                    {errorMessage ?
                        <Text style={[styles.infoText, styles.infoError]}>{errorMessage} </Text>
                        :
                        userInfo !== undefined ?
                            <Fragment>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.infoText}>მფლობელი:  </Text>
                                    <Text style={styles.descText}>{userInfo.initials}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.infoText}>ხელმისაწვდომი თანხა:  </Text>
                                    <Text style={styles.descText}>{formatNumber(userInfo.amount)} ₾</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.infoText}>ხელმისაწვდომი ქულა: </Text>
                                    <Text style={styles.descText}> {formatNumber(userInfo.score)}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.infoText}>კლიენტის სტატუსი: </Text>
                                    <Text style={styles.descText}>{userInfo.clientStatus}</Text>
                                </View>
                             
                            </Fragment>
                            : null
                    }
                </View>
            </View>
        );
    } else {
        PayStep = (
            <View style={{ flex: 1, height: Dimensions.get('window').height - 150, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../assets/images/success_mark.png')} style={{ width: 70, height: 70 }} />
                <Text style={{ fontSize: 20, color: 'black' }}>ოპერაცია წარმატებით დასრულდა</Text>
            </View>
        )
    }

    return (
        <ScrollView keyboardShouldPersistTaps='always' style={{ flex: 1 }}>
            {scanCode ? <View style={{ flex: 4, backgroundColor: '#130D1E', opacity: 0.8, }}>
                <BarCodeReader getValue={getScannedValue} />
            </View> : null}
            {PayStep}
            {showModal && <VoucherSuccessModal modalVisible={showModal} closeModal={onCloseModal} />}
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
        backgroundColor: '#228B22',
    },

    noTransactions: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    searchIcon: {
        width: 30,
        height: 30,
        marginRight: 10
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
        marginBottom: 15,
        alignItems: 'flex-start',

    },
    descText: {
        fontWeight: '400',
        fontSize: 16,
        color: '#000'
    },
});

export default ManagePoints;

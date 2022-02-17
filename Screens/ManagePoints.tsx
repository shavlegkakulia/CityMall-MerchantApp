import React, { useState, useEffect, Fragment } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Keyboard, ScrollView, Alert } from 'react-native';
import AppInput from '../Components/AppInput';
import BarCodeReader from '../Components/BarCodeReader';
import Bonus from '../services/Bonus';
import PointModal from '../Components/PointModal';
import OtpBox from '../Components/OtpBox/OtpBox';
import AppButton from '../Components/AppButton';
import { validateAmountInput } from '../services/commonServices';
import { formatNumber } from '../utils/Utils';


const ManagePoints = (props: any) => {

    const { type } = props.route.params;

    const [step, setStep] = useState<number>(0);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [scanCode, setScanCode] = useState<boolean>(false);
    const [scannedCode, setScannedCode] = useState<string>('');
    const [btnLoading, setBtnLoading] = useState<boolean>(false);
    const [amount, setAmount] = useState<string>('');
    const [userInfo, setUserInfo] = useState<any>({ amount: 0, score: 0, initials: '', clientStatus: '', vouchers: [], spendRate: {} });
    const [errorMessage, setErrorMessage] = useState<string | undefined>('');
    const [accumulationInfo, setAccumulationInfo] = useState<any>({ initials: '', bonus: 0, availableBonus: 0, clientStatus: '', spendRate: {} });


    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", keyboardDidShow);
        // cleanup function
        return () => {
            Keyboard.removeListener("keyboardDidShow", keyboardDidShow);
        };
    }, []);

    const keyboardDidShow = () => setScanCode(false);


    const getScannedValue = (value: any) => {
        setScannedCode(value);
        if (value) {
            setScanCode(false);
        };
    };

    useEffect(() => {
        if (scannedCode?.length === 16) GetUserInfo();

    }, [scannedCode]);

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
            setAmount(value.trim())
        }

    }

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
                    vouchers: res.data.data?.vouchers,
                    spendRate: res.data.data?.spendRate
                });
            } else {
                setErrorMessage(res.data.error?.errorDesc)
            };
            setBtnLoading(false);
        }).catch((e) => { console.log((e)); setBtnLoading(false) })
    };

    const collectPoints = () => {
        setErrorMessage('');
        if (!scannedCode || !amount || amount === '0' || scannedCode.length < 16) return;
        Keyboard.dismiss();
        setBtnLoading(true);
        let data = {
            card: scannedCode,
            amount: amount,
            batchId: "1",
            productId: 1
        };
        Bonus.CollectPoints(data).then(res => {
            if (res.data.success) {
                setAccumulationInfo({
                    initials: userInfo.initials,
                    clientStatus: userInfo.clientStatus,
                    bonus: res.data.data?.accumulatedBonus,
                    availableBonus: res.data.data?.availableScore
                });
                setShowModal(true);
            } else {
                setErrorMessage(res.data.error?.errorDesc)

            };
            setBtnLoading(false)
        }).catch(e => setBtnLoading(false));
    };

    const sendOtp = () => {
        if (!scannedCode || !amount || amount === '0' || (scannedCode.length < 16 && scannedCode.length !== 11)) return;
        if (amount > userInfo.amount) {
            Alert.alert(
                'შეცდომა!',
                'ანგარიშზე არ არის საკმარისი თანხა'
            );
            return;
        }
        setStep(step + 1);
    };

    const PayWithPoints = (otp: string) => {
        setErrorMessage('');
        setBtnLoading(true);
        let data = {
            card: scannedCode,
            amount: Number(amount),
            batchId: "1",
            otp: otp,
            deviceTranId: "1"
        };
        Bonus.PayWithPoints(data).then(res => {
            if (res.data.success) {
                setAccumulationInfo({
                    initials: userInfo.initials,
                    clientStatus: userInfo.clientStatus,
                    bonus: res.data.data?.spentBonus,
                    availableBonus: res.data.data?.availableScore,
                    spendRate: userInfo.spendRate
                });
                setStep(0);
                setShowModal(true);
            } else {
                setErrorMessage(res.data.error?.errorDesc)
            };
            setBtnLoading(false);
        });
    };

    const onCloseModal = () => {
        setUserInfo({ amount: 0, score: 0, initials: '', clientStatus: '' });
        setScannedCode('');
        setAmount('');
        setShowModal(false);
        setAccumulationInfo({ initials: '', bonus: 0, availableBonus: 0, clientStatus: '' });
    };


    let PayStep = null;
    if (step === 0) {
        PayStep = (
            <View style={{ marginHorizontal: 10, flex: 8, justifyContent: 'space-between' }}>

                <AppInput
                    label='ბარათი / პირადი ნომერი'
                    keyboardType='numeric'
                    maxLength={16}
                    value={scannedCode}
                    error={scannedCode.length !== 11 && scannedCode.length < 16 ? 'შეიყვანეთ ბარათის ან პირადი ნომერი' : ''}
                    onChangeText={(newValue: string) => handleCardNumber(newValue)}
                />
                <AppInput
                    label='თანხა(ლარი)'
                    keyboardType='number-pad'
                    error={amount === '' ? 'გთხოვთ შეავსოთ ველი' : ''}
                    value={amount}
                    onChangeText={(newValue: string) => handleAmount(newValue)}
                    editable={errorMessage !== '' ? false : true} />
                <View >
                    {!scanCode ?
                        <TouchableOpacity style={[styles.button, { backgroundColor: '#475264' }]} onPress={() => { setScanCode(true); Keyboard.dismiss() }}>
                            <Text style={styles.btntext}>კოდის დასკანერება</Text>
                        </TouchableOpacity> : null}
                    {type === 'Pay' ?
                        <AppButton
                            btnStyle={[styles.button, styles.buttonPay]}
                            buttonTitle='ქულებით გადახდა'
                            titleStyle={styles.btntext}
                            onPress={sendOtp}
                            isLoading={btnLoading} />
                        :
                        <AppButton
                            btnStyle={[styles.button, styles.buttonCollect]}
                            buttonTitle='ქულების დაგროვება'
                            titleStyle={styles.btntext}
                            onPress={collectPoints}
                            isLoading={btnLoading} />}
                </View>
                <View style={{ marginTop: 30 }}>
                    <Text style={[styles.infoText, { marginBottom: 30 }]}>ბარათის ინფორმაცია: </Text>
                    {errorMessage ?
                        <Text style={[styles.infoText, styles.infoError]}>{errorMessage} </Text>
                        :
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
                            {
                                type === 'Pay' ?
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={styles.infoText}> ქულების შეფარდება: </Text>
                                        <Text style={styles.descText}> {`${userInfo.spendRate['bonus']} ქულა = ${userInfo.spendRate['amount']} ₾`} </Text>
                                    </View>
                                    :
                                    null
                            }
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.infoText}>კლიენტის სტატუსი: </Text>
                                <Text style={styles.descText}>{userInfo.clientStatus}</Text>
                            </View>
                            <Text style={styles.infoText}>აქტიური ვაუჩერები: </Text>
                            {
                                userInfo.vouchers !== undefined && userInfo?.vouchers.map((v: any, i: number) => (
                                    <Text style={styles.descText} key={i}>- {v.voucherDescription}</Text>
                                ))
                            }
                        </Fragment>
                    }
                </View>
            </View>
        );
    } else if (step === 1) {
        PayStep = <OtpBox
            count={4}
            card={scannedCode}
            makePayment={PayWithPoints}
            btnLoading={btnLoading}
            errorMessage={errorMessage}
            serviceType='collectPoints'
            OtpHeaderText='გთხოვთ შეიყვანოთ ბარათის მფლობელის მობილურზე გამოგზავნილი კოდი' />
    };

    return (
        <ScrollView keyboardShouldPersistTaps='always' style={{ flex: 1 }}>
            {showModal && <PointModal modalVisible={showModal} closeModal={onCloseModal} collectInfo={accumulationInfo} type={type} />}
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
        borderRadius: 7
    },

    buttonCollect: {
        backgroundColor: '#3269E5',
    },

    buttonPay: {
        backgroundColor: '#ffda02',
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

    descText: {
        fontWeight: '400',
        fontSize: 16,
        color: '#000'
    },
    infoError: {
        color: '#E50B09'
    }

});

export default ManagePoints;

import React, { useState, useEffect, Fragment } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Keyboard } from 'react-native';
import AppInput from '../Components/AppInput';
import BarCodeReader from '../Components/BarCodeReader';
import Bonus from '../services/Bonus';
import PointModal from '../Components/PointModal';
import OtpBox from '../Components/OtpBox/OtpBox';
import { getUniqueId } from 'react-native-device-info';
import { addTransaction, ITransaction } from '../services/TransactionService';
import AppButton from '../Components/AppButton';
import { ScrollView } from 'react-native-gesture-handler';

const ManagePoints = (props: any) => {

    const { type } = props.route.params;

    const [step, setStep] = useState<number>(0);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [scannCode, setScannCode] = useState<boolean>(false);
    const [scannedCode, setScannedCode] = useState<string>('');
    const [btnLoading, setBtnLoading] = useState<boolean>(false);
    const [amount, setAmount] = useState<string>('');
    const [userInfo, setUserInfo] = useState<any>({ amount: 0, score: 0, initials: '', clientStatus: '' });
    const [errorMessage, setErrorMessage] = useState<string | undefined>('');
    const [acumulationInfo, setAcumulationIfno] = useState<any>({ initials: '', bonus: 0, availableBonus: 0, clientStatus: '' });


    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", keyboardDidShow);

        // cleanup function
        return () => {
            Keyboard.removeListener("keyboardDidShow", keyboardDidShow);
        };
    }, []);

    const keyboardDidShow = () => setScannCode(false);


    const getScannedValue = (value: any) => {
        setScannedCode(value);
        if (value) {
            setScannCode(false);
        };
    };

    useEffect(() => {
        if (scannedCode.length === 16) GetUserInfo();
    }, [scannedCode]);

    const GetUserInfo = () => {
        setBtnLoading(true);
        setErrorMessage('');
        Bonus.GetAccountInfo(scannedCode).then(res => {
            if (res.data.success) {
                setUserInfo({
                    amount: res.data.data?.amount,
                    score: res.data.data?.score,
                    initials: res.data.data?.initials,
                    clientStatus: res.data.data?.clientStatus
                });
            } else {
                setErrorMessage(res.data.error?.errorDesc)
            };
            setBtnLoading(false);
        }).catch((e) => console.log(JSON.stringify(e)))
    };

    const collectPoints = () => {
        setErrorMessage('');
        if (!scannedCode || !amount) return;
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
                let transaction: ITransaction = {
                    tranAmount: res.data.data?.accumulatedBonus,
                    batchId: '1',
                    card: scannedCode,
                    deviceId: getUniqueId(),
                    respCode: '000',
                    stan: res.data.data?.stan,
                    tranDate: Date.now(),
                    tranType: res.data.data?.tranType,
                    reversed: false
                };
                addTransaction(transaction);
                setAcumulationIfno({
                    initials: userInfo.initials,
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
        if (!scannedCode || !amount) return;
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
                let transaction: ITransaction = {
                    tranAmount: res.data.data?.spentBonus,
                    batchId: '1',
                    card: scannedCode,
                    deviceId: getUniqueId(),
                    respCode: '000',
                    stan: res.data.data?.stan,
                    tranDate: Date.now(),
                    tranType: res.data.data?.tranType,
                    reversed: false
                };
                addTransaction(transaction);
                setAcumulationIfno({
                    initials: userInfo.initials,
                    clientStatus: userInfo.clientStatus,
                    bonus: res.data.data?.spentBonus,
                    availableBonus: res.data.data?.availableScore
                });
                setStep(0);
                setShowModal(true);

            } else {
                console.log('aqane', res.data.success)
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
        setAcumulationIfno({ initials: '', bonus: 0, availableBonus: 0, clientStatus: '' });
    };


    console.log(userInfo)
    let PayStep = null;
    if (step === 0) {
        PayStep = (
            <View style={{ marginHorizontal: 10, flex: 8, justifyContent: 'space-between' }}>
                {!scannCode ?
                    <TouchableOpacity style={[styles.button, type === 'Pay' ? styles.buttonPay : styles.buttonCollect]} onPress={() => setScannCode(true)}>
                        <Text style={styles.btntext}>კოდის დასკანერება</Text>
                    </TouchableOpacity> : null}

                <AppInput
                    label='ბარათი'
                    keyboardType='numeric'
                    value={scannedCode}
                    error={!scannedCode ? true : false}
                    onChangeText={(newValue: any) => setScannedCode(newValue)} />
                <AppInput
                    label='თანხა'
                    keyboardType='numeric'
                    error={!amount ? true : false}
                    value={amount}
                    onChangeText={(newValue: any) => setAmount(newValue)} />
                <View >
                    {type === 'Pay' ?
                        <AppButton
                            btnStyle={[styles.button, styles.buttonPay]}
                            buttonTitle='ქულებით გადახდა'
                            titleStylee={styles.btntext}
                            onPress={sendOtp}
                            isLoading={btnLoading} />
                        :
                        <AppButton
                            btnStyle={[styles.button, styles.buttonCollect]}
                            buttonTitle='ქულების დაგროვება'
                            titleStylee={styles.btntext}
                            onPress={collectPoints}
                            isLoading={btnLoading} />}
                </View>
                <View style={{ marginTop: 30 }}>
                    <Text style={[styles.infoText, { marginBottom: 30 }]}>ბარათის ინფორმაცია: </Text>
                    {errorMessage ?
                        <Text style={[styles.infoText, styles.infoError]}>{errorMessage} </Text>
                        :
                        <Fragment>
                            <Text style={styles.infoText}>მფლობელი: {userInfo.initials} </Text>
                            <Text style={styles.infoText}>ხელმისაწვდომი თანხა: {userInfo.amount} </Text>
                            <Text style={styles.infoText}>ხელმისაწვდომი ქულა: {userInfo.score} </Text>
                            <Text style={styles.infoText}>კლიენტის სტატუსი: {userInfo.clientStatus}</Text>
                        </Fragment>
                    }
                </View>
            </View>
        );
    } else if (step === 1) {
        PayStep = <OtpBox count={4} card={scannedCode} makePayment={PayWithPoints} btnLoading={btnLoading} errorMessage ={errorMessage} />
    };

    return (
        <ScrollView  keyboardShouldPersistTaps  = 'always' style={{ flex: 1 }}>
            {showModal && <PointModal modalVisible={showModal} closeModal={onCloseModal} collectInfo={acumulationInfo} type={type} />}
            {scannCode ? <View style={{ flex: 4, backgroundColor: '#130D1E', opacity: 0.8, }}>
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

    infoError: {
        color: '#E50B09'
    }

});

export default ManagePoints;

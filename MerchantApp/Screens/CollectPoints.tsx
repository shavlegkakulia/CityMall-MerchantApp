import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AppInput from '../Components/AppInput';
import BarCodeReader from '../Components/BarCodeReader';
import Bonus from '../services/Bonus';
import PointModal from '../Components/PointModal';
import OtpBox from '../Components/OtpBox/OtpBox';
import { getUniqueId } from 'react-native-device-info';
import { getTransactions, addTransaction, ITransaction, clearTransactions } from '../services/TransactionService';

const CollectPoints = (props: any) => {

    const { type } = props.route.params;

    const [step, setStep] = useState<number>(0);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [scannCode, setScannCode] = useState<boolean>(false);
    const [scannedCode, setScannedCode] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [userInfo, setUserInfo] = useState<any>({ amount: 0, score: 0, initials: '' });
    const [acumulationInfo, setAcumulationIfno] = useState<any>({ initials: '', bonus: 0, availableBonus: 0 });
    const [stan, setStan] = useState<any>('')


    console.log('route params', type)

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
        Bonus.GetAccountInfo(scannedCode).then(res => {
            console.log('+++++++++++++++++++++++', res)
            if (res.status === 200) {
                console.log(res.status, '----------------', res.data)
                setUserInfo({
                    amount: res.data.amount,
                    score: res.data.score,
                    initials: res.data.initials
                });
            } else {
                console.log('getAccountinfoResponse', res);
            };
        });
    };

    const collectPoints = () => {
        if (!scannedCode || !amount) return;
        console.log('clicked')
        let data = {
            card: scannedCode,
            amount: amount,
            batchId: "1",
            productId: 1
        }

        Bonus.CollectPoints(data).then(res => {
            if (res.status === 200) {
                let transaction: ITransaction = {
                    tranAmount: Number(amount),
                    batchId: '1',
                    card: scannedCode,
                    deviceId: getUniqueId(),
                    respCode: '000',
                    stan: res.data.stan,
                    tranDate: Date.now(),
                    tranType: res.data.tranType,
                    reversed: false
                }
                addTransaction(transaction);
                setAcumulationIfno({
                    initials: userInfo.initials,
                    bonus: res.data.accumBonus,
                    availableBonus: res.data.availableScore
                });
                setShowModal(true);
            }
        });
    };

    const sendOtp = () => {
        if (!scannedCode || !amount) return;
        setStep(step + 1);
    }

    const PayWithPoints = (otp: string) => {
        let data = {
            card: scannedCode,
            amount: Number(amount),
            batchId: "1",
            otp: otp,
            deviceTranId: "1"
        }
        Bonus.PayWithPoints(data).then(res => {
            if (res.status === 200) {
                let transaction: ITransaction = {
                    tranAmount: Number(amount),
                    batchId: '1',
                    card: scannedCode,
                    deviceId: getUniqueId(),
                    respCode: '000',
                    stan: res.data.stan,
                    tranDate: Date.now(),
                    tranType: res.data.tranType,
                    reversed: false
                }
                addTransaction(transaction);
                setAcumulationIfno({
                    initials: userInfo.initials,
                    bonus: res.data.spentBonus,
                    availableBonus: res.data.availableScore
                });
            }
            setStep(0);
            setShowModal(true);
            console.log('++++++++++++++++++++++++ Pay With Point', res.data)
        })
    }

    const onCloseModal = () => {
        setUserInfo({ amount: 0, score: 0, initials: '' });
        setScannedCode('');
        setAmount('');
        setShowModal(false);
        setAcumulationIfno({ initials: '', bonus: 0, availableBonus: 0 });
        console.log('transactions from storage =========>', getTransactions());
    }


    const tt = () => {
        Bonus.ReverseTransaction(1, stan).then(res => {
            console.log(res)
        })
    }




    let PayStep = null
    if (step === 0) {
        PayStep = (
            <View style={{ marginHorizontal: 10 }}>
                {!scannCode ?
                    <TouchableOpacity style={[styles.button, type === 'Pay' ? styles.buttonPay : styles.buttonCollect]} onPress={() => setScannCode(true)}>
                        <Text style={styles.btntext}>კოდის დასკანერება</Text>
                    </TouchableOpacity> : null}
                <PointModal modalVisible={showModal} closeModal={onCloseModal} collectInfo={acumulationInfo} type={type} />
                <AppInput
                    label='ბარათი'
                    value={scannedCode}
                    error={!scannedCode ? true : false}
                    onChangeText={(newValue: any) => setScannedCode(newValue)} />
                <AppInput
                    label='თანხა'
                    error={!amount ? true : false}
                    value={amount}
                    onChangeText={(newValue: any) => setAmount(newValue)} />
                <View >
                    {type === 'Pay' ?
                        <TouchableOpacity onPress={sendOtp} style={[styles.button, styles.buttonPay]}>
                            <Text style={styles.btntext}>ქულებით გადახდა</Text>
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={collectPoints} style={[styles.button, styles.buttonCollect]}>
                            <Text style={styles.btntext}>ქულების დაგროვება</Text>
                        </TouchableOpacity>}
                </View>
                
                <View style={{ marginTop: 60 }}>
                    <Text style={[styles.infoText, type === 'Pay' ? styles.infoTextPay : styles.infoTextCollect, { marginBottom: 30 }]}>ბარათის სტატუსი : </Text>
                    <Text style={[styles.infoText, type === 'Pay' ? styles.infoTextPay : styles.infoTextCollect]}>მფლობელი: {userInfo.initials} </Text>
                    <Text style={[styles.infoText, type === 'Pay' ? styles.infoTextPay : styles.infoTextCollect]}>ხელმისაწვდომი თანხა: {userInfo.amount} </Text>
                    <Text style={[styles.infoText, type === 'Pay' ? styles.infoTextPay : styles.infoTextCollect]}>ხელმისაწვდომი ქულა: {userInfo.score} </Text>
                    <Text style={[styles.infoText, type === 'Pay' ? styles.infoTextPay : styles.infoTextCollect]}>კლიენტის სტატუსი: </Text>
                </View>
            </View>
        );
    } else if (step === 1) {
        PayStep = <OtpBox count={4} card={scannedCode} makePayment={PayWithPoints} />
    };

    return (
        <View style={{ flex: 1 }}>
            {scannCode ? <BarCodeReader getValue={getScannedValue} /> : null}
            {PayStep}
        </View>
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
        color: '#00a400'
    },

    infoTextCollect: {
        color: '#00a400'
    },

    infoTextPay: {
        color: '#ffda02'
    }
});

export default CollectPoints;

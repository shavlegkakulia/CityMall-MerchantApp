import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import BarCodeReader from '../Components/BarCodeReader';
import AppInput from '../Components/AppInput';
import PointModal from '../Components/PointModal';
import OtpBox from '../Components/OtpBox/OtpBox';
import Bonus from '../services/Bonus';



const PayWithPoints = (props: any) => {

    const [showModal, setShowModal] = useState<boolean>(false);
    const [scannCode, setScannCode] = useState<boolean>(false);
    const [scannedCode, setScannedCode] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [step, setStep] = useState<number>(0);
    const [userInfo, setUserInfo] = useState<any>({ amount: 0, score: 0, fullName: '' });
    const [acumulationInfo, setAcumulationIfno] = useState<any>({ fullName: '', bonus: 0, availableBonus: 0 });

    const getScannedValue = (value: any) => {
        setScannedCode(value);
        if (value) {
            setScannCode(false);
        };
    };

    useEffect(() => {
        if (scannedCode.length === 16) getUserInfo();
    }, [scannedCode]);

    const getUserInfo = () => {
        Bonus.GetAccountInfo(scannedCode).then(res => {
            if (res.status === 200) {
                console.log(res.status, '----------------', res.data)
                setUserInfo({
                    amount: res.data.amount,
                    score: res.data.score,
                    fullName: res.data.fullName
                });
            } else {
                console.log('getAccountinfoResponse', res);
            };
        });
    };



    const onCloseModal = () => {
        setUserInfo({ amount: 0, score: 0, fullName: '' });
        setScannedCode('');
        setAmount('');
        setShowModal(false);
        setAcumulationIfno({ fullName: '', bonus: 0, availableBonus: 0 });
    }

    let PayStep = null;

    if (step === 0) {
        PayStep = (
            <View style={{ marginHorizontal: 10 }}>
                {!scannCode ?
                    <TouchableOpacity style={styles.button} onPress={() => setScannCode(true)}>
                        <Text style={styles.btntext}>კოდის დასკანერება</Text>
                    </TouchableOpacity> : null}
                <PointModal modalVisible={showModal} closeModal={onCloseModal} collectInfo={acumulationInfo} />
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
                    <TouchableOpacity onPress={() => setStep(step + 1)} style={styles.button}>
                        <Text style={styles.btntext}>ქულების დახარჯვა</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: 60 }}>
                    <Text style={[styles.infoText, { marginBottom: 30 }]}>ბარათის სტატუსი : </Text>
                    <Text style={styles.infoText}>მფლობელი: {userInfo.fullName} </Text>
                    <Text style={styles.infoText}>ხელმისაწვდომი თანხა: {userInfo.amount} </Text>
                    <Text style={styles.infoText}>ხელმისაწვდომი ქულა: {userInfo.score} </Text>
                    <Text style={styles.infoText}>კლიენტის სტატუსი: </Text>
                </View>

            </View>
        );
    } else if (step === 1) {
        PayStep = <OtpBox count = {4}/>
    }



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
        backgroundColor: '#ffda02',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7
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
    }

})

export default PayWithPoints;
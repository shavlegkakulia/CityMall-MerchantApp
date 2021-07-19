import React from 'react';
import { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TextInput, View, TouchableOpacity, Button } from 'react-native';
import BarCodeReader from '../Components/BarCodeReader';
import AppInput from '../Components/AppInput';
import AppModal from '../Components/AppModal';



const PayWithPoints = (props: any) => {

    const [scannedCode, setScannedCode] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [showModal, setShowModal] = useState<boolean>(true);
    const [step, setStep] = useState<number>(0);

    const getScannedValue = (value: any) => {
        setScannedCode(value)
        if (value) {
            setStep(1);
        }
    }

    let Content = null;

    if (step === 0) {
        Content = (
            <BarCodeReader getValue={getScannedValue} />
        )
    } else if (step === 1) {
        Content = (
            <View style={{marginHorizontal: 10}}>
                <AppModal modalVisible={showModal} closeModal={() => setShowModal(false)} />
                <AppInput
                    label='ბარათი'
                    value={scannedCode}
                    onChangeText={(newValue: any) => setScannedCode(newValue)} />
                <AppInput
                    label='თანხა'
                    value={amount}
                    onChangeText={(newValue: any) => setAmount(newValue)} />
                <View >
                    <TouchableOpacity onPress={() => { }} style={styles.button}>
                        <Text style={styles.btntext}>ქულებით გადახდა</Text>
                    </TouchableOpacity>
                </View>

                <View style={{marginTop: 60}}>
                    <Text style={{marginBottom: 30}}>ბარათის სტატუსი : </Text>
                    <Text>მფლობელი : </Text>
                    <Text>ხელმისაწვდომი თანხა : </Text>
                    <Text>ხელმისაწვდომი ქულა : </Text>
                    <Text>ბარათის ტიპი : </Text>
                </View>

            </View>
        )
    }




    return (
        <View style={{ flex: 1 }}>
            {Content}
        </View>
    );
};


const styles = StyleSheet.create({
    button: {
        width: '100%', 
        height: 60, 
        backgroundColor: 'green', 
        alignItems: 'center', 
        justifyContent: 'center',
        borderRadius: 7 
    },
    btntext: {
        fontSize: 16,
        fontWeight: '500',
        color: 'white'
    }

})

export default PayWithPoints;
import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import AppInput from '../Components/AppInput';
import BarCodeReader from '../Components/BarCodeReader';
import AppModal from '../Components/AppModal';

const CollectPoints = () => {


    const [scannedCode, setScannedCode] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [showModal, setShowModal] = useState<boolean>(false);
    const [step, setStep] = useState<number>(0);
    const [scannCode, setScannCode] = useState<boolean>(false)

    const getScannedValue = (value: any) => {
        setScannedCode(value)
        if (value) {
            setScannCode(false);
        }
    }

    

    return (
        <View style={{ flex: 1 }}>
            {scannCode? <BarCodeReader getValue={getScannedValue} /> : null}
             <View style={{marginHorizontal: 10}}>
             {!scannCode? 
            <TouchableOpacity style={styles.button} onPress = {() => setScannCode(true)}>
                <Text style={styles.btntext}>კოდის დასკანერება</Text>
            </TouchableOpacity> : null}
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
                        <Text style={styles.btntext}>ქულების დაგროვება</Text>
                    </TouchableOpacity>
                </View>

                <View style={{marginTop: 60}}>
                    <Text style={[styles.infoText, {marginBottom: 30}]}>ბარათის სტატუსი : </Text>
                    <Text style={styles.infoText}>მფლობელი: </Text>
                    <Text style={styles.infoText}>ხელმისაწვდომი თანხა : </Text>
                    <Text style={styles.infoText}>ხელმისაწვდომი ქულა : </Text>
                    <Text style={styles.infoText}>ბარათის ტიპი : </Text>
                </View>

            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    button: {
        width: '100%', 
        height: 60, 
        backgroundColor: '#3269E5', 
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
        color:'#00a400' 
    }

})

export default CollectPoints;

import React from 'react';
import { useState } from 'react';
import {ScrollView, StatusBar,StyleSheet,Text, TextInput, View, TouchableOpacity} from 'react-native';
import BarCodeReader from '../Components/BarCodeReader';
import AppInput from '../Components/AppInput/AppInput';



const PayWithPoints = (props: any) => {


    const [ isScanned, setIsScanned ] = useState<boolean>(false);
    const [ scannedCode, setScannedCode ] = useState<string>('')

    const getScannedValue = (value: any) => {
        console.log('getScannedValue', value);
        setScannedCode(value)
        if(value) setIsScanned(true);
    }




    return (
        <View style = {{flex: 1}}>
            {!isScanned? <BarCodeReader getValue = {getScannedValue} /> : <AppInput value={ scannedCode } onChangeText = {(newValue: any) => setScannedCode(newValue)} label = 'ბარათი'/>}
            
        </View>
    );
};

export default PayWithPoints;
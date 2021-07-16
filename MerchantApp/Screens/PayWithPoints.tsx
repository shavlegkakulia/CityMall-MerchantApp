import React from 'react';
import {ScrollView, StatusBar,StyleSheet,Text,View, TouchableOpacity} from 'react-native';
import BarCodeReader from '../BarCodeReader';



const PayWithPoints = () => {
    return (
        <View style = {{flex: 1}}>
        <BarCodeReader/>
    </View>
    );
};

export default PayWithPoints;
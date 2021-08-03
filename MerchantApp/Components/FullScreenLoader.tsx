import React from "react";
import {  ActivityIndicator, StyleSheet, View, } from "react-native";


const FullScreenLoader = () => (
        <View style={[StyleSheet.absoluteFill, {flex: 1, justifyContent: 'center', alignItems: 'center'}]}>
            <ActivityIndicator size = {90} color='#40ADEC'/>
        </View>
);
export default FullScreenLoader
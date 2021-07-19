import React, { useRef, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View, Dimensions, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import ScannerAnimation from './ScannerAnimation';

const { width } = Dimensions.get('screen')

const BarCodeReader = (props: any) => {
    const cameraRef = useRef<any>({});
    const [barCode, setBarCode] = useState<any>(null);

    const handleBarCodeRead = (value: any) => {
        if (value.data == barCode) return;
        console.log('value.data  ===>', value.data)
        props.getValue(value.data)
        setBarCode(value.data.toString());
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: width, height: width, }}>
                <ScannerAnimation />
                <RNCamera
                    onBarCodeRead={handleBarCodeRead}
                    ref={ref => cameraRef.current = ref}
                    autoFocus={RNCamera.Constants.AutoFocus.on}
                    flashMode={RNCamera.Constants.FlashMode.auto}
                    style={StyleSheet.absoluteFill}>
                    <ScannerAnimation />
                </RNCamera>
            </View>
        </View>
    );
};

export default BarCodeReader;



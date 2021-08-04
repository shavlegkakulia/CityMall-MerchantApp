import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View, Dimensions, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import ScannerAnimation from './ScannerAnimation';

const { width } = Dimensions.get('screen')

const BarCodeReader = (props: any) => {
    const cameraRef = useRef<RNCamera | null>();
    const [barCode, setBarCode] = useState<any>(null);
    const DESIRED_RATIO = "16:9";
    const handleBarCodeRead = (value: any) => {
        if (value.data == barCode) return;
        props.getValue(value.data)
        setBarCode(value.data.toString());
    }
    
    useEffect(() => {
       
       
    }, [])
    return (
        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center',  marginTop: 80}}>
            <View style={{ width: width, height: width, }}>
                <RNCamera
                    onBarCodeRead={handleBarCodeRead}
                    ref={ref => cameraRef.current = ref}
                    autoFocus={RNCamera.Constants.AutoFocus.on}
                    flashMode={RNCamera.Constants.FlashMode.auto}
                    style={{height: 177, width: '100%', marginTop: 50, overflow: 'hidden'}}
                    >
                    <ScannerAnimation />
                </RNCamera>
            </View>
        </View>
    );
};

export default BarCodeReader;



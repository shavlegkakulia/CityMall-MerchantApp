import React, { useRef, useState } from 'react';
import {ScrollView, StatusBar,StyleSheet,Text,View, Dimensions, Alert} from 'react-native';
import { RNCamera } from 'react-native-camera';
import ScannerAnimation from './Components/ScannerAnimation';

const {width} = Dimensions.get('screen')

const BarCodeReader = () => {
    const cameraRef = useRef<any>({});
    const [ barCode, setBarCode ] = useState<string>('');

    const { absoluteFill } = StyleSheet;

    console.log(typeof absoluteFill)

    const { width } = Dimensions.get('screen')

    const handleBarCodeRead = (value: any) => {
        if(value.data == barCode) return;
        setBarCode(value.data.toString());
        Alert.alert(value.data.toString())
      }
      

    return (
        <View  style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>


            {/*მეორე კონტეინერი*/}
            <View style = {{width: width, height: width, }}>
                <ScannerAnimation/>
                <RNCamera
                    onBarCodeRead = {handleBarCodeRead}
                    ref={ref => cameraRef.current = ref}
                    style={StyleSheet.absoluteFill}>
                        <ScannerAnimation/>
                    </RNCamera>
            </View>

           


        </View>
    );
};

const styles =  StyleSheet.create({
   fullScreen: {
       position: 'absolute',
       top: 0,
       bottom: 0,
       left: 0,
       right: 0
   }

})

export default BarCodeReader;



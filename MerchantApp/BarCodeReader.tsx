import React, { useRef, useState } from 'react';
import {ScrollView, StatusBar,StyleSheet,Text,View, Dimensions} from 'react-native';
import { RNCamera } from 'react-native-camera';


const BarCodeReader = () => {
    const cameraRef = useRef<any>({});
    const [ barCode, setBarCode ] = useState<string>('');

    const { width } = Dimensions.get('screen')

    const handleBarCodeRead = (value: any) => {
        if(value.data == barCode) return;
        setBarCode(value.data.toString());
      }
      
    console.log('rendered', 'barcode =====', barCode)

    return (
        <View  style={{flex: 1 }}>
            <Text>BarCode Reader</Text>
            
                <RNCamera
                    onBarCodeRead = {handleBarCodeRead}
                    ref={ref => cameraRef.current = ref}
                    style={{ flex: 1}}>
                        
                </RNCamera>

        </View>
    );
};

export default BarCodeReader;



import React, { useRef } from 'react';
import { useEffect } from 'react';
import { Animated, Dimensions, Image, StyleSheet, TouchableOpacity, Text, View , Button } from 'react-native';
import { RNCamera} from 'react-native-camera';


const {width} = Dimensions.get('screen')

console.log(width)


const ScannerAnimation = (props: any) => {
    const scanAnim = useRef(new Animated.Value(0)).current;

    const scannLine = () => {
        Animated.timing(scanAnim, {
            toValue: 1,
            duration: 2200,
            useNativeDriver: true
        }).start();
        console.log('animation clicked')
    }

    useEffect(() => {
        scannLine();
    })


        return (
           
                
                
                <View style={[StyleSheet.absoluteFill, {justifyContent: 'center', alignItems: 'center',}]} >
                
                    {/*area of scanning place*/}
                    <View style ={{width: width, height: width/2}}>
                    <Animated.View style={{width: '100%', height: 5, backgroundColor: 'red'}}>
                    
                    </Animated.View>

                        {/*borders*/}
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={styles.topLeftCorner}/>
                                <View style={{flex: 1}}/>
                                <View style={styles.topRightCorner}/>
                            </View>

                            <View style={{flex: 1}}/>

                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={styles.bottomLeftCorner}/>
                                <View style={{flex: 1}}/>
                                <View style={styles.bottomRightCorner}/>
                            </View>
                    </View>
                </View>

        
        );
}

const styles = StyleSheet.create({
    topLeftCorner : {
        flex: 1,
        borderLeftWidth: 3,
        borderTopWidth: 3,
        borderColor: 'white'
    },
    bottomLeftCorner : {
        flex: 1,
        borderLeftWidth: 3,
        borderBottomWidth: 3,
        borderColor: 'white'
    },
    topRightCorner : {
        flex: 1,
        borderRightWidth: 3,
        borderTopWidth: 3,
        borderColor: 'white'
    },
    bottomRightCorner : {
        flex: 1,
        borderRightWidth: 3,
        borderBottomWidth: 3,
        borderColor: 'white'
    }
})

export default ScannerAnimation;
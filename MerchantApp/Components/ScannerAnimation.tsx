import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';

const { width } = Dimensions.get('screen');

const ScannerAnimation = () => {

    const [scanLine, setScanLine] = useState(new Animated.Value(0));

    const moveInterval = setInterval(() => {
        if (moveInterval) clearInterval(moveInterval)
        Animated.timing(scanLine, {
            toValue: 1,
            duration: 2260,
            useNativeDriver: false
        }).start(() => setScanLine(new Animated.Value(0)));
    }, 50)

    useEffect(() => {
        moveInterval;
        return () => clearInterval(moveInterval);
    }, [])

    return (

        <View style={[StyleSheet.absoluteFill, { justifyContent: 'center', alignItems: 'center' }]} >
            {/*area of scanning place*/}
            <View style={{ width: width, height: width / 2 }}>
                {/*animated scan line*/}
                <Animated.View style={{
                    transform: [{
                        translateY: scanLine.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, width / 2]
                        })
                    }]
                }}>
                    <View style={styles.scanLine} />
                </Animated.View>
                {/*borders*/}
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={styles.topLeftCorner} />
                    <View style={{ flex: 1 }} />
                    <View style={styles.topRightCorner} />
                </View>
                <View style={{ flex: 1 }} />
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={styles.bottomLeftCorner} />
                    <View style={{ flex: 1 }} />
                    <View style={styles.bottomRightCorner} />
                </View>
            </View>
        </View>


    );
}

const styles = StyleSheet.create({
    topLeftCorner: {
        flex: 1,
        borderLeftWidth: 3,
        borderTopWidth: 3,
        borderColor: 'white'
    },
    bottomLeftCorner: {
        flex: 1,
        borderLeftWidth: 3,
        borderBottomWidth: 3,
        borderColor: 'white'
    },
    topRightCorner: {
        flex: 1,
        borderRightWidth: 3,
        borderTopWidth: 3,
        borderColor: 'white'
    },
    bottomRightCorner: {
        flex: 1,
        borderRightWidth: 3,
        borderBottomWidth: 3,
        borderColor: 'white'
    },
    scanLine: {
        width: '100%',
        height: 2,
        backgroundColor: 'red'
    }

})

export default ScannerAnimation;
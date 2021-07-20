import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';


const OtpBox = (props: any) => {
    const [otp, setOtp] = useState(new Array(props.count).fill(''));
    const inputRef0 = useRef<TextInput>();
    const inputRef1 = useRef<TextInput>();
    const inputRef2 = useRef<TextInput>();
    const inputRef3 = useRef<TextInput>();

    const refs = [
        inputRef0,
        inputRef1,
        inputRef2,
        inputRef3
    ]

    useEffect(() => {
        inputRef0.current?.focus();
    }, [])

    const handleChangeText = (value: any, index: any) => {
        if (isNaN(value)) return false;
        setOtp([...otp.map((v, i) => (i === index) ? value : v)]);
        if (refs[index + 1] && value !== '') {
            refs[index + 1].current?.focus();
        }

    }

    const handleFocusPrev = (event: any, index: number) => {
        if (event.nativeEvent.key === 'Backspace' && otp[index] === '') {
            if (refs[index - 1]) {
                refs[index - 1].current?.focus();
            }
        }
    }

    console.log('otp----->', otp,)

    return (
        <View style={styles.otpBoxConteiner}>
            {otp.map((element, index) => (
                <TextInput
                    ref={refs[index]}
                    style={styles.otpBox}
                    key={index}
                    maxLength={1}
                    selectTextOnFocus
                    keyboardType='numeric'
                    value={element}
                    onChangeText={(newValue) => handleChangeText(newValue, index)}
                    onKeyPress={event => { handleFocusPrev(event, index) }}
                />
            ))}
        </View>);
}


const styles = StyleSheet.create({
    otpBoxConteiner: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    otpBox: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderRadius: 7,
        borderColor: '#8d949e',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        marginVertical: 20,
        textAlign: 'center',
        fontSize: 20
    }
})


export default OtpBox;
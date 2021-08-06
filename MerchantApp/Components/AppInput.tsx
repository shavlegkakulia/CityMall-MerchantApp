import React, {useState, forwardRef } from 'react';
import {  StyleSheet, Text, View, TextInput, Image,  TouchableOpacity } from 'react-native';

const AppInput = ((props: any, ref: any) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    
    return (

        <View style={{ marginVertical: 10 }}>
            <Text style={isFocused || props.value !== '' ? styles.labelFocused : styles.labelNotFocused}>{props.label} </Text>
            <TextInput
                style={styles.appInput}
                {...props}
                ref={ref}
                onFocus={() => setIsFocused(true)}
                onBlur={() => { setIsFocused(false) }}
            />
            {props.isPasswordInput ? <TouchableOpacity style={styles.passwordEye} onPress={props.onPasswordSecure}>
                <Image style={styles.passwordEyeImg} source={require('../assets/images/password-eye.png')} />
            </TouchableOpacity> : null}
            {props.error ? <Text style={styles.errorText}>გთხოვთ შეავსოთ ველი</Text> : null}
        </View>
    );
});

const styles = StyleSheet.create({
    labelFocused: {
        fontSize: 14,
        color: '#000',
        position: 'absolute',
        top: 0,
        left: 10,

    },
    labelNotFocused: {
        fontSize: 16,
        color: '#aaa',
        position: 'absolute',
        top: 18,
        left: 18
    },
    appInput: {
        fontSize: 20,
        height: 60,
        color: '#000',
        borderColor: '#777777ab',
        borderWidth: 1,
        borderRadius: 10,
        padding: 15
    },
    passwordEye: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 60,
        position: 'absolute',
        right: 0,
        top: 0
    },
    passwordEyeImg: {
        width: 22,
        height: 13,

    },
    errorText: {
        color: '#E50B09',
        fontSize: 10,
        marginTop: 5
    }
})

export default forwardRef(AppInput);
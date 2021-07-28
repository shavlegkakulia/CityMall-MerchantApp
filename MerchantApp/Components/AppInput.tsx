import React, { useEffect, useState, forwardRef } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View, TextInput } from 'react-native';





const AppInput = ((props: any, ref: any) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);

    return (

        <View style={{ marginVertical: 10 }}>
            <Text style={isFocused || props.value !== '' ? styles.labelFocused : styles.labelNotFocused}>{props.label} </Text>
            <TextInput
                style={styles.appInput}
                {...props}
                ref = {ref}
                keyboardType="numeric"
                onFocus={() => setIsFocused(true)}
                onBlur={() => { setIsFocused(false) }}
            />
            {props.error? <Text style ={styles.errorText}>გთხოვთ შეავსოთ ველი</Text> : null}
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
    errorText: {
        color: '#E50B09',
        fontSize: 10,
        marginTop: 5
    }
})

export default forwardRef(AppInput);
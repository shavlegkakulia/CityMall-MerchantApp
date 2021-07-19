import React, { useEffect, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View, TextInput } from 'react-native';





const AppInput = (props: any) => {

    const [isFocused, setIsFocused] = useState<boolean>(false);


    return (

        <View style={{ marginVertical: 10 }}>
            <Text style={isFocused || props.value !== '' ? styles.labelFocused : styles.labelNotFocused}>{props.label} </Text>
            <TextInput
                style={styles.appInput}
                {...props}
                keyboardType="numeric"
                onFocus={() => setIsFocused(true)}
                onBlur={() => { setIsFocused(false) }}
            />
        </View>
    );
};

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
    }
})

export default AppInput;
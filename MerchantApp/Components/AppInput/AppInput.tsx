import React, { useEffect, useState } from 'react';
import {ScrollView, StatusBar,StyleSheet,Text,View, TextInput} from 'react-native';

const AppInput = (props: any) => {
    
    const [ isFocused, setIsFocused ] = useState<boolean>(false);
   

    return (
      
        <View  style = {{padding: 18}}>
            <Text style = {isFocused? styles.labelFocused : styles.labelNotFocused}>{props.label} </Text>
            <TextInput 
                {...props}
                onFocus = {() => setIsFocused(true)}
                onBlur = {()=> setIsFocused(false)}
             style = {styles.appInput}/>
        </View>
    );
};

const styles = StyleSheet.create({
    labelFocused: {
        fontSize:14 ,
        color: '#000',
        position: 'absolute',
        top: 18,
        left: 25
    },
    labelNotFocused: {
        fontSize: 20,
        color: '#aaa',
        position: 'absolute',
        top: 27,
        left: 25
    },
    appInput: {
        fontSize:20, 
        color: '#000', 
        borderColor: '#777777ab', 
        borderWidth: 1, 
        borderRadius: 10
    }
})

export default AppInput;
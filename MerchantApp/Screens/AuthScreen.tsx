import React, { useEffect, useState, useContext } from 'react';
import { Image, StyleSheet, TouchableOpacity, Text, TextInput, View, Button } from 'react-native';
import Bonus from '../services/Bonus';
import OtpBox from '../Components/OtpBox/OtpBox';
import { getUniqueId } from 'react-native-device-info';
import AuthService from '../services/AuthService';
import {AppContext} from '../services/ContextService';

// deviceId = bc410a9ca5485e94

const AuthScreen = (props: any) => {
    const [userName, setUserName] = useState<string>('ggggg');
    const [password, setPassword] = useState<string>('123123');


    const {setIsAuth} = useContext(AppContext);



    const login = () => {
        let data = {
            username: userName,
            password: password
        }
        AuthService.SignIn(data).then(res => {
            if (res.status === 200) {
                AuthService.setToken(res.data.access_token, res.data.refresh_token);
                AuthService.setDeviceId(getUniqueId());
                setIsAuth(true);
            }
        }).catch(error => console.log(error))
    }

    

    return (
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <View style={styles.imageWrap}>
                    <Image style={styles.image} source={require('../assets/images/Arrow-topLeft.png')} />
                    <Image style={styles.image} source={require('../assets/images/Arrow-topRight.png')} />
                </View>
                <View style={styles.middleContent}>
                    <Text style={{ textAlign: 'center', fontSize: 26 }}>ავტორიზაცია</Text>
                    <View>
                        <TextInput style={styles.authInput} value={userName} onChangeText={(val) => setUserName(val)} />
                        <TextInput style={styles.authInput} value={password} onChangeText={(val) => setPassword(val)} />
                    </View>

                    <TouchableOpacity style={{ width: 300, height: 60, backgroundColor: 'blue', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', borderRadius: 10 }} onPress={login}>
                        <Text style={{ fontSize: 20, color: 'white' }}>ავტორიზაცია</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.imageWrap}>
                    <Image style={styles.image} source={require('../assets/images/Arrow-bottomLeft.png')} />
                    <Image style={styles.image} source={require('../assets/images/Arrow-bottomRight.png')} />
                </View>
            </View>
    )

}

const styles = StyleSheet.create({
    imageWrap: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    image: {
        width: 115,
        height: 115,
    },
    middleContent: {
        flex: 8,
        alignSelf: 'center',
        justifyContent: 'space-around'
    },
    authInput: {
        width: 325,
        height: 66,
        backgroundColor: '#E6E7E8',
        borderRadius: 10,
        marginBottom: 20
    }

})

export default AuthScreen;
import React, { useState, useContext } from 'react';
import { Image, StyleSheet, TouchableOpacity, Text, TextInput, View, Button, Dimensions, ActivityIndicatorBase, ActivityIndicator } from 'react-native';
import { getUniqueId } from 'react-native-device-info';
import AuthService from '../services/AuthService';
import { AppContext } from '../services/ContextService';
import AppButton from '../Components/AppButton';

const deviceHeight = Dimensions.get('screen').height;
const deviceWidth = Dimensions.get('screen').width;
// deviceId = bc410a9ca5485e94

const AuthScreen = (props: any) => {
    const [userName, setUserName] = useState<string>('ggggg');
    const [password, setPassword] = useState<string>('123123');
    const [btnLoading, setBtnLoading] = useState<boolean>(false)


    const { setIsAuth } = useContext(AppContext);

    console.log('height ----> ', Dimensions.get('screen').height)



    const login = () => {
        setBtnLoading(true);
        let data = {
            username: userName,
            password: password
        }
        AuthService.SignIn(data).then(res => {
            if (res.status === 200) {
                AuthService.setToken(res.data.access_token, res.data.refresh_token);
                AuthService.setDeviceId(getUniqueId());
                setIsAuth(true);
                setBtnLoading(false);
            } else {
                setBtnLoading(false);
            }
        }).catch(error => {console.log(error); setBtnLoading(false)})
    }



    return (
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <View style={[styles.imageWrap, {alignItems: 'flex-start'}]}>
                <Image style={styles.image} source={require('../assets/images/Arrow-topLeft.png')} />
                <Image style={styles.image} source={require('../assets/images/Arrow-topRight.png')} />
            </View>
            <View style={styles.middleContent}>
                <View>
                    <TextInput style={styles.authInput} value={userName} onChangeText={(val) => setUserName(val)} />
                    <TextInput style={styles.authInput} value={password} onChangeText={(val) => setPassword(val)} />
                </View>
                <AppButton 
                    btnStyle = {styles.authButton} 
                    buttonTitle = 'ავტორიზაცია' 
                    titleStylee ={{fontSize: 20, color: 'white'}} 
                    onPress={login} isLoading = {btnLoading}/>
            </View>
            <View style={[styles.imageWrap, {alignItems: 'flex-end'}]}>
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
        width: (deviceHeight / 12) * 2,
        height: (deviceHeight / 12) * 2,
        opacity: 0.5
    },
    middleContent: {
        flex: 8,
        alignSelf: 'center',
        justifyContent: 'space-around',
    },
    authInput: {
        width: deviceWidth - 80,
        height: deviceHeight / 12,
        backgroundColor: '#E6E7E8',
        borderRadius: 10,
        marginBottom: 20,
        paddingLeft: 20
    },
    authButton: {
        width: deviceWidth - 80,
        height: deviceHeight / 12,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 10


    }

})

export default AuthScreen;
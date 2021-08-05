import React, { useState, useContext, useEffect } from 'react';
import { Image, StyleSheet, TouchableOpacity, Text, TextInput, View, Button, Dimensions, Keyboard, ActivityIndicator, Alert } from 'react-native';
import { getUniqueId } from 'react-native-device-info';
import AuthService from '../services/AuthService';
import { AppContext } from '../services/ContextService';
import AppButton from '../Components/AppButton';
import AppInput from '../Components/AppInput';

const deviceHeight = Dimensions.get('screen').height;
const deviceWidth = Dimensions.get('screen').width;
// deviceId = bc410a9ca5485e94

const AuthScreen = () => {
    const [userName, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [btnLoading, setBtnLoading] = useState<boolean>(false);
    const [passwordSecure, setPasswordSecure] = useState<boolean>(true);
    const [authRequired, setAuthRequires] = useState<any>({ user: false, pwd: false });
    const [authError, setAuthError] = useState<boolean>(false);

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", keyboardDidHide);

        // cleanup function
        return () => {
            Keyboard.removeListener("keyboardDidShow", keyboardDidShow);
            Keyboard.removeListener("keyboardDidHide", keyboardDidHide);
        };
    }, []);

    const [keyboardStatus, setKeyboardStatus] = useState<boolean>(false);
    const keyboardDidShow = () => setKeyboardStatus(true);
    const keyboardDidHide = () => setKeyboardStatus(false);




    const { setIsAuth } = useContext(AppContext);




    const login = () => {
        setAuthRequires({ user: false, pwd: false });
        if (!userName && !password) {
            setAuthRequires({ user: true, pwd: true });
            return;
        } else if (!password) {
            setAuthRequires({ user: false, pwd: true });
            return;
        } else if (!userName) {
            setAuthRequires({ user: true, pwd: false });
            return;
        } else {
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
                    console.log(res.data)
                    setBtnLoading(false);
                }
            }).catch(error => {
                Alert.alert(
                    'Error',
                    JSON.stringify(error)
                ); setBtnLoading(false)
            })
        }

    }



    return (
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
            {!keyboardStatus && <View style={[styles.imageWrap, { alignItems: 'flex-start' }]}>
                <Image style={styles.image} source={require('../assets/images/Arrow-topLeft.png')} />
                <Image style={styles.image} source={require('../assets/images/Arrow-topRight.png')} />
            </View>}
            <View style={styles.middleContent}>
                <View>
                    <AppInput
                        label='მომხმარებელი'
                        value={userName}
                        onChangeText={(newValue: any) => setUserName(newValue)}
                        error={authRequired.user}
                    />
                    <AppInput
                        label='პაროლი'
                        value={password}
                        onChangeText={(newValue: any) => setPassword(newValue)}
                        secureTextEntry={passwordSecure}
                        onPasswordSecure={() => setPasswordSecure(!passwordSecure)}
                        isPasswordInput
                        error={authRequired.pwd}
                    />
                   {authError? <Text>{authError}</Text> : null}
                </View>
                <AppButton
                    btnStyle={styles.authButton}
                    buttonTitle='ავტორიზაცია'
                    titleStylee={{ fontSize: 20, color: 'white' }}
                    onPress={login}
                    isLoading={btnLoading} />
            </View>
            {!keyboardStatus && <View style={[styles.imageWrap, { alignItems: 'flex-end' }]}>
                <Image style={styles.image} source={require('../assets/images/Arrow-bottomLeft.png')} />
                <Image style={styles.image} source={require('../assets/images/Arrow-bottomRight.png')} />
            </View>}
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
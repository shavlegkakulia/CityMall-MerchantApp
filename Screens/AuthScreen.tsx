import React, { useState, useContext, useEffect } from 'react';
import { Image, StyleSheet, Text, View, Dimensions, Keyboard, TouchableOpacity } from 'react-native';
import { getUniqueId } from 'react-native-device-info';
import AuthService from '../services/AuthService';
import { AppContext } from '../services/ContextService';
import AppButton from '../Components/AppButton';
import AppInput from '../Components/AppInput';
import { ScrollView } from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';
import { setItem, getItem } from '../services/StorageService';

const deviceHeight = Dimensions.get('screen').height;
const deviceWidth = Dimensions.get('screen').width;
// deviceId = bc410a9ca5485e94

const AuthScreen = (props: any) => {
    const [password, setPassword] = useState<string>('');
    const [isRemembered, setIsRemembered] = useState<boolean>(false);
    const [btnLoading, setBtnLoading] = useState<boolean>(false);
    const [passwordSecure, setPasswordSecure] = useState<boolean>(true);
    const [authRequired, setAuthRequires] = useState<any>({ user: '', pwd: '' });
    const [authError, setAuthError] = useState<string>('');


    const { setIsAuth, setUsername, userName } = useContext(AppContext);

    useEffect(() => {
        isRememberedUser();
    }, []);



    const isRememberedUser = async () => {
        let rememberedUser = await getItem('userName');
        if (!rememberedUser) {
            setUsername('');
            setIsRemembered(false);
            return;
        } else {
            setUsername(rememberedUser);
            setIsRemembered(true);
            return;
        };
    };

    const changeRememberedUser = () => {
        setItem('userName', '');
        setUsername('');
        return;
    }

    const login = () => {
        setAuthRequires({ user: false, pwd: false });
        setAuthError('');
        Keyboard.dismiss();
        if (!userName && !password) {
            setAuthRequires({ user: 'გთხოვთ შეავსოთ ველი', pwd: 'გთხოვთ შეავსოთ ველი' });
            return;
        } else if (!password) {
            setAuthRequires({ user: '', pwd: 'გთხოვთ შეავსოთ ველი' });
            return;
        } else if (!userName) {
            setAuthRequires({ user: 'გთხოვთ შეავსოთ ველი', pwd: '' });
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
                    if (isRemembered) {
                        setItem('userName', userName);
                    } else {
                        setItem('userName', '')
                    }
                    setIsAuth(true);
                    setBtnLoading(false);
                } else {
                    setBtnLoading(false);
                }
            }).catch(() => {
                setAuthError('მომხმარებელი არ მოიძებნა')
                setBtnLoading(false)
            })
        }

    }



    return (
        <ScrollView scrollEnabled={false} keyboardShouldPersistTaps='always' contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }} >
            <View style={[styles.imageWrap, { alignItems: 'flex-start' }]}>
                <Image style={styles.image} source={require('../assets/images/Arrow-topLeft.png')} />
                <Image style={styles.image} source={require('../assets/images/Arrow-topRight.png')} />
            </View>
            <View style={styles.middleContent}>
                <View style={{ marginVertical: 10, }}>
                    <AppInput
                        label='მომხმარებელი'
                        value={userName}
                        onChangeText={(newValue: any) => setUsername(newValue)}
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
                    {authError ? <Text style={{ color: '#E50B09' }}>{authError}</Text> : null}
                    <TouchableOpacity style={styles.checkBox} onPress={() => setIsRemembered(!isRemembered)}>
                        <CheckBox value={isRemembered} onValueChange={() => setIsRemembered(!isRemembered)} />
                        <Text style={styles.passRecoveryText}>მომხმარებლის დამახსოვრება</Text>
                    </TouchableOpacity>

                </View>
                <AppButton
                    btnStyle={styles.authButton}
                    buttonTitle='ავტორიზაცია'
                    titleStylee={{ fontSize: 20, color: 'white' }}
                    onPress={login}
                    isLoading={btnLoading} />
                <TouchableOpacity style={styles.pasRecovery} onPress={() => { props.navigation.navigate('PasswordRecoveryScreen'); setPassword('') }}>
                    <Text style={styles.passRecoveryText}>პაროლის აღდგენა</Text>
                </TouchableOpacity>


            </View>
            <View style={[styles.imageWrap, { alignItems: 'flex-end' }]}>
                <Image style={styles.image} source={require('../assets/images/Arrow-bottomLeft.png')} />
                <Image style={styles.image} source={require('../assets/images/Arrow-bottomRight.png')} />
            </View>
            <Text style={{ textAlign: 'right', fontWeight: '700', fontSize: 12, marginRight: 10 }}>Powerd By UNICARD</Text>
        </ScrollView>
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
        marginVertical: 20
    },
    authInput: {
        width: deviceWidth - 80,
        height: deviceHeight / 12,
        backgroundColor: '#E6E7E8',
        borderRadius: 10,

        paddingLeft: 20
    },
    authButton: {
        width: deviceWidth - 80,
        height: deviceHeight / 12,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 10,
    },
    pasRecovery: {
        marginTop: 10,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    passRecoveryText: {
        fontSize: 16,
        lineHeight: 19,
        fontWeight: '600',
        color: '#000'
    },
    checkBox: {
        flexDirection: 'row',
        alignItems: 'center'

    }

})

export default AuthScreen;
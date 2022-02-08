import React, { useState, useEffect, useContext } from "react";
import { Alert, Button, Dimensions, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import AppButton from "../Components/AppButton";
import AppInput from "../Components/AppInput";
import Bonus from "../services/Bonus";
import { validateChangePassword } from "../services/comonServices";
import { AppContext } from "../services/ContextService";

const deviceHeight = Dimensions.get('screen').height;
const deviceWidth = Dimensions.get('screen').width;

const PasswordRecovery = (props: any) => {
    const [newPassword, setNewPassword] = useState<string>('');
    const [newPasswordValidation, setNewPasswordValidation] = useState<string>('პაროლი უნდა შედგებოდეს მინიმუმ 8 სიმბოლოსგან და  შეიცვადეს ასოებს და ციფრებს')
    const [repeatePassword, setRepeatePassword] = useState<string>('');
    const [repPasswordError, setRepPasswordError] = useState<string>('გაიმეორეთ პაროლი');
    const [otp, setOtp] = useState<string>('');
    const [passwordSecure, setPasswordSecure] = useState<boolean>(false);
    const [btnLoading, setBtnLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [step, setStep] = useState<number>(0);


    const { userName, setUsername } = useContext(AppContext);

    useEffect(() => {
        if (validateChangePassword(newPassword)) {
            setNewPasswordValidation('')
        } else {
            setNewPasswordValidation('პაროლი უნდა შედგებოდეს მინიმუმ 8 სიმბოლოსგან  და შეიცვადეს ასოებს და ციფრებს')
        }
        if (newPassword === repeatePassword) {
            setRepPasswordError('')
        } else {
            setRepPasswordError('გაიმეორეთ პაროლი')
        }
    }, [newPassword, repeatePassword, userName])

    let PasswordStep;

    if (step === 0) {
        PasswordStep = (
            <>
                <AppInput
                    label='მომხმარებელი'
                    value={userName}
                    onChangeText={(newValue: any) => setUsername(newValue)}
                    error={errorMessage}
                />
                <AppButton
                    isLoading={btnLoading}
                    btnStyle={styles.authButton}
                    buttonTitle='შემდეგი'
                    titleStylee={{ fontSize: 20, color: 'white' }}
                    onPress={() => chechUser()}
                />
            </>
        )
    } else if (step === 1) {
        PasswordStep = (
            <>
                <Text>გთხოვთ შეიყვანოთ ახალი პაროლი</Text>
                <AppInput
                    label='პაროლი'
                    value={newPassword}
                    onChangeText={(newValue: any) => setNewPassword(newValue)}
                    secureTextEntry={passwordSecure}
                    onPasswordSecure={() => setPasswordSecure(!passwordSecure)}
                    isPasswordInput
                    error={newPasswordValidation}
                />
                <Text>გთხოვთ გაიმეოროთ პაროლი</Text>
                <AppInput
                    label='გაიმეორეთ პაროლი'
                    value={repeatePassword}
                    onChangeText={(newValue: any) => setRepeatePassword(newValue)}
                    secureTextEntry={passwordSecure}
                    onPasswordSecure={() => setPasswordSecure(!passwordSecure)}
                    isPasswordInput
                    error={repPasswordError}
                />
                <AppInput
                    label='ერთჯერადი კოდი'
                    maxLength={4}
                    value={otp}
                    onChangeText={(newValue: any) => setOtp(newValue)}
                    keyboardType='numeric'
                    error={errorMessage}
                />
                <AppButton
                    isLoading={btnLoading}
                    btnStyle={styles.authButton}
                    buttonTitle='შემდეგი'
                    titleStylee={{ fontSize: 20, color: 'white' }}
                    onPress={() => changeUserPassword()}
                />
            </>
        )
    }

    const chechUser = () => {
        setErrorMessage('');
        if (userName === '') {
            setErrorMessage('გთხოვთ შეავსოთ ველი');
            return;
        }
        setBtnLoading(true)
        Bonus.SendUserOtp(userName).then(res => {
            if (res.data.success) {

                setStep(step + 1);
                setBtnLoading(false);
            } else {
                setBtnLoading(false);
                setErrorMessage(res.data.error.errorDesc)
            }
        }).catch(e => { console.log(e); setBtnLoading(false) })
    };

    const changeUserPassword = () => {
        setErrorMessage('')
        if (newPasswordValidation !== '' || repPasswordError !== '') return;
        setBtnLoading(true)
        let data = {
            username: userName,
            password: newPassword,
            confirmPassword: repeatePassword,
            otp: otp
        }

        Bonus.ChangeUserPassword(data).then(res => {
            if (res.data.success) {
                setBtnLoading(false);
                Alert.alert(
                    '',
                    'პაროლი წარმატებით შეიცვალა',
                    [
                        {
                            text: 'დასრულება',
                            onPress: () => props.navigation.navigate('AuthScreen')
                        },
                    ]
                )
            } else {
                setBtnLoading(false);
                setErrorMessage(res.data.error.errorDesc)
            }
        }).catch(e => { console.log(e); setBtnLoading(false) })
    }


    return (
        <ScrollView scrollEnabled={true} keyboardShouldPersistTaps='always' contentContainerStyle={{ flexGrow: 1, marginHorizontal: 10 }} >
            <View style={styles.middleContent}>
                <View style={{ marginVertical: 10 }}>
                    {PasswordStep}
                </View>
            </View>
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
        marginTop: 20
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
    }

})


export default PasswordRecovery;
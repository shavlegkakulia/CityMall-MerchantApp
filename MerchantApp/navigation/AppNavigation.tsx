import React, { useContext, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ManagePoints from '../Screens/ManagePoints';
import Dashboard from '../Screens/Dashboard';
import TransactionHistory from '../Screens/TransactionHistory';
import ScannerAnimation from '../Components/ScannerAnimation';
import AuthScreen from '../Screens/AuthScreen';
import { AppContext } from '../services/ContextService';
import { Button } from 'react-native';
import LogoutButton from '../Components/LogoutButton';
import AuthService from '../services/AuthService';

const Stack = createStackNavigator();

const AppNavigatior = (props: any) => {
    useEffect(() => {
        AuthService.isAuthenticated().then(data => setIsAuth(data));
    }, [])
   
    

    const { isAuthenticated, setIsAuth } = useContext(AppContext);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="AuthScreen">
                {isAuthenticated === false ? (<Stack.Screen
                    name='AuthScreen'
                    component={AuthScreen}
                    options={{ title: '', headerShown: false }}
                />) : (
                    <>
                        <Stack.Screen
                            name='Dashboard'
                            component={Dashboard}
                            options={{
                                title: `Device Id: ${props.id}`,
                                headerStyle: {
                                    backgroundColor: '#3269E5',
                                    height: 50
                                },
                                headerTintColor: '#fff',
                                headerTitleStyle: {
                                    fontWeight: '500',
                                    fontSize: 16
                                },
                                headerRight: () => <LogoutButton onPress={() => {
                                    AuthService.SignOut();
                                    setIsAuth(false);
                                }} />
                            }} />
                        <Stack.Screen
                            name='CollectPoints'
                            component={ManagePoints}
                            options={{ title: 'ქულების დაგროვება' }} />

                        <Stack.Screen
                            name='PayWithPoints'
                            component={ManagePoints}
                            options={{ title: 'ქულების დახარჯვა' }} />
                        <Stack.Screen
                            name='TransactionHistory'
                            component={TransactionHistory}
                            options={{ title: 'ტრანზაქციების ისტორია' }} />
                        <Stack.Screen
                            name='ScannerAnimation' component={ScannerAnimation} />
                    </>)}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigatior;



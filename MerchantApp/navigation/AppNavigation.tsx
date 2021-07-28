import React, { useEffect,  useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import CollectPoints from '../Screens/CollectPoints';
import Dashboard from '../Screens/Dashboard';
import PayWithPoints from '../Screens/PayWithPoints';
import TransactionHistory from '../Screens/TransactionHistory';
import ScannerAnimation from '../Components/ScannerAnimation';
import AuthScreen from '../Screens/AuthScreen';
import AuthService from '../services/AuthService';
import AuthContext from '../services/ContextService';


const Stack = createStackNavigator();

const AppNavigatior = (props: any) => {
    const { authenticated } = useContext(AuthContext);

    
    useEffect(() => {
        console.log('AUTHENTICATED USEFFECT ----->', authenticated)
    }, [authenticated])
    return (
        <NavigationContainer>
            {/* <AuthContext.Consumer>
                {(context) => */}
                    <Stack.Navigator initialRouteName="AuthScreen">

                        {authenticated === false ? (<Stack.Screen
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
                                        },
                                        headerTintColor: '#fff',
                                        headerTitleStyle: {
                                            fontWeight: '500',
                                            fontSize: 16
                                        },
                                        headerTitleAlign: 'center'
                                    }} />
                                <Stack.Screen
                                    name='CollectPoints'
                                    component={CollectPoints}
                                    options={{ title: 'ქულების დაგროვება' }} />

                                <Stack.Screen
                                    name='PayWithPoints'
                                    component={PayWithPoints}
                                    options={{ title: 'ქულების დახარჯვა' }} />
                                <Stack.Screen
                                    name='TransactionHistory'
                                    component={TransactionHistory}
                                    options={{ title: 'ტრანზაქციების ისტორია' }} />
                                <Stack.Screen
                                    name='ScannerAnimation' component={ScannerAnimation} />
                            </>)}
                    </Stack.Navigator>
                    
            {/* </AuthContext.Consumer> */}
        </NavigationContainer>
    )
}

export default AppNavigatior;
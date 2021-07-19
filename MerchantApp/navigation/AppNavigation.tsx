import  React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import CollectPoints from '../Screens/CollectPoints';
import Dashboard from '../Screens/Dashboard';
import PayWithPoints from '../Screens/PayWithPoints';
import TransactionHistory from '../Screens/TransactionHistory';
import ScannerAnimation from '../Components/ScannerAnimation';


const Stack = createStackNavigator();

const AppNavigatior = (props: any) => {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Dashboard">
                <Stack.Screen 
                    name = 'Dashboard' 
                    component = {Dashboard} 
                    options={{ title: 'მთავარი' }} />
                <Stack.Screen 
                    name = 'CollectPoints' 
                    component = {CollectPoints}
                    options={{ title: 'ქულების დაგროვება' }}/>
                <Stack.Screen 
                    name = 'PayWithPoints' 
                    component = {PayWithPoints} 
                    options={{ title: 'ქულების დახარჯვა' }}/>
                <Stack.Screen 
                    name = 'TransactionHistory' 
                    component = {TransactionHistory}
                    options={{ title: 'ტრანზაქციების ისტორია' }} />
                <Stack.Screen 
                    name = 'ScannerAnimation' component = {ScannerAnimation} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigatior;
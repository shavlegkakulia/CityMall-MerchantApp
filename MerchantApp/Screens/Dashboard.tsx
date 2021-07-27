import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import Bonus from '../services/Bonus';
import OtpBox from '../Components/OtpBox/OtpBox';
import { getUniqueId } from 'react-native-device-info';

// deviceId = bc410a9ca5485e94

const Dashboard = (props: any) => {

    const [deviceId, setDeviceId] = useState<string>('');
    let card = '1199110599970303'
    useEffect(() => {
      setDeviceId(getUniqueId());
    }, []);

    useEffect(() => {
        Bonus.GetAccountInfo(card, deviceId).then(res => {
            console.log('******************************',res)
        }).catch(error =>{console.log(error)})
    }, [deviceId])



    return (

        <View style={styles.container}>
            
            <View style={styles.merchantLogo}>
                <Image source={require('../assets/images/zara-logo.png')} />
            </View>
            <TouchableOpacity style={[styles.service, styles.collectPoints]} onPress={() => props.navigation.navigate('CollectPoints')}>
                <Text style={styles.serviceLabel}>ქულების დაგროვება</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.service, styles.payWithPoints]} onPress={() => props.navigation.navigate('PayWithPoints')}>
                <Text style={styles.serviceLabel}>ქულებით გადახდა</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.service, styles.transactionHistory]} onPress={() => props.navigation.navigate('TransactionHistory')}>
                <Text style={styles.serviceLabel}>ოპერაციებსი ისტორია</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.service, styles.closeDay]} >
                <Text style={styles.serviceLabel}>დღის დახურვა</Text>
            </TouchableOpacity>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 5,
        backgroundColor: '#FFFFFF'
    },

    dashboardHeader: {
        width: '100%',
        height: 60,
        backgroundColor: '#cfcfcf',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        fontSize: 14,
        color: '#000'
    },
    merchantLogo: {
        height: 180,
        alignItems: 'center',
        justifyContent: 'center'
    },
    service: {
        width: '100%',
        height: 80,
        borderRadius: 10,
        backgroundColor: '#94dd34',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },

    payWithPoints: {
        backgroundColor: '#FFC900'
    },
    collectPoints: {
        backgroundColor: '#3269E5'
    },
    transactionHistory: {
        backgroundColor: '#40ADEC'
    },
    closeDay: {
        backgroundColor: '#E50B09'
    },
    serviceLabel: {
        fontSize: 24,
        fontWeight: '500',
        textAlign: 'center',
        color: 'white'



    }



})

export default Dashboard;
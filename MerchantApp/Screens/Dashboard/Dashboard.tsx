import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { getUniqueId } from 'react-native-device-info';

const Dashboard = () => {
    const [deviceId, setDeviceId] = useState<string>('');

    useEffect(() => {
        setDeviceId(getUniqueId())
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.dashboardHeader}>
                <Text>Device ID: {deviceId}</Text>
            </View>
            <View style = {styles.merchantLogo}>
                <Image source = {require('../../assets/images/zara-logo.png')}  />
            </View>
                 <TouchableOpacity style = {styles.service}>
                    <Text style={styles.serviceLabel}>ქულების დაგროვება</Text>
                </TouchableOpacity>
                 <TouchableOpacity style = {styles.service}>
                    <Text style={styles.serviceLabel}>ქულების დახარჯვა</Text>
                </TouchableOpacity>
                 <TouchableOpacity style = {styles.service}>
                    <Text style={styles.serviceLabel}>ოპერაციებსი ისტორია</Text>
                </TouchableOpacity>
                 <TouchableOpacity style = {styles.service} >
                    <Text style={styles.serviceLabel}>დღის დახურვა</Text>
                </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 5,
        backgroundColor: '#82EEFD'
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
    merchantLogo : {
        height: 180,
        alignItems: 'center',
        justifyContent: 'center'
    },
    service: {
        width: '100%',
        height: 80,
        borderWidth: 1,
        borderColor: '#82EEFD',
        borderRadius: 10,
        backgroundColor: '#59788e',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    serviceLabel: {
        fontSize: 24,
        fontWeight: '500',
        textAlign: 'center',
       
        

    }
    


})

export default Dashboard;
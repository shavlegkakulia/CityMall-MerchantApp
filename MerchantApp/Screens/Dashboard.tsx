import React, { useEffect, useState } from 'react';
import { Animated, Image, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { getUniqueId } from 'react-native-device-info';

const Dashboard = (props: any) => {
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
                <Image source = {require('../assets/images/zara-logo.png')}  />
            </View>
                 <TouchableOpacity style = {styles.service} onPress = {() => props.navigation.navigate('CollectPoints')}>
                    <Text style={styles.serviceLabel}>ქულების დაგროვება</Text>
                </TouchableOpacity>
                 <TouchableOpacity style = {styles.service} onPress = {() => props.navigation.navigate('PayWithPoints')}>
                    <Text style={styles.serviceLabel}>ქულების დახარჯვა</Text>
                </TouchableOpacity>
                 <TouchableOpacity style = {styles.service} onPress = {() => props.navigation.navigate('TransactionHistory')}>
                    <Text style={styles.serviceLabel}>ოპერაციებსი ისტორია</Text>
                </TouchableOpacity>
                 <TouchableOpacity style = {styles.service} >
                    <Text style={styles.serviceLabel}>დღის დახურვა</Text>
                </TouchableOpacity>
        </View>

        // <View  style={{flex:1}}>

        //     <View style={{flex: 1, backgroundColor: 'red'}}>
        //         <Text >დაასკანერეთ შტრიხკოდი</Text>
        //     </View>

        //     <View style = {{flex: 2, backgroundColor: 'green', marginHorizontal: 30, alignItems: 'center', justifyContent: 'center'}}>
        //          <View style={{ position: 'absolute', right: 0, bottom: 0, transform: [{rotateZ: '180deg'}] }}>
        //              <View style={{ height: 5, width: 50, backgroundColor: 'white' }} />
        //              <View style={{ height: 50, width: 5, backgroundColor: 'white' }} />
        //          </View>
        //          <View style={{ position: 'absolute', left: 0, bottom: 0, }}>
        //              <View style={{ height: 50, width: 5, backgroundColor: 'white' }} />
        //              <View style={{ height: 5, width: 50, backgroundColor: 'white' }} />
        //          </View>
        //          <View style={{ position: 'absolute', left: 3, top: -3,  transform: [{rotateZ: '90deg'}]}} >
        //              <View style={{ height: 50, width: 5, backgroundColor: 'blue' }} />
        //              <View style={{ height: 5, width: 50, backgroundColor: 'blue' }} />
        //          </View>
        //          <View style={{ position: 'absolute', right: 3, top: -3,  transform: [{rotateZ: '90deg'}]}} >
        //              <View style={{ height: 5, width: 50, backgroundColor: 'blue' }} />
        //              <View style={{ height: 50, width: 5, backgroundColor: 'blue' }} />
        //          </View>
        //     </View>

        //     <View  style={{flex: 1, backgroundColor: 'yellow'}}>
        //         <Text >Loading....</Text>
        //     </View>
                     

        // </View>
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
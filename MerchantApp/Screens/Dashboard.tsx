import React, { useState, useContext } from 'react';
import { Image, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { getUniqueId } from 'react-native-device-info';
import AuthService from '../services/AuthService';
import { getTransactions, clearTransactions } from '../services/TransactionService';
import CloseDayModal from '../Components/CloseDayModal';
import { AppContext } from '../services/ContextService';
// deviceId = bc410a9ca5485e94

const Dashboard = (props: any) => {

    const [showModal, setShowModal] = useState<boolean>(false);
    const [closeDayData, setCloseDayData] = useState({
        accumulationSum:0,
        accumulationReversalSum:0,
        accumulationCount:0,
        paymentSum:0,
        paymentReversalSum:0,
        paymentCount:0

    });

    const {signOut} = useContext(AppContext);


    const startCloseDay = () => {
        getTransactions().then(data => {
            console.log(data)
            let AccumulationCount= 0;
            let Accumulation= 0;
            let AccumulationReversal= 0;
            let PaymentCount = 0
            let Payment= 0;
            let PaymentReversal= 0;


            data.forEach((e: any) => {
                let payArray = [];
                let accArray = []
                if (e.tranType === 'Payment') {
                    payArray.push(e)
                    if (e.reversed === true) {
                        PaymentReversal += e.tranAmount;
                    } else {
                        Payment += e.tranAmount;
                    }
                    PaymentCount = payArray.length;
                } else {
                    accArray.push(e)
                    if (e.reversed === true) {
                        AccumulationReversal += e.tranAmount;
                    } else {
                        Accumulation += e.tranAmount;
                    }
                    AccumulationCount = accArray.length
                }

            });
            setCloseDayData((prevState: any) => {
                return {
                    ...prevState, 
                    paymentCount: PaymentCount,
                    accumulationSum: Accumulation,
                    accumulationReversalSum: AccumulationReversal,
                    accumulationCount:AccumulationCount,
                    paymentSum: Payment,
                    paymentReversalSum: PaymentReversal,
                    
                }
            });
            
            
            setShowModal(true);
        })
    }


    return (


        <View style={styles.container}>
            {showModal && <CloseDayModal modalVisible={showModal} closeModal={() => startCloseDay()} data={closeDayData} />}
            <View style={styles.merchantLogo}>
                <Image source={require('../assets/images/zara-logo.png')} />
            </View>
            <TouchableOpacity style={[styles.service, styles.collectPoints]} onPress={() => props.navigation.navigate('CollectPoints', { type: 'Collect' })}>
                <Text style={styles.serviceLabel}>ქულების დაგროვება</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.service, styles.payWithPoints]} onPress={() => props.navigation.navigate('PayWithPoints', { type: 'Pay' })}>
                <Text style={styles.serviceLabel}>ქულებით გადახდა</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.service, styles.transactionHistory]} onPress={() => props.navigation.navigate('TransactionHistory')}>
                <Text style={styles.serviceLabel}>ოპერაციების ისტორია</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.service, styles.closeDay]} onPress={() => {
                startCloseDay();
                AuthService.SignOut();
                signOut();
            }} >
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
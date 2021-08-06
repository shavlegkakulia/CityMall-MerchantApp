import React, { useState, useContext } from 'react';
import { Alert, Image, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { getTransactions, clearTransactions } from '../services/TransactionService';
import AuthService from '../services/AuthService';
import CloseDayModal from '../Components/CloseDayModal';
import { AppContext } from '../services/ContextService';
import Bonus from '../services/Bonus';
import axios from 'axios';
import envs from '../config/env'

const Dashboard = (props: any) => {

    const [showModal, setShowModal] = useState<boolean>(false);
    const [btnLoading, setBtonLoading] = useState<boolean>(false);
    const [closeDayData, setCloseDayData] = useState({
        accumulationSum: 0,
        accumulationReversalSum: 0,
        accumulationCount: [],
        paymentSum: 0,
        paymentReversalSum: 0,
        paymentCount: []

    });

    const { isAuthenticated } = useContext(AppContext);


    const startCloseDay = () => {
        getTransactions().then(data => {
            let AccumulationCount: string[] = [];
            let Accumulation: number = 0;
            let AccumulationReversal: number = 0;
            let PaymentCount: string[] = []
            let Payment: number = 0;
            let PaymentReversal: number = 0;


            data.forEach((e: any) => {
                if (e.tranType === 'Payment') {
                    PaymentCount.push(e)
                    if (e.reversed === true) {
                        PaymentReversal += e.tranAmount;
                    } else {
                        Payment += e.tranAmount;
                    }
                } else {
                    AccumulationCount.push(e)
                    if (e.reversed === true) {
                        AccumulationReversal += e.tranAmount;
                    } else {
                        Accumulation += e.tranAmount;
                    }
                }

            });
            setCloseDayData((prevState: any) => {
                return {
                    ...prevState,
                    paymentCount: PaymentCount,
                    accumulationSum: Accumulation,
                    accumulationReversalSum: AccumulationReversal,
                    accumulationCount: AccumulationCount,
                    paymentSum: Payment,
                    paymentReversalSum: PaymentReversal,

                }
            });
            setShowModal(true);
        })
    }


    const CloseDay = () => {
        setBtonLoading(true);
        let data = {
            batchId: '1',
            accumulateTranCount: closeDayData.accumulationCount.length,
            accumulateAmount: closeDayData.accumulationSum,
            accumulateAmountRevers: closeDayData.accumulationReversalSum,
            payTranCount: closeDayData.paymentCount.length,
            payAmount: closeDayData.paymentSum,
            payAmountRevers: closeDayData.paymentReversalSum,
        }
        Bonus.CloseDay(data).then(res => {
            //console.log(res.data)
            if (res.data.success) {
                setBtonLoading(false);
                setShowModal(false);
                Alert.alert(
                    'დღის დახურვა',
                    'დღის დახურვა წარმატებულია',
                )
                clearTransactions();
            } else {
                setBtonLoading(false);
                Alert.alert(
                    'დაფიქსირდა შეცდომა'
                )
                
            }
        }).catch(e => {console.log(e); setBtonLoading(false)})
    }


    const fn = async () => {
        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        const refreshObj = new URLSearchParams();
        refreshObj.append('scope', 'MerchantApi offline_access');
        refreshObj.append('client_id', 'MerchantApi');
        refreshObj.append('client_secret', 'secret');
        refreshObj.append('grant_type', 'refresh_token');
        refreshObj.append('refresh_token', await AuthService.getRefreshToken() || '');
        console.log(`${envs.CONNECT_URL}/connect/token`, refreshObj, config)
         axios.post(`${envs.CONNECT_URL}/connect/token`, refreshObj, config)
          .then((Response: any) => {
            console.log('--------Refresh Token Response-------', Response)
          }).catch(err => console.log('--------Refresh Token Error-------', err))
          
    }

    

    return (


        <View style={styles.container}>
            {showModal && <CloseDayModal modalVisible={showModal} closeModal={()=> {setShowModal(false); setBtonLoading(false)}} data={closeDayData} isLoading = {btnLoading} onCloseDay = {CloseDay}/>}
            <View style={{ flex: 4, alignItems: 'center', marginVertical: 15 }}>
                <Image style={styles.merchantLogo} source={require('../assets/images/miniso-logo.png')} />
            </View>
            <View style={styles.gridRow}>
                <TouchableOpacity style={[styles.service, styles.collectPoints]} onPress={() => props.navigation.navigate('CollectPoints', { type: 'Collect' })}>
                    <Text style={styles.serviceLabel}>ქულების დაგროვება</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.gridRow}>
                <TouchableOpacity style={[styles.service, styles.payWithPoints]} onPress={() => props.navigation.navigate('PayWithPoints', { type: 'Pay' })}>
                    <Text style={styles.serviceLabel}>ქულებით გადახდა</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.gridRow}>
                <TouchableOpacity style={[styles.service, styles.transactionHistory]} onPress={() => props.navigation.navigate('TransactionHistory')}>
                    <Text style={styles.serviceLabel}>ოპერაციების ისტორია</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.gridRow}>
                <TouchableOpacity style={[styles.service, styles.closeDay]} onPress={startCloseDay} >
                    <Text style={styles.serviceLabel}>დღის დახურვა</Text>
                </TouchableOpacity>
            </View>
            {/* <TouchableOpacity style={[styles.service, styles.closeDay]} onPress={()=>AuthService.setToken('kajshdjaskdhkahskdjhakshd', '')} >
                    <Text style={styles.serviceLabel}>წაშლა</Text>
                </TouchableOpacity> */}
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingHorizontal: 5,
        backgroundColor: '#FFFFFF'
    },

    gridRow: {
        flex: 2,
        marginHorizontal: 10
    },

    merchantLogo: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    service: {
        width: '100%',
        height: '100%',
        maxHeight: 80,
        borderRadius: 10,
        backgroundColor: '#94dd34',
        justifyContent: 'center',
        alignItems: 'center',
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
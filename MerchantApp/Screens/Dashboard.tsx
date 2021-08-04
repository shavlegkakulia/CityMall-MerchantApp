import React, { useState, useContext } from 'react';
import { Image, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { getTransactions, clearTransactions } from '../services/TransactionService';
import CloseDayModal from '../Components/CloseDayModal';
import { AppContext } from '../services/ContextService';
import Bonus from '../services/Bonus';

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
                // let payArray = [];
                // let accArray = []
                if (e.tranType === 'Payment') {
                    PaymentCount.push(e)
                    if (e.reversed === true) {
                        PaymentReversal += e.tranAmount;
                    } else {
                        Payment += e.tranAmount;
                    }
                    // PaymentCount = payArray.length;
                } else {
                    AccumulationCount.push(e)
                    if (e.reversed === true) {
                        AccumulationReversal += e.tranAmount;
                    } else {
                        Accumulation += e.tranAmount;
                    }
                    // AccumulationCount = accArray.length
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
            console.log(res.data)
            if (res.data.success) {
                setBtonLoading(false);
                setShowModal(false);
                clearTransactions();
            } else {
                setBtonLoading(false);
            }
        }).catch(e => {console.log(e); setBtonLoading(false)})
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
                <TouchableOpacity style={[styles.service, styles.closeDay]} onPress={() => startCloseDay()} >
                    <Text style={styles.serviceLabel}>დღის დახურვა</Text>
                </TouchableOpacity>
            </View>
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
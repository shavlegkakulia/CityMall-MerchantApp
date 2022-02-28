import React, { useContext, useEffect, useState } from 'react';
import {Image, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import Bonus, { ITerminalInfo } from '../services/Bonus';
import FullScreenLoader from '../Components/FullScreenLoader';
import { AppContext } from '../services/ContextService';

const Dashboard = (props: any) => {
    const { setMerchantname } = useContext(AppContext);

    const [terminalInfo, setTerminalInfo] = useState<ITerminalInfo>();
    const [isInit, setIsInit] = useState<boolean>(false);
    const [closeDayData, setCloseDayData] = useState({
        accumulationSum: 0,
        accumulationReversalSum: 0,
        accumulationCount: [],
        paymentSum: 0,
        paymentReversalSum: 0,
        paymentCount: []

    });


    useEffect(() => {
        getTerminalInfo()
    }, []);



    const getTerminalInfo = () => {
        Bonus.GetTerminalInfo().then(res => {
            setIsInit(true);
            setTerminalInfo(res.data);
            setMerchantname(res.data.merchantName);
        })
            .catch(e => {
                setIsInit(true)
               console.log(JSON.stringify(e.response), JSON.parse(JSON.stringify(e.response)).data.error)
            });
    };
    
    return (
        !isInit ?
            <FullScreenLoader />
            :
            <View style={styles.container}>
                <View style={{ flex: 4, alignItems: 'center', marginVertical: 15 }}>
                    <Image style={styles.merchantLogo} source={require('../assets/images/city-mall-icon.png')} />
                </View>
                <View style={styles.gridRow}>
                    <TouchableOpacity style={[styles.service, styles.collectPoints]} onPress={() => props.navigation.navigate('CollectPoints', { type: 'Collect' })}>
                        <Text style={styles.serviceLabel}>ქულების დაგროვება</Text>
                    </TouchableOpacity>
                </View>
                {
                    terminalInfo?.canSpend ?
                        <View style={styles.gridRow}>
                            <TouchableOpacity style={[styles.service, styles.payWithPoints]} onPress={() => props.navigation.navigate('PayWithPoints', { type: 'Pay' })}>
                                <Text style={styles.serviceLabel}>ქულებით გადახდა</Text>
                            </TouchableOpacity>
                        </View>
                        : null
                }
                <View style={styles.gridRow}>
                    <TouchableOpacity style={[styles.service, styles.useVoucher]} onPress={() => props.navigation.navigate('UseVoucher')} >
                        <Text style={styles.serviceLabel}>ვაუჩერების განაღდება</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.gridRow}>
                    <TouchableOpacity style={[styles.service, styles.transactionHistory]} onPress={() => props.navigation.navigate('TransactionIndex')}>
                        <Text style={styles.serviceLabel}>ოპერაციების ისტორია</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{ textAlign: 'right', fontWeight: '700', fontSize: 12, marginRight: 10 }}>Powerd By UNICARD</Text>
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
        width: 130,
        height: 170,
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

    useVoucher: {
        backgroundColor: '#228B22'
    },

    serviceLabel: {
        fontSize: 24,
        fontWeight: '500',
        textAlign: 'center',
        color: 'white'
    }
});

export default Dashboard;
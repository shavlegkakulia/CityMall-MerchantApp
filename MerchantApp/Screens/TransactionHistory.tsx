import React, { useState, useEffect, Fragment } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, SegmentedControlIOSComponent } from 'react-native';
import Bonus from '../services/Bonus';
import { getTransactions, ITransaction, updateTransactions } from '../services/TransactionService';
import ConfirmationModal from '../Components/ConfirmationModal';
import FullScreenLoader from '../Components/FullScreenLoader';


const TransactionHistory = () => {

    const [transactions, setTransactions] = useState([]);
    const [accumulationTrSum, setAccumulationTrSum] = useState<number | string>(0);
    const [payWithPointsSum, setPayWithPointsSum] = useState<number | string>(0);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedTran, setSelectedTran] = useState<any>();
    const [btnLoading, setBtnLoading] = useState<boolean>(false);
    const [isInit, setIsInit] = useState<boolean>(false);

    const formatDate = (dateString: string) => {
        if (!dateString) return "";
        let dateObj = new Date(dateString);
        let month = dateObj.getUTCMonth() + 1; //months from 1-12
        let day = dateObj.getUTCDate();
        let year = dateObj.getUTCFullYear();
        let minutes = dateObj.getMinutes();
        let hour = dateObj.getHours();
        let newdate =
            ("0" + day).slice(-2) +
            "." +
            ("0" + month).slice(-2) +
            "." +
            year +
            " " +
            ("0" + hour).slice(-2) +
            ":" +
            ("0" + minutes).slice(-2);
        return newdate;
    };

    useEffect(() => {
        loadTransactions();
    }, []);

    const loadTransactions = () => {
        getTransactions().then(res => {
            setTransactions(res);
            transactionSum(res);
            setIsInit(true);
        })

    };

    const transactionSum = (data: ITransaction[]) => {
        let accSum = 0;
        let paySum = 0;
        let accumulatedTr = data.filter(tr => tr.tranType !== 'Payment');
        let paymentTr = data.filter(tr => tr.tranType === 'Payment');
        //console.log('accumulation ----->', accumulatedTr, 'paymentTr ----->',paymentTr);

        accumulatedTr.forEach((tr: ITransaction) => {
            
            if (tr.reversed === false && tr.tranAmount !== undefined) {
                accSum += tr.tranAmount;
                setAccumulationTrSum(accSum);
            };
        });
        paymentTr.forEach((tr: ITransaction) => {
            
            if (tr.reversed === false && tr.tranAmount !== undefined) {
                paySum += tr.tranAmount
                setPayWithPointsSum(paySum);
            };
        });
        
    }

    const reverseTransaction = async () => {
        setBtnLoading(true);
        let type = selectedTran.tranType === 'Payment' ? 2 : 1;
        let reverseData = {
            card: selectedTran.card,
            amount: selectedTran.tranAmount,
            deviceId: selectedTran.deviceId,
            stan: selectedTran.stan
        };
        Bonus.ReverseTransaction(type, reverseData).then(res => {
            if (res.status === 200) {
                updateTransactions(selectedTran.stan).then(() => {
                    loadTransactions();
                    setShowModal(false);
                    setBtnLoading(false);
                });
            } else {
                setBtnLoading(false);
            };

        }).catch(e => { console.log(e); setBtnLoading(false) });
    };

    const confirmReverse = (tran: any) => {
        setSelectedTran(tran);
        setShowModal(true);
        return;
    };

    const Transaction = (props: any) => {
        const { card, reversed, tranAmount, tranDate, tranType } = props.transaction;
        return (
            <View style={[styles.tranWrap, tranType === 'Payment' ? styles.tranWrapPay : styles.tranWrapCollect, reversed ? styles.reversed : {}]}
                pointerEvents={reversed ? 'none' : 'auto'}>
                <View>
                    <Text>ბარათი: {card}</Text>
                    <Text>ქულა: {tranAmount}</Text>
                    <Text>თარიღი: {formatDate(tranDate)}</Text>
                </View>
                <TouchableOpacity onPress={() => confirmReverse(props.transaction)}>
                    <Image style={[styles.reversalImg, reversed ? styles.reversed : {}]} source={require('../assets/images/reversal.png')} />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        !isInit ?
            <FullScreenLoader /> :

            <SafeAreaView style={styles.mainContainer}>
                <ConfirmationModal
                    modalVisible={showModal}
                    closeModal={() => setShowModal(false)}
                    isLoading={btnLoading}
                    onReverseTransaction={reverseTransaction} />
                {transactions && transactions.length === 0 ?
                <View style={styles.noTransactions}>
                    <Image style= {styles.searchIcon} source = {require('../assets/images/search.png')} />
                    <Text style={{ fontSize: 18, textAlign: 'center' }}>ტრანზაქციები არ მოიძებნა</Text>
                </View>
                     :
                    <View style={{ flex: 1, width: '100%' }}>
                        <Text style={styles.transactionSum}>დაგროვებული ქულების ჯამი: {accumulationTrSum} </Text>
                        <Text style={styles.transactionSum}>დახარჯული ქულების ჯამი: {payWithPointsSum} </Text>
                        <FlatList
                            contentContainerStyle={{ padding: 10 }}
                            data={transactions}
                            renderItem={({ item }) => <Transaction transaction={item} />}
                            keyExtractor={(item: any) => item.stan} />
                    </View>}
            </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginHorizontal: 20,
        marginTop: 20
    },

    noTransactions : {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },

    searchIcon: {
        width: 30,
        height: 30,
        marginRight: 10
    },

    tranWrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginBottom: 20,
        borderWidth: 2,
        borderRadius: 10
    },

    transactionSum: {
        textAlign: 'right',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#000'
    },

    tranWrapPay: {
        borderColor: '#ffda02'
    },

    tranWrapCollect: {
        borderColor: 'green'
    },

    reversalImg: {
        width: 33,
        height: 33,
    },

    reversed: {
        opacity: 0.3,
    }
})

export default TransactionHistory;
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Bonus from '../services/Bonus';
import { getTransactions, updateTransactions } from '../services/TransactionService';
import ConfirmationModal from '../Components/ConfirmationModal';

const TransactionHistory = () => {

    const [transactions, setTransactions] = useState([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedTran, setSelectedTran] = useState<any>();

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
        });
    };

    const reverseTransaction = async () => {
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
                });
            } else {
                console.log('*****ReverseTransaction*****', res.data);
            };
            
        }).catch(e => console.log(e));
    };

    const confirmReverse = (tran: any) => {
        setSelectedTran(tran);
        setShowModal(true);
        return;
    };

    const Transaction = (props: any) => {
        const { card, reversed, tranAmount, tranDate, tranType } = props.transaction;
        return (
            <View
                style={[styles.tranWrap, tranType === 'Payment' ? styles.tranWrapPay : styles.tranWrapCollect]}
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
        <ScrollView style={styles.mainContainer}>
            <ConfirmationModal
                modalVisible={showModal}
                closeModal={() => setShowModal(false)}
                onReverseTransaction={reverseTransaction} />
            {transactions?.map((tran, index) => (<Transaction key={index} transaction={tran} />))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginHorizontal: 30,
        marginTop: 20
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

    tranWrapPay: {
        borderColor: '#ffda02'
    },

    tranWrapCollect: {
        borderColor: 'green'
    },

    reversalImg: {
        width: 30,
        height: 30,
    },

    reversed: {
        opacity: 0.3,
    }
})

export default TransactionHistory;
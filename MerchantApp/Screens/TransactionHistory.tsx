import React, {useState, useEffect} from 'react';
import {ScrollView, StatusBar,StyleSheet,Text,View, TouchableOpacity, Image} from 'react-native';
import Bonus from '../services/Bonus';
import { getTransactions, updateTransactions } from '../services/TransactionService';

const TransactionHistory = () => {

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        initialize();
    }, [])

    const initialize = () => {
        getTransactions().then(res => {
            setTransactions(res)
        });
    }

    const reverseTransaction = async(tran: any) => {
        let type = tran.tranType === 'Payment'? 2: 1;
        let reverseData = {
            card: tran.card,
            amount: tran.tranAmount,
            deviceId: tran.deviceId,
            stan: tran.stan
        }
        console.log(type,reverseData )
        Bonus.ReverseTransaction(type, reverseData).then(res => {
            console.log('*******************************', res)
            if(res.status === 200) {
              updateTransactions(tran.stan).then(()=> {
                initialize();
              });


            }
        }).catch(e =>console.log('88888888888888888888888888888', JSON.stringify(e)))
    }
    const Transaction =(props: any)=> {
        const {card, reversed, tranAmount, tranDate, tranType} = props.transaction;
        return (
            <View style = {[styles.tranWrap, tranType === 'Payment'? styles.tranWrapPay : styles.tranWrapCollect]} pointerEvents = {reversed? 'none' : 'auto'}>
                <View>
                    <Text>ბარათი: {card}</Text>
                    <Text>თანხა: {tranAmount}</Text>
                    <Text>თარიღი: {tranDate}</Text>
                </View>
                <TouchableOpacity onPress={()=>{reverseTransaction(props.transaction)}}>
                    <Image style={[styles.reversalImg, reversed? styles.reversed: {}]} source = {require('../assets/images/reversal.png')}/>
                </TouchableOpacity>
            </View>
        )
    }
    
    return (
        <ScrollView style={styles.mainContainer}>
            {transactions?.map((tran, index) => (<Transaction key= {index} transaction = {tran} />))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginHorizontal: 20,
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

    reversed : {
        opacity: 0.3,
    }
})

export default TransactionHistory;
import React, { useEffect, useState } from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ConfirmationModal from '../../Components/ConfirmationModal';
import FullScreenLoader from '../../Components/FullScreenLoader';
import Bonus, { IUsedVoucher } from '../../services/Bonus';
import { formatDate } from '../../utils/Utils';

const VoucherHistory = () => {

    const [usedVouchers, setUsedVouchers] = useState<IUsedVoucher[] | []>([]);
    const [selectedVoucher, setSelectedVoucher] = useState<IUsedVoucher>();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [btnLoading, setBtnLoading] = useState<boolean>(false);
    const [isInit, setIsInit] = useState<boolean>(false);



    useEffect(() => {
        getUsedVouchers()
    }, [])

    const getUsedVouchers = () => {
        Bonus.GetUsedVouchers().then(res => {
            console.log(res.data)
            setUsedVouchers(res.data);
        }).catch(e => {
            console.log(JSON.parse(JSON.stringify(e.response)))
        }).finally(() => {
            setIsInit(true);
        })
    };

    const confirmReverse = (tran: any) => {
        setSelectedVoucher(tran);
        setShowModal(true);
        return;
    };

    const reverseTransaction = async () => {
        setBtnLoading(true);
        let reverseData = {
            card: selectedVoucher!.card,
            voucherCode: selectedVoucher!.voucherCode,
            stan: selectedVoucher!.stan
        };
        Bonus.ReverseVoucher(reverseData).then(res => {
            
            setShowModal(false);
            setBtnLoading(false);
            getUsedVouchers();
        }).catch(e => {
            console.log(e);
            setBtnLoading(false)
        });
    };


    const VoucherList = (props: any) => {
        const { card, reversaled, voucherDescription, voucherUseDate, isActive } = props.voucher;
        return (

            <View style={[styles.tranWrap, isActive ===false ? styles.reversed : {}]}
                pointerEvents={isActive ===false  ? 'none' : 'auto'}>
                <View>
                    <Text>ბარათი: {card}</Text>
                    <Text>დასახელება: {voucherDescription}</Text>
                    <Text>განაღდების თარიღი: {formatDate(voucherUseDate)}</Text>
                </View>
                <TouchableOpacity onPress={() => confirmReverse(props.voucher)}>
                    <Image style={[styles.reversalImg, isActive === false ? styles.reversed : {}]} source={require('../../assets/images/reversal.png')} />
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
                {usedVouchers && usedVouchers.length === 0 ?
                    <View style={styles.noTransactions}>
                        <Image style={styles.searchIcon} source={require('../../assets/images/search.png')} />
                        <Text style={{ fontSize: 18, textAlign: 'center' }}>ვაუჩერები არ მოიძებნა</Text>
                    </View>
                    :
                    <View style={{ flex: 1, width: '100%' }}>
                        <FlatList
                            contentContainerStyle={{ padding: 10 }}
                            data={usedVouchers}
                            renderItem={({ item }) => <VoucherList voucher={item} />}
                            keyExtractor={(item: any) => item.stan} />
                    </View>}
            </SafeAreaView>
    );

};

export default VoucherHistory;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginHorizontal: 20,
        marginTop: 20
    },

    noTransactions: {
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
        borderRadius: 10,
        borderColor: '#228B22'
    },

    reversalImg: {
        width: 33,
        height: 33,
    },

    reversed: {
        opacity: 0.3,
    }
})
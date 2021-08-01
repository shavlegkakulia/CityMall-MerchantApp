import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Modal, Pressable, Image, } from 'react-native'



const CloseDayModal = (props: any) => {
    const { modalVisible, closeModal, data } = props;
    const { accumulationSum, accumulationReversalSum, accumulationCount, paymentSum, paymentReversalSum, paymentCount } = data;


    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}

                onRequestClose={() => {
                    closeModal;
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ alignSelf: 'center', marginTop: 40 }}>
                            <Text style={styles.sampleStyle
                            }>დღის დახურვა</Text>
                        </View>
                        <View style={styles.modalContent}>
                            <Text style={styles.sampleStyle}>დაგროვების ტრანზაქციები: </Text>
                            <Text>ტრანზაქციების რაოდებონა: {accumulationCount}</Text>
                            <Text>დაგროვებული ქულა: {accumulationSum}</Text>
                            <Text style={{ marginBottom: 10 }}>დარევერსებული ქულა: {accumulationReversalSum}</Text>
                            <Text style={styles.sampleStyle}>გადახდის ტრანზაქციები:</Text>
                            <Text>ტრანზაქციების რაოდებონა: {paymentCount}</Text>
                            <Text>დახარჯული ქულა: {paymentSum}</Text>
                            <Text>დარევერსებული ქულა: {paymentReversalSum}</Text>
                        </View>
                        <Pressable style={styles.button} onPress={closeModal}>
                            <Text style={styles.btnText}>დღის დახურვა</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#000000a3'
    },

    modalView: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 400,
        backgroundColor: "white",
        borderRadius: 7,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },

    modalContent: {
        paddingHorizontal: 20,
    },

    buttons: {
        width: '100%',
        alignItems: 'center'
    },
    button: {
        width: '50%',
        height: 45,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
        borderRadius: 7,
        marginBottom: 40

    },

    buttonCollect: {

    },
    buttonPay: {
        backgroundColor: '#ffda02'
    },

    btnText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500'
    },

    modalText: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight: '700',
    },

    modalTextCollect: {
        color: 'green',
    },
    modalTextPay: {
        color: '#ffda02'
    },
    sampleStyle: {
        fontSize: 16,
        fontWeight: '700',
    }
});

export default CloseDayModal;
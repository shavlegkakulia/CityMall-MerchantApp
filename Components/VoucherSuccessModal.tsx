import React from 'react';
import { StyleSheet, Text, View, Modal, Image } from 'react-native';
import AppButton from './AppButton';




const VoucherSuccessModal = (props: any) => {
    const { modalVisible, closeModal, data, isLoading } = props;

    return (
        <View >
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
                            }>ვაუჩერის განაღდება</Text>
                        </View>
                        <View style={styles.modalContent}>
                            <Text>ოპერაცია წარმატებით დასრულდა</Text>
                            <Image source={require('../assets/images/success_mark.png')} style={{width: 70, height: 70}} />
                        </View>
                        <View style={styles.buttons}>
                        <AppButton
                            btnStyle={styles.button}
                            buttonTitle='დახურვა'
                            titleStyle={styles.btnText}
                            onPress={closeModal}
                            isLoading={isLoading} />
                        </View>
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
        backgroundColor: '#000000a3',
    },

    modalView: {
        width: '90%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: "white",
        borderRadius: 7,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,

    },

    modalContent: {
        padding: 20,
    },

    button: {
        width: '45%',
        paddingHorizontal: 20,
        height: 45,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
        borderRadius: 7,
        marginBottom: 40
    },

    buttonDanger: {
        backgroundColor: '#E50B09'
    },
    buttonPay: {
        backgroundColor: '#ffda02'
    },

    btnText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center'
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
    },

    buttons: {
        width: '90%',
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between'
        
    }
});

export default VoucherSuccessModal;
import React from 'react';

import {StyleSheet, Text, View, Modal, Pressable, Image,  } from 'react-native'


const PointModal = (props: any) => {
 const {collectInfo, modalVisible, closeModal} = props;
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
              <View style={{alignSelf: 'center', marginTop: 40}}>
                  <Image style={{width: 60, height: 60}} source ={require('../assets/images/success_mark.png')} />
              </View>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>ბარათის მფლობელი: {collectInfo.fullName}</Text>
              <Text style={styles.modalText}>დაგროვებული ქულა: {collectInfo.bonus}</Text>
              <Text style={styles.modalText}>ხელმისაწვდომი ქულა: {collectInfo.availableBonus} </Text>
              <Text style={styles.modalText}>კლიენტის სტატუსი: </Text>
            </View>
              <Pressable style={styles.button} onPress={closeModal}>
                <Text style={styles.btnText}>დახურვა</Text>
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
  
  btnText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500'
  },

  modalText: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: '700',
    color: 'green'
  }
});

export default PointModal;
import React, { useState, useRef } from 'react';
import { useEffect } from 'react';
import { Button, StyleSheet, Text, View, Modal, Pressable, Alert, TextInput } from 'react-native'
import { color } from 'react-native-reanimated';
import AppInput from './AppInput';

const AppModal = (props: any) => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const InputRef = useRef<any>();

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}
        onShow={() => InputRef.current.focus()}
        onRequestClose={() => {
          props.closeModal;
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>{'შეტყობინება'.toLocaleUpperCase()}:</Text>
              <Text style={styles.modalText}>{'შეიყვანეთ ბარათის მფლობელის მობილურის ნომერი'.toLocaleUpperCase()}</Text>
              <View style={{ width: '100%' }}>
                <AppInput ref={InputRef} label='ტელეფონის ნომერი' autoFocus={true} value={phoneNumber} onChangeText={(newValue: any) => setPhoneNumber(newValue)} />
              </View>
            </View>
            <View style={styles.buttons}>
              <Pressable style={[styles.button, styles.btnDanger]} onPress={props.closeModal}>
                <Text style={styles.btnText}>{'არა'.toLocaleUpperCase()}</Text>
              </Pressable>
              <Pressable style={[styles.button, styles.btnGreen]} onPress={props.closeModal}>
                <Text style={styles.btnText}>{'დიახ'.toLocaleUpperCase()}</Text>
              </Pressable>
            </View>
          </View>
        </View>
        <TextInput autoFocus={true} placeholder="Autofocus to keep the keyboard" style={{ display: 'none' }} />
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
    elevation: 5
  },

  modalContent: {
    padding: 20,
  },

  buttons: {
    width: '100%',
    flexDirection: 'row'
  },

  button: {
    width: '50%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnGreen: {
    backgroundColor: 'green',
    borderBottomRightRadius: 7,
  },

  btnDanger: {
    backgroundColor: 'red',
    borderBottomLeftRadius: 7,
  },

  btnText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500'
  },

  modalText: {
    fontSize: 16,
    marginBottom: 20
  }
});

export default AppModal;
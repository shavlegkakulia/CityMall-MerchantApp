import React, { useEffect, useState } from 'react';
import {ScrollView, StatusBar,StyleSheet,Text,View, TouchableOpacity} from 'react-native';
import { getUniqueId, getManufacturer, getDevice, getDeviceName } from 'react-native-device-info';
import AppInput from './Components/AppInput/AppInput';





 const App = () => {
  
  const [ deviceId, setDeviceId ] = useState('');
  const [ cardBarcode, setCardBarCode ] = useState('');
  const [ amount, setAmount ] = useState('');

  useEffect(() => {
    setDeviceId(getUniqueId())
  }, [])
  
 
  
   return (
    <View style = {{flex: 1}}>
      <Text> device unique id: {deviceId}</Text>
      <AppInput label = 'ბარათი' value = {cardBarcode} onChangeText = {(newVal: string) => setCardBarCode(newVal)}/>
      
      <AppInput label = 'თანხა' value = {amount} keyboardType = 'numeric' onChangeText = {(newVal: string) => setAmount(newVal)}/>
      {/* <TouchableOpacity style={styles.sectionContainer}>
        <Text>დაგროვება/დახარჯვა</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sectionContainer}>
        <Text>დღის დახურვა</Text>
      </TouchableOpacity> */}
     

    </View>
   );
 };

 const styles = StyleSheet.create({
   sectionContainer: {
     borderWidth: 1,
     borderColor: 'black',
     borderRadius: 7,
     width: 300,
     alignSelf: 'center',
     display: 'flex',
     alignItems: 'center',
     justifyContent: 'center',
     height: 40,
     paddingHorizontal: 24,
   },
 
 });

 export default App;

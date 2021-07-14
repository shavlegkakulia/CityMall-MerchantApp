import React, { useEffect, useState } from 'react';
import {ScrollView, StatusBar,StyleSheet,Text,View,} from 'react-native';
import { getUniqueId, getManufacturer, getDevice, getDeviceName } from 'react-native-device-info';





 const App = () => {
  
  const [ deviceId, setDeviceId ] = useState('')

  useEffect(() => {
    setDeviceId(getUniqueId())
    tt();
  }, [])
  
  const tt = () => {
    getDeviceName().then(deviceName => {
      console.log('getdevice ===============>' , deviceName)
    })
  }
  
   return (
    <View>
      <Text> device unique id: {deviceId}</Text>
    </View>
   );
 };

 const styles = StyleSheet.create({
   sectionContainer: {
     marginTop: 32,
     paddingHorizontal: 24,
   },
   sectionTitle: {
     fontSize: 24,
     fontWeight: '600',
   },
   sectionDescription: {
     marginTop: 8,
     fontSize: 18,
     fontWeight: '400',
   },
   highlight: {
     fontWeight: '700',
   },
 });

 export default App;

import React, { useEffect, useState } from 'react';
import {ScrollView, StatusBar,StyleSheet,Text,View, TouchableOpacity} from 'react-native';
import Dashboard from './Screens/Dashboard/Dashboard';


 const App = () => {
   
   return (
    <View style = {{flex: 1}}>
      <Dashboard/>

    </View>
   );
 };



 export default App;

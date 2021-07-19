import React, { useEffect, useState } from 'react';
import { getUniqueId } from 'react-native-device-info';
import AppNavigatior from './navigation/AppNavigation';


const App = () => {
  const [deviceId, setDeviceId] = useState<string>('');

  useEffect(() => {
    setDeviceId(getUniqueId())
  }, [])

  return (
    <AppNavigatior id={deviceId} />
  );
};



export default App;

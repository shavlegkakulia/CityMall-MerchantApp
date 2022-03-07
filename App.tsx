import React, {useEffect} from 'react';
import AppIndex from './AppIndex';
import AuthProvider from './services/ContextService';
import codePush from 'react-native-code-push';

let codePushOptions = {checkFrequency: codePush.CheckFrequency.ON_APP_START};

const App = () => {

  useEffect(() => {
    codePush
    .sync({
      updateDialog: {title: 'update?'},
      installMode: codePush.InstallMode.IMMEDIATE,
    },() => {},e => console.log(e.totalBytes, e.receivedBytes));
  }, []);

  return (
    <AuthProvider>
      <AppIndex />
    </AuthProvider>
  );
};

export default codePush(codePushOptions)(App);

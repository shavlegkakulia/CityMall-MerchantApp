import React, { useEffect, useState, useRef, useCallback, useContext } from 'react';
import { getUniqueId } from 'react-native-device-info';
import AppNavigatior from './navigation/AppNavigation';
import axios from 'axios';
import AuthService, { IInterceptop } from './services/AuthService';
import AuthProvider, {AppContext} from './services/ContextService';



const App = () => {
  const [deviceId, setDeviceId] = useState<string>('');
  const [userToken, setUserToken] = useState<string>("");
  const AxiosInterceptor = useRef<IInterceptop[]>([]);

  const {signOut} = useContext(AppContext)
 

  const RegisterCommonInterceptor = () => {
    let requestInterceptor = axios.interceptors.request.use((config) => {
      return config;
    });

    let responseInterceptor = axios.interceptors.response.use(
      (response: any) => {
        if (!response.config.objectResponse || response.data.expires_in) {
          return Promise.resolve(response)
        };
        return Promise.resolve(response);
      },
    );
    return {
      unsubscribe: () => {
        axios.interceptors.request.eject(requestInterceptor);
        axios.interceptors.response.eject(responseInterceptor);
      }
    };

  }



  const logOut = useCallback(async () => {
    await AuthService.SignOut();
    setUserToken("");
    signOut();
  }, [userToken])
 

  useEffect(() => {
    setDeviceId(getUniqueId())
    console.log(userToken)
  }, []);


  useEffect(() => {
    AuthService.getToken().then(data => {
      setUserToken(data || "");
    })
  }, [userToken])

  useEffect(() => {
    AxiosInterceptor.current = [RegisterCommonInterceptor(), AuthService.registerAuthInterceptor(logOut)];

    return () => {
      AxiosInterceptor.current.forEach(sub => sub.unsubscribe());
    }
  }, [])
  

  return (
    <AuthProvider>
      <AppNavigatior id={deviceId} />
    </AuthProvider>
  );
};

export default App

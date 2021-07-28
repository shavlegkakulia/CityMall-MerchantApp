import React, { useEffect, useState, useRef, useCallback, useContext } from 'react';
import { getUniqueId } from 'react-native-device-info';
import AppNavigatior from './navigation/AppNavigation';
import axios from 'axios';
import AuthService, { IInterceptop } from './services/AuthService';
import AuthContext from './services/ContextService';



const App = () => {
  const [deviceId, setDeviceId] = useState<string>('');
  const [userToken, setUserToken] = useState<string>("");
  const AxiosInterceptor = useRef<IInterceptop[]>([]);

  const {authenticated, setAuthenticated} = useContext(AuthContext);
  const value = { 
    authenticated: userToken? true: false,
    setAuthenticated
  };

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



  const signOut = useCallback(async () => {
    await AuthService.SignOut();
    setUserToken("");
  }, [userToken])
 

  useEffect(() => {
    setDeviceId(getUniqueId())
    console.log(userToken)
  }, []);


  useEffect(() => {
    AuthService.getToken().then(data => {
      setUserToken(data || "");
    })
    console.log('------------------- mounted', userToken)
  }, [userToken])

  useEffect(() => {
    AxiosInterceptor.current = [RegisterCommonInterceptor(), AuthService.registerAuthInterceptor(signOut)];

    return () => {
      AxiosInterceptor.current.forEach(sub => sub.unsubscribe());
    }
  }, [])
  

  return (
    <AuthContext.Provider value={value}>
      <AppNavigatior id={deviceId} />
    </AuthContext.Provider>
  );
};

export default App

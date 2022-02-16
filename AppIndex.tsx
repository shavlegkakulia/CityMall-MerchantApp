import axios from 'axios';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { getUniqueId } from 'react-native-device-info';
import AppNavigatior from './navigation/AppNavigation';
import AuthService, { IInterceptop } from './services/AuthService';
import { AppContext } from './services/ContextService';

const AppIndex = () => {
  const [userToken, setUserToken] = useState<string>("");
  const AxiosInterceptor = useRef<IInterceptop[]>([]);

  const { setIsAuth, merchantName } = useContext(AppContext)

 


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
    setIsAuth(false);
  }, [userToken])


  useEffect(() => {
   
    AuthService.getToken().then(data => {
      setUserToken(data || "");
    });
  }, [userToken]);

  useEffect(() => {
    console.log('Developer <--Avtandil Shaburishvili, 08.04.2021--> ')
    AxiosInterceptor.current = [RegisterCommonInterceptor(), AuthService.registerAuthInterceptor(async() => await logOut())];
    return () => {
      AxiosInterceptor.current.forEach(sub => sub.unsubscribe());
    }
  }, []);

   
  return (
      <AppNavigatior id={merchantName} />
  );
};

export default AppIndex;


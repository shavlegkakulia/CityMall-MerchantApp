import React, { createContext, useState } from "react";


export interface IAuth {
    isAuthenticated: boolean,
    userName: string,
    merchantName: string
    setIsAuth: (value: boolean | null) => void,
    setUsername: (value: string) => void,
    setMerchantname: (value: string) => void,
}

const AuthState: IAuth = {
    isAuthenticated: false,
    userName: '',
    merchantName: '',
    setIsAuth: (value: boolean | null) => { },
    setUsername: (value: string) => { },
    setMerchantname: (value: string) => { },
}


export const AppContext = createContext<IAuth>(AuthState)

const AuthProvider: React.FC = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<any>(AuthState.isAuthenticated);
    const [userName, setUserName] = useState<string>(AuthState.userName)
    const [merchantName, setMerchantName] = useState<string>(AuthState.merchantName);


    const setIsAuth = (value: boolean | null) => {
        setIsAuthenticated(value);
    };

    const setUsername = (value: string) => {
        setUserName(value);
    };

    const setMerchantname = (value: string) => { 
        setMerchantName(value);
    };

    return (
        <AppContext.Provider value={{
            isAuthenticated,
            userName,
            merchantName,
            setMerchantname,
            setIsAuth,
            setUsername
        }}>
            {children}
        </AppContext.Provider>
    );

};

export default AuthProvider;

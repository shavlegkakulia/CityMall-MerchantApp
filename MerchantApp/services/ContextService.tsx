import React, { createContext, useState } from "react";


export interface IAuth {
    isAuthenticated: boolean,
    userName: string,
    setIsAuth: (value: boolean | null) => void,
    setUsername: (value: string) => void,
}

const AuthState: IAuth = {
    isAuthenticated: false,
    userName: '',
    setIsAuth: (value: boolean | null) => { },
    setUsername: (value: string) => { },
}


export const AppContext = createContext<IAuth>(AuthState)

const AuthProvider: React.FC = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<any>(AuthState.isAuthenticated);
    const [userName, setUserName] = useState<string>(AuthState.userName)
    const setIsAuth = (value: boolean | null) => {
        setIsAuthenticated(value);
    }
    const setUsername = (value: string) => {
        setUserName(value);
    }

    return (
        <AppContext.Provider value={{
            isAuthenticated,
            userName,
            setIsAuth,
            setUsername
        }}>
            {children}
        </AppContext.Provider>
    );

};

export default AuthProvider;

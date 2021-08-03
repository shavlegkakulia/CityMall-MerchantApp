import React, { createContext, useState } from "react";


export interface IAuth {
    isAuthenticated: boolean,
    setIsAuth: (value: boolean | null) => void,
}

const AuthState: IAuth = {
    isAuthenticated: false,
    setIsAuth: (value: boolean | null) => { },
}


export const AppContext = createContext<IAuth>(AuthState)

const AuthProvider: React.FC = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<any>(AuthState.isAuthenticated);
    const setIsAuth = (value: boolean | null) => {
        setIsAuthenticated(value);
    }


    return (
        <AppContext.Provider value={{
            isAuthenticated,
            setIsAuth,
        }}>
            {children}
        </AppContext.Provider>
    );

};

export default AuthProvider;

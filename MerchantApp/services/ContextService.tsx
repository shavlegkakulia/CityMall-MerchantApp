import React, { createContext, useState } from "react";


export interface IAuth {
    isAuthenticated: boolean,
    setIsAuth: (value: boolean) => void,
}

const AuthState: IAuth = {
    isAuthenticated: false,
    setIsAuth: (value) => { },
}


export const AppContext = createContext<IAuth>(AuthState)

const AuthProvider: React.FC =({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(AuthState.isAuthenticated);
    const setIsAuth = (value: boolean) => setIsAuthenticated(value);


    console.log('context ----------->', isAuthenticated)
    return (
        <AppContext.Provider value = {{
            isAuthenticated,
            setIsAuth,
        }}>
            {children}
        </AppContext.Provider>
    );

};

export default AuthProvider;

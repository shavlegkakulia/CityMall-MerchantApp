import React, { createContext, useState } from "react";


export interface IAuth {
    isAuthenticated: boolean,
    signIn: () => void,
    signOut: () => void;
}

const AuthState: IAuth = {
    isAuthenticated: false,
    signIn: () => { },
    signOut: () => { },
}


export const AppContext = createContext<IAuth>(AuthState)

const AuthProvider: React.FC =({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(AuthState.isAuthenticated);
    const signIn = () => setIsAuthenticated(true);
    const signOut = () => setIsAuthenticated(false);

    return (
        <AppContext.Provider value = {{
            isAuthenticated,
            signIn,
            signOut
        }}>
            {children}
        </AppContext.Provider>
    );

};

export default AuthProvider;

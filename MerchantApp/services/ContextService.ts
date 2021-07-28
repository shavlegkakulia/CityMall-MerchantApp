import React from "react";

const AuthContext = React.createContext({
    authenticated: false, 
    setAuthenticated: function(val: boolean )  {
        this.authenticated = val
    } 
});

export default AuthContext;




 
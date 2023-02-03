import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }:any) => {

    //set auth user when login
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;

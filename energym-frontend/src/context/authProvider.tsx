import { createContext, PropsWithChildren, useState } from "react";

const AuthContext = createContext({});

interface props {
    children: JSX.Element | JSX.Element[]
}

export const AuthProvider = ({ children }: props) => {

    //set auth user when login
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
import { createContext, useState, ReactNode } from "react";

const AuthContext = createContext({});

interface Props {
  children?: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  //set auth user when login
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

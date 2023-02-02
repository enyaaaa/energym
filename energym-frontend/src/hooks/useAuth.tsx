import { useContext } from "react";
import AuthContext from "../context/authProvider";

//return auth context from auth provider
const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;
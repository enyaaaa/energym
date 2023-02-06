import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../store";

const RequireAuth = () => {
    
    const authuser = useSelector((state: RootState) => state.user);

    return (
        localStorage.getItem('code') == "Q6FfficNa7vfXzHP5LSMB06iu2sJuXh"
            ? <Outlet/>
            : authuser?.token
                ? <Navigate to="/" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />

        /* auth?.token ? <Outlet/> : <Navigate to='/login' state={{ from: location }} replace /> */
    );
}

export default RequireAuth;
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../store";

const RequireAuth = () => {
    
    const authinstructor = useSelector((state: RootState) => state.instructor);

    return (
        localStorage.getItem('code') == "Q6FfficNa7vfXzHP5LSMB06iu2sJuXh"
            ? <Outlet/>
            : authinstructor?.token
                ? <Navigate to="/" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />

        /* auth?.token ? <Outlet/> : <Navigate to='/login' state={{ from: location }} replace /> */
    );
}

export default RequireAuth;
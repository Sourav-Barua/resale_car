import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAdminRoute from "../Hookes/useAdminRoute/useAdminRoute";
import { AuthContext } from "../Pages/AuthProvider/AuthProvider";
import Loader from "../Pages/Loader/Loader";



const AdminRoute = ({ children }) => {
    const { user, loader, logOut } = useContext(AuthContext)
    const [isAdmin, isAdminLoader] = useAdminRoute(user?.email)
    const location = useLocation()

    if (loader || isAdminLoader) {
        return <Loader></Loader>
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to="../../signIn" state={{ from: location }} replace></Navigate>

};

export default AdminRoute;
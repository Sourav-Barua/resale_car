import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useSellerRoute from "../Hookes/useSellerRoute/useSellerRoute";
import { AuthContext } from "../Pages/AuthProvider/AuthProvider";
import Loader from "../Pages/Loader/Loader";


const SellerRoute = ({ children }) => {
    const { user, loader, logOut } = useContext(AuthContext)
    const [isSeller, isSellerLoader] = useSellerRoute(user?.email)
    const location = useLocation()

    if (loader || isSellerLoader) {
        return <Loader></Loader>
    }

    if (user && isSeller) {
        return children;
    }

    return <Navigate to="../../signIn" state={{ from: location }} replace></Navigate>

};

export default SellerRoute;
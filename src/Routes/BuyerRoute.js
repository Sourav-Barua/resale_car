import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useBuyerRoute from "../Hookes/useBuyerRoute/useBuyerRoute";
import { AuthContext } from "../Pages/AuthProvider/AuthProvider";
import Loader from "../Pages/Loader/Loader";



const BuyerRoute = ({ children }) => {
    const { user, loader } = useContext(AuthContext)
    const [isBuyer, isBuyerLoader] = useBuyerRoute(user?.email)
    const location = useLocation()
    console.log(isBuyer)

    if (loader || isBuyerLoader) {
        return <Loader></Loader>
    }

    if (user && isBuyer) {
        return children;
    }

    return <Navigate to="../../signIn" state={{ from: location }} replace></Navigate>

};

export default BuyerRoute;
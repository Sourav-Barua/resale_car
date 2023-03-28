import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Pages/AuthProvider/AuthProvider';
import Loader from '../Pages/Loader/Loader';

const PrivateRoute = ({ children }) => {
    const { user, loader } = useContext(AuthContext)

    const location = useLocation()
    console.log(loader)
    if (loader) {
        return <Loader></Loader>
    }

    if (user) {
        return children;
    }
    return <Navigate to="/signIn" state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;
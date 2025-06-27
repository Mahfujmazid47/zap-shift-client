import React from 'react';
import useAuth from '../Hooks/useAuth';
import Loading from '../Shared/Loading/Loading';
import { Navigate, useLocation } from 'react-router';

const PrivateRoutes = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation();
    // console.log(location)

    if(loading){
        return <Loading />
    }

    else if(!user) {
        return <Navigate state={location.pathname} to='/login'></Navigate>
    }

    return children;
};

export default PrivateRoutes;
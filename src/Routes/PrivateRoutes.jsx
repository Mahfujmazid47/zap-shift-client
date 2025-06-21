import React from 'react';
import useAuth from '../Hooks/useAuth';
import Loading from '../Shared/Loading/Loading';
import { Navigate } from 'react-router';

const PrivateRoutes = ({children}) => {
    const {user, loading} = useAuth();

    if(loading){
        return <Loading />
    }

    else if(!user) {
        <Navigate to='/login'></Navigate>
    }

    return children;
};

export default PrivateRoutes;
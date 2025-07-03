import React from 'react';
import useAuth from '../Hooks/useAuth';
import Loading from '../Shared/Loading/Loading';
import useUserRole from '../Hooks/useUserRole';
import { Navigate } from 'react-router';

const AdminRoutes = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, isRoleLoading } = useUserRole();

    if (loading || isRoleLoading) {
        return <Loading />;
    }

    if (!user || role !== 'admin') {
        return <Navigate to="/forbidden" replace />;
    }

    return children;
};

export default AdminRoutes;

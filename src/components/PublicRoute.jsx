import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';
import PropTypes from 'prop-types';

const PublicRoute = ({ children }) => {
    const { isAuthenticated, profileCompleted } = useAuth();

    // If the user is authenticated and profile is completed, redirect to /home
    if (isAuthenticated && profileCompleted) {
        return <Navigate to="/home" replace />;
    }

    // If the user is not authenticated or the profile is not completed, allow access to the public route
    return children;
};

PublicRoute.propTypes = {
    children: PropTypes.node.isRequired, // The public content (e.g., Login page)
};

export default PublicRoute;

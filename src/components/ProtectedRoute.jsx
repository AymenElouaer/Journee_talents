import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';
import PropTypes from 'prop-types';
import { ProgressEnum } from '../utils/enum.js';

const ProtectedRoute = ({ children, requiredProgress }) => {
    const { isAuthenticated, user } = useAuth();

    // If the user is not authenticated, redirect to the login page
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // If `requiredProgress` is provided, ensure the user has reached the necessary progress
    if (requiredProgress && user?.progress !== requiredProgress) {
        const stepPathMap = {
            [ProgressEnum.STEP_1_SUBSTEP_1]: "/mForm/personal-info",
            [ProgressEnum.STEP_2_SUBSTEP_2]: "/mForm/contact-info",
            [ProgressEnum.STEP_2_SUBSTEP_3]: "/mForm/professional-info",
            [ProgressEnum.STEP_3_SUBSTEP_1]: "/mForm/profile-picture",
            [ProgressEnum.STEP_3_SUBSTEP_2]: "/mForm/voice-recording",
            [ProgressEnum.STEP_3_SUBSTEP_3]: "/home", // Redirect to home when progress is complete
        };

        const redirectPath = stepPathMap[user?.progress] || "/mForm";
        console.log("Redirecting to:", redirectPath);
        return <Navigate to={redirectPath} replace />;
    }

    // If all checks pass, render the children (protected content)
    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired, // The protected content
    requiredProgress: PropTypes.oneOf(Object.values(ProgressEnum)), // Optional: The required progress level
};

export default ProtectedRoute;

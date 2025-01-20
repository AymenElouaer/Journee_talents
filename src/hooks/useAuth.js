import { useSelector } from "react-redux";
import { ProgressEnum } from "../utils/enum.js";

const useAuth = () => {
    // Access token and profile data from Redux state
    const { token, user } = useSelector((state) => state.auth);
    // console.log("Auth Token:", token);
    // console.log("User Data:", user);
    // Check if the user is authenticated by verifying token existence
    const isAuthenticated = !!token;

    return {
        isAuthenticated, // Authentication check based on token
        profileCompleted: user?.progress === ProgressEnum.STEP_3_SUBSTEP_3, // Check progress completion
        user : user || {}, // Return the complete profile
    };
};

export default useAuth;

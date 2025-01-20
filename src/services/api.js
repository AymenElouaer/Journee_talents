import axios from "axios";

// Create the Axios instance
const apiClient = axios.create({
    baseURL: "https://grafana.bsfa-group.com/", // Replace with your backend API URL
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000, // Increase timeout to 10 seconds
});

// Add token to request header only if needed
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); // Retrieve token from localStorage

        // Check if the request URL requires the authorization header
        // Example: if the URL contains 'auth' or any other criteria you define
        if (token && !config.headers.skipAuth) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            console.warn("No token found in localStorage or skipping auth headerr");
        }

        console.log("Request Headers:", config.headers); // Log the headers
        return config;
    },
    (error) => {
        // Handle any errors with the request setup
        console.error("Error in request interceptor:", error);
        return Promise.reject(error);
    }
);

export default apiClient;

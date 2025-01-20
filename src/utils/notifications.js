import { toast } from "react-toastify";

/**
 * Displays a success notification.
 * @param {string} message - The message to display.
 */
export const showSuccess = (message) => {
    toast.success(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
};

/**
 * Displays an error notification.
 * @param {string} message - The message to display.
 */
export const showError = (message) => {
    toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
};

/**
 * Displays a warning notification.
 * @param {string} message - The message to display.
 */
export const showWarning = (message) => {
    toast.warn(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
};

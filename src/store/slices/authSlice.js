import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/api";
import { PURGE } from "redux-persist"; // Import the PURGE action from redux-persist

// Async thunk for normal login
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/auth/sign-in', {
                credential: { // Add the "credential" key to match Postman
                    email: credentials.email,
                    password: credentials.password
                }
            });

            const token =   response.data.data.token.tokenValue;
            const user =   response.data.data;
            console.log("5555555555555 888888", { token, user:user })
            // Store the token in localStorage
            localStorage.setItem("token", token);

            return { token, user:user };


        } catch (error) {
            console.error("Login API error:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    });

export const loginWithGoogle = createAsyncThunk(
    "auth/loginWithGoogle",
    async (_, { rejectWithValue }) => {
        try {
            const popup = window.open(
                "https://grafana.bsfa-group.com/api/auth/google/sign-in",
                "googleOAuth",
                "width=600,height=800"
            );

            if (!popup) {
                throw new Error("Failed to open the popup window.");
            }

            console.log("User data from Google login 1111:", popup);

            // Wrap the event listener logic in a Promise
            const response = await new Promise((resolve, reject) => {
                const handlePopupMessage = (event) => {
                    console.log("Event received:", event);

                    // Ensure the message is coming from the expected source
                    if (
                        event.origin !== "http://localhost:3000" &&
                        event.origin !== "https://grafana.bsfa-group.com"
                    ) {
                        return; // Ignore messages from unknown sources
                    }

                    // Check if the message contains the expected data
                    if (event.data.type === "googleLoginSuccess") {
                        const token =   event.data.data.user.token.tokenValue;
                        const user =   event.data.data.user;

                        popup.close();

                        // Store the token in localStorage
                        localStorage.setItem("token", token);

                        resolve({token: token, user:user });
                    } else {
                        reject(new Error(event.data.data.message));
                    }
                };

                // Add the event listener
                window.addEventListener("message", handlePopupMessage);

                // Timeout to reject the promise if no message is received
                const timeout = setTimeout(() => {
                    window.removeEventListener("message", handlePopupMessage); // Clean up
                    reject(new Error("Popup closed or no message received."));
                }, 30000); // 30 seconds timeout

                // Clean up on popup close
                const interval = setInterval(() => {
                    if (popup.closed) {
                        clearInterval(interval);
                        clearTimeout(timeout);
                        window.removeEventListener("message", handlePopupMessage);
                        reject(new Error("Popup closed before receiving the message."));
                    }
                }, 1000);
            });

            return response; // Return the resolved response from the Promise
        } catch (error) {
            console.log("Error in Google Auth:", error);
            return rejectWithValue(error.message || "Something went wrong");
        }
    }
);


// Async thunk for profile update
export const updateProfileAsync = createAsyncThunk(
    'auth/updateProfile',
    async (profileData, { rejectWithValue, getState }) => {
        try {
            const state = getState();
            const token = state.auth.token || localStorage.getItem('token');

            if (!token) throw new Error("Token missing");

            const response = await axios.patch('/api/auth/update-profile', profileData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message || 'An error occurred');
        }
    }
);
export const sendResetPasswordLink = createAsyncThunk(
    "auth/send-reset-password-email",
    async (emailData, { rejectWithValue, getState }) => {
        try {
            // Perform the update with the existing token
            const response = await axios.post(
                "/api/auth/send-reset-password-email",
                emailData
            );
            return response.data;
        } catch (error) {
            console.error("Sending Reset Password failed update error:", error);
            return rejectWithValue(
                error.response?.data || error.message || "An error occurred"
            );
        }
    }
);
export const callResetPassword = createAsyncThunk(
    "auth/reset-password",
    async (resetData, { rejectWithValue, getState }) => {
        try {
            console.log("resetdata", resetData);
            const response = await axios.post("/api/auth/reset-password", resetData);
            console.log("Reseting password:", response);

            return response.data;
        } catch (error) {
            console.error("Reset Password failed error:", error);

            // Check for network or request issues
            if (error.response) {
                // Server responded with an error (e.g., 400, 500)
                return rejectWithValue(
                    error.response.data || error.message || "An error occurred"
                );
            } else if (error.request) {
                // No response from the server
                return rejectWithValue("Network error: No response received");
            } else {
                // Error in setting up the request
                return rejectWithValue(`Request Error: ${error.message}`);
            }
        }
    }
);

// Async thunk for resending verification email
export const resendVerificationEmail = createAsyncThunk(
    "auth/resendVerificationEmail",
    async (emailData, { rejectWithValue, getState }) => {
        try {
            const state = getState();
            const token = state.auth.token || localStorage.getItem("token");

            if (!token) throw new Error("Token is missing");

            const response = await axios.post(
                "/api/auth/resend-verification-email",
                emailData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            return response.data; // Assuming the API response has the required data
        } catch (error) {
            console.error("Resend Verification Email Error:", error);
            return rejectWithValue(
                error.response?.data || error.message || "An error occurred"
            );
        }
    }
);

// Async thunk for verifying email
export const verifyEmail = createAsyncThunk(
    "auth/verifyEmail",
    async (verificationData, { rejectWithValue, getState }) => {
        try {
            // Retrieve the token from Redux state or localStorage
            const token = getState().auth.token || localStorage.getItem("token");

            if (!token) {
                throw new Error("Authorization token is required");
            }

            // Add the token to the request headers and send the verification data
            const response = await axios.post(
                "/api/auth/verify-email",
                { verificationCode: verificationData.verificationCode }, // Ensure proper structure
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include token in request headers
                    },
                }
            );

            return response.data; // Assuming the API response has the required data
        } catch (error) {
            console.error("Verify Email Failed:", error.response?.data);
            return rejectWithValue(
                error.response?.data || error.message || "An error occurred"
            );
        }
    }
);


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        // profile: null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            // state.profile = null;
            localStorage.removeItem('token'); // Clear token from localStorage
        },
        setProfile: (state, action) => {
            state.user = action.payload.user || null;
            state.token = action.payload.token || null;
            // state.profile = action.payload.profile || null;
            // No need to manually store the profile and token in localStorage
            // Redux Persist will handle it automatically
        },
    },

    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.profile = action.payload.profile;

                // Save token to localStorage for persistence across sessions
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error?.message || 'Login failed. Please try again.';
            })
            .addCase(loginWithGoogle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginWithGoogle.fulfilled, (state, action) => {
                console.log("fulfilled payload", action.payload);
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.error = null;
                localStorage.setItem("token", action.payload.token); // save token
            })
            .addCase(loginWithGoogle.rejected, (state, action) => {
                console.log("error payload", action.payload);
                state.loading = false;
                state.error = action.payload || action.error?.message || 'Login failed. Please try again.';
            })
            .addCase(updateProfileAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProfileAsync.fulfilled, (state, action) => {
                console.log("Updated profile payload:", action.payload);

                // Extract the user data from the payload
                const { data } = action.payload;
                const { user } = data;  // Extract user object from data

                // Update profile in Redux state
                state.profile = user;

                // Manually update profile and token in localStorage to persist the changes
                localStorage.setItem('profile', JSON.stringify(user));  // Persist updated profile
                if (action.payload.token) {
                    localStorage.setItem('token', action.payload.token);  // Persist updated token
                    state.token = action.payload.token;  // Update Redux token state
                }

                // Optionally, merge other user data (if needed) to the user state in Redux
                state.user = { ...state.user, ...user };

                // Set loading state to false after successful update
                state.loading = false;

                // Ensure that the app persists the login state across page refresh
                // No logout action here, so the user stays logged in
            })

            .addCase(updateProfileAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(sendResetPasswordLink.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendResetPasswordLink.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.payload = action.payload;
            })
            .addCase(sendResetPasswordLink.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.payload = action.payload;

            })
            .addCase(callResetPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(callResetPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                // Also update the token if it changes or if you need to refresh it
                state.payload = action.payload;
            })
            .addCase(callResetPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            // Resend Verification Email
            .addCase(resendVerificationEmail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(resendVerificationEmail.fulfilled, (state, action) => {
                state.loading = false;
                console.log("Resend Verification Email Success:", action.payload);
            })
            .addCase(resendVerificationEmail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
                console.error("Resend Verification Email Failed:", action.payload);
            })

            // Verify Email
            .addCase(verifyEmail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyEmail.fulfilled, (state, action) => {
                state.loading = false;
                console.log("Verify Email Success:", action.payload);
            })
            .addCase(verifyEmail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
                console.error("Verify Email Failed:", action.payload);
            });

    }
});

export const { logout, setProfile, clearPersistedAuth } = authSlice.actions;

// Redux action to handle clearing both Redux state and persisted state
export const handleLogout = () => (dispatch) => {
    dispatch(logout()); // Clear the Redux state
    dispatch({ type: PURGE, key: "auth", result: () => null }); // Clear the persisted auth state
};

export default authSlice.reducer;

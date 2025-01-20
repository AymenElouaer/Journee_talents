import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/api";

// Async thunk for registration
export const register = createAsyncThunk(
    "auth/register",
    async (user, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/auth/sign-up", {
                user: {
                    email: user.email,
                    password: user.password,
                    nom: user.nom,
                    prenom: user.prenom,
                    captchaToken: user.captchaToken,
                    acceptedTerms: user.acceptedTerms,
                },
            });
            console.log('Register successful:', response.data);
            const token = response.data.data.token.tokenValue;

            console.log("token saved to local storage", token);

            // Save token to local storage
            localStorage.setItem('token', token);
            // Return the response data
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || error.message || "An error occurred"
            );
        }
    }
);

// Async thunk for Google sign-up
export const registerWithGoogle = createAsyncThunk(
    "auth/signupWithGoogle",
    async ({ captchaToken, acceptedTerms }, { rejectWithValue }) => {
        try {
            const popup = window.open(
                `https://grafana.bsfa-group.com/api/auth/google/sign-up?captchaToken=${captchaToken}&acceptedTerms=${acceptedTerms}`,
                "googleOAuth",
                "width=600,height=800"
            );

            if (!popup) {
                throw new Error("Failed to open the popup window.");
            }

            return new Promise((resolve, reject) => {
                const handlePopupMessage = (event) => {
                    if (
                        event.origin !== "https://jenkins.bsfa-group.com/" &&
                        event.origin !== "https://grafana.bsfa-group.com/"
                    ) {
                        return;
                    }
                    if (event.data.type === "googleLoginSuccess") {
                        const { token, user } = event.data.data;
                        popup.close();
                        window.removeEventListener("message", handlePopupMessage);
                        localStorage.setItem("token", token);
                        resolve({ token, user });
                    } else if (event.data.type === "googleLoginError") {
                        const errorMessage = event.data.data.message;
                        popup.close();
                        window.removeEventListener("message", handlePopupMessage);
                        reject(new Error(errorMessage));
                    }
                };

                window.addEventListener("message", handlePopupMessage);

                const timeout = setTimeout(() => {
                    window.removeEventListener("message", handlePopupMessage);
                    reject(new Error("Popup closed before receiving the message."));
                }, 120000);

                const interval = setInterval(() => {
                    if (popup.closed) {
                        clearInterval(interval);
                        clearTimeout(timeout);
                        reject(new Error("Popup closed by user."));
                    }
                }, 500);
            });
        } catch (error) {
            return rejectWithValue(
                error.response ? error.response.data : error.message
            );
        }
    }
);

const initialState = {
    user: null,
    token: null,
    loading: false,
    error: null,
    successMessage: null,
};

const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearSuccessMessage: (state) => {
            state.successMessage = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.data.token.tokenValue;
                state.successMessage =
                    action.payload.message || "Registration successful!";
                state.profile = action.payload.profile;

                // Save token to localStorage for persistence across sessions
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload || "Registration failed. Please try again.";
            })
            .addCase(registerWithGoogle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerWithGoogle.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(registerWithGoogle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Registration failed. Please try again.";
            });
    },
});

export const { clearError, clearSuccessMessage } = registerSlice.actions;
export default registerSlice.reducer;

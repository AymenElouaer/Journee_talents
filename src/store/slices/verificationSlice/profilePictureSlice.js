import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../../services/api'; // Import the apiClient

const initialState = {
    isUploading: false,
    uploadedUrl: null,
    uploadError: null,
    photoDeProfile: "", // Add photoDeProfile to the initial state
    progress: "STEP_3_SUBSTEP_1", // Set initial progress state
};

// Thunk for uploading pictures
export const uploadPicture = createAsyncThunk(
    'uploadPicture/uploadFile',
    async (fileOrUrl, { rejectWithValue, getState }) => {
        try {
            if (typeof fileOrUrl === 'string') {
                // If it's a URL, return it directly
                return fileOrUrl;
            }

            const formData = new FormData();
            formData.append('file', fileOrUrl);

            const state = getState();
            const token = state.auth.token; // Get the token from the auth state

            const response = await apiClient.post('/api/upload/uploadFile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}` // Include the token in the headers
                },
            });

            console.log("Full upload response:", response); // Debugging
            const url = response.data.data?.file?.fileUrl; // Adjust this line based on the actual response structure
            console.log("Upload response URL:", url); // Debugging
            return url; // Assuming the response contains a `fileUrl` field with the uploaded file's URL
        } catch (error) {
            console.error("Upload error:", error); // Debugging
            return rejectWithValue(error.response?.data || 'Upload failed');
        }
    }
);

// Async action to update profile data
export const completeProfile = createAsyncThunk(
    "uploadPicture/completeProfile",
    async (user, { rejectWithValue, getState }) => {
        try {
            const state = getState();
            const token = state.auth.token; // Get the token from the auth state

            const response = await apiClient.put("/api/auth/complete-profile", {
                user: {
                    progress: user.progress,
                    photoDeProfile: user.photoDeProfile, // Include photoDeProfile
                }
            }, {
                headers: {
                    'Authorization': `Bearer ${token}` // Include the token in the headers
                }
            });

            return response.data;
        } catch (error) {
            // Handling more detailed error information
            const errorMessage = error.response?.data || "An unexpected error occurred";
            const errorCode = error.response?.status || "UNKNOWN_ERROR";
            return rejectWithValue({ message: errorMessage, code: errorCode });
        }
    }
);

const profilePictureSlice = createSlice({
    name: 'uploadPicture',
    initialState,
    reducers: {
        resetUploadState: (state) => {
            state.uploadedUrl = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadPicture.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(uploadPicture.fulfilled, (state, action) => {
                state.uploadedUrl = action.payload;
                state.loading = false;
            })
            .addCase(uploadPicture.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(completeProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(completeProfile.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(completeProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetUploadState } = profilePictureSlice.actions;

export default profilePictureSlice.reducer;
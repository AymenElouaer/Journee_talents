import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../services/api'; // Import your api.js instance

const initialState = {
    isUploading: false,
    uploadedRectoUrl: null,
    uploadedVersoUrl: null,
    uploadedPassportUrl: null,
    uploadError: null,
    progress: "STEP_3_SUBSTEP_2", // Set initial progress state
    cinRecto: "", // Add cinRecto to the initial state
    cinVerso: "", // Add cinVerso to the initial state
    passportImage: "", // Add passportImage to the initial state
};

// Thunk for uploading pictures
export const uploadPicture = createAsyncThunk(
    'identityOrPassportPhoto/uploadFile',
    async (file, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.post('/api/upload/uploadFile', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
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
    "identityOrPassportPhoto/completeProfile",
    async (user, { rejectWithValue }) => {
        try {
            const response = await axios.put("/api/auth/complete-profile", {
                user: {
                    progress: user.progress,
                    cinRecto: user.cinRecto,
                    cinVerso: user.cinVerso,
                    passportImage: user.passportImage,
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

const identityOrPassportPhotoSlice = createSlice({
    name: 'identityOrPassportPhoto',
    initialState,
    reducers: {
        updateRectoUrl: (state, action) => {
            state.uploadedRectoUrl = action.payload;
            state.cinRecto = action.payload; // Update cinRecto
        },
        updateVersoUrl: (state, action) => {
            state.uploadedVersoUrl = action.payload;
            state.cinVerso = action.payload; // Update cinVerso
        },
        updatePassportUrl: (state, action) => {
            state.uploadedPassportUrl = action.payload;
            state.passportImage = action.payload; // Update passportImage
        },
        resetState: () => initialState, // Add resetState action
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadPicture.pending, (state) => {
                state.isUploading = true;
                state.uploadError = null;
                console.log("Upload pending"); // Debugging
            })
            .addCase(uploadPicture.fulfilled, (state, action) => {
                state.isUploading = false;
                console.log("Upload fulfilled, URL:", action.payload); // Debugging
            })
            .addCase(uploadPicture.rejected, (state, action) => {
                state.isUploading = false;
                state.uploadError = action.payload;
                console.error("Upload rejected, error:", action.payload); // Debugging
            })
            .addCase(completeProfile.pending, (state) => {
                state.isUploading = true;
                state.uploadError = null;
                console.log("Profile update pending"); // Debugging
            })
            .addCase(completeProfile.fulfilled, (state, action) => {
                state.isUploading = false;
                console.log("Profile update fulfilled"); // Debugging
            })
            .addCase(completeProfile.rejected, (state, action) => {
                state.isUploading = false;
                state.uploadError = action.payload;
                console.error("Profile update rejected, error:", action.payload); // Debugging
            });
    },
});

export const { updateRectoUrl, updateVersoUrl, updatePassportUrl, resetState } = identityOrPassportPhotoSlice.actions;
export default identityOrPassportPhotoSlice.reducer;
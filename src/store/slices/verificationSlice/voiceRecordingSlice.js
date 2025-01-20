import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../services/api'; // Import your api.js instance

const initialState = {
    isUploading: false,
    uploadedUrl: null,
    uploadError: null,
    vocal: "", // Add vocal to the initial state
    progress: "STEP_3_SUBSTEP_3", // Set initial progress state
};

// Thunk for uploading voice recordings
export const uploadVoiceRecording = createAsyncThunk(
    'voiceRecording/uploadFile',
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
    "voiceRecording/completeProfile",
    async (user, { rejectWithValue }) => {
        try {
            const response = await axios.put("/api/auth/complete-profile", {
                user: {
                    progress: user.progress,
                    vocal: user.vocal, // Include vocal
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

const voiceRecordingSlice = createSlice({
    name: 'voiceRecording',
    initialState,
    reducers: {
        updateVoiceRecording: (state, action) => {
            state.uploadedUrl = action.payload;
        },
        resetUploadState: (state) => {
            state.uploadedUrl = null;
            state.uploadError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadVoiceRecording.pending, (state) => {
                state.isUploading = true;
                state.uploadError = null;
                state.uploadedUrl = null;
                console.log("Upload pending"); // Debugging
            })
            .addCase(uploadVoiceRecording.fulfilled, (state, action) => {
                state.isUploading = false;
                state.uploadedUrl = action.payload;
                console.log("Upload fulfilled, URL:", action.payload); // Debugging
            })
            .addCase(uploadVoiceRecording.rejected, (state, action) => {
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
                state.vocal = action.payload.vocal;
                console.log("Profile update fulfilled, vocal:", action.payload.vocal); // Debugging
            })
            .addCase(completeProfile.rejected, (state, action) => {
                state.isUploading = false;
                state.uploadError = action.payload;
                console.error("Profile update rejected, error:", action.payload); // Debugging
            });
    },
});

export const { updateVoiceRecording, resetUploadState } = voiceRecordingSlice.actions;
export default voiceRecordingSlice.reducer;
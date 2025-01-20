import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../../services/api'


const initialState = {
    progress: "STEP_2_SUBSTEP_2",
    address: "",
    codePostal: "",
    pays: "",
    numeroTel: "",
    pieceIdentite: "",
    secondEmail: ""
};


export const completeProfile = createAsyncThunk(
    "contactInfo/completeProfile",
    async (user, { rejectWithValue }) => {
        try {
            const response = await axios.put("/api/auth/complete-profile", {
                user: {
                    progress: user.progress,
                    address: user.address,
                    codePostal: user.codePostal,
                    pays: user.pays,
                    numeroTel: user.numeroTel,
                    pieceIdentite: user.pieceIdentite,
                    secondEmail: user.secondEmail
                },
            });

            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data || "An unexpected error occurred";
            const errorCode = error.response?.status || "UNKNOWN_ERROR";
            return rejectWithValue({ message: errorMessage, code: errorCode });
        }
    }
);

const contactInfoSlice = createSlice({
    name: "contactInfo",
    initialState,
    reducers: {
        updateContactField: (state, action) => {
            const { field, value } = action.payload;
            state[field] = value;
        },
        updateSelectPays: (state, action) => {
            state.pays = action.payload;  // Here we are specifically updating the "pays" field with a string (country code or name)
        },
        resetContactInfo: () => initialState,
        loadState: (state, action) => {
            return { ...state, ...action.payload };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(completeProfile.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(completeProfile.fulfilled, (state) => {
                state.status = "succeeded";
                state.error = null;
            })
            .addCase(completeProfile.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export const { updateContactField, updateSelectPays, loadState } = contactInfoSlice.actions;
export default contactInfoSlice.reducer;
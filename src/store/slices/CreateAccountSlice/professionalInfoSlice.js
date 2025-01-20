import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from '../../../services/api'

const initialState = {
    progress: "STEP_2_SUBSTEP_3",
    fonction: '',
    dernierePosteOccupe: '',
    langueDeProcedure: '',
    interessesPar: ''
}

export const completeProfile = createAsyncThunk(
    "professionalInfo/completeProfile",
    async (user, { rejectWithValue }) => {
        try {
            const response = await axios.put("/api/auth/complete-profile", {
                user: {
                    progress: user.progress,
                    fonction: user.fonction,
                    dernierePosteOccupe: user.dernierePosteOccupe,
                    langueDeProcedure: user.langueDeProcedure,
                    interessesPar: user.interessesPar
                }
            })
            return response.data
        } catch (error) {

            const errorMessage = error.response?.data || "An unexpected error occurred";
            const errorCode = error.response?.status || "UNKNOWN_ERROR";
            return rejectWithValue({ message: errorMessage, code: errorCode });
        }
    }
)
const professionalInfoSlice = createSlice({
    name: 'personalInfo',
    initialState,
    reducers: {
        updateField: (state, action) => {
            const { field, value } = action.payload;
            state[field] = value;
        },
        resetProfessionalInfo: () => initialState,
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
            .addCase(completeProfile.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.error = null;
            })
            .addCase(completeProfile.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export const { updateField, loadState } = professionalInfoSlice.actions;

export default professionalInfoSlice.reducer;
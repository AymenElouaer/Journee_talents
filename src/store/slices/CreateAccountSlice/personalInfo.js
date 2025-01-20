import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../services/api";

const initialState = {
    progress: "STEP_2_SUBSTEP_1",
    nom: "",
    prenom: "",
    dateDeNaissance: "",
    lieuDeNaissance: "",
    sexe: "",
    nationalite: "",
};


// Async action to update profile data
export const completeProfile = createAsyncThunk(
    "personalInfo/completeProfile",
    async (user, { rejectWithValue }) => {
        try {
            const response = await axios.put("/api/auth/complete-profile", {
                user: {
                    progress: user.progress,
                    nom: user.nom,
                    prenom: user.prenom,
                    dateDeNaissance: user.dateDeNaissance,
                    lieuDeNaissance: user.lieuDeNaissance,
                    sexe: user.sexe,
                    nationalite: user.nationalite

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

const personalInfoSlice = createSlice({
    name: "personalInfo",
    initialState,
    reducers: {
        progress: (state, action) => {
            state.progress = action.payload
            saveStateToLocalStorage(state)
        },
        updateNom: (state, action) => {
            state.nom = action.payload;
        },
        updatePrenom: (state, action) => {
            state.prenom = action.payload;
        },
        updateDateDeNaissance: (state, action) => {
            state.dateDeNaissance = action.payload;
        },
        updateLieuDeNaissance: (state, action) => {
            state.lieuDeNaissance = action.payload;
        },
        updateSexe: (state, action) => {
            const validValues = ["H", "F"];
            if (validValues.includes(action.payload)) {
                state.sexe = action.payload;
            }
        },
        updateNationalite: (state, action) => {
            state.nationalite = action.payload; // Expecting an array
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(completeProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(completeProfile.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(completeProfile.rejected, (state, action) => {
                state.loading = false;
                // Store both error message and code
                state.error = action.payload.message;
            });
    },
});

export const {
    updateNom,
    updatePrenom,
    updateDateDeNaissance,
    updateLieuDeNaissance,
    updateSexe,
    updateNationalite,
    progress,
} = personalInfoSlice.actions;

export default personalInfoSlice.reducer;

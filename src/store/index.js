import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slices/authSlice";
import registerReducer from "./slices/registerSlice";
import personalInfoReducer from "./slices/CreateAccountSlice/personalInfo";
import contactInfoReducer from "./slices/CreateAccountSlice/contactInfoSlice";
import professionalInfoReducer from "./slices/CreateAccountSlice/professionalInfoSlice";
import uploadPictureReducer from "./slices/verificationSlice/profilePictureSlice";
import identityOrPassportPhotoReducer from "./slices/verificationSlice/IdentityOrPassportPhotoSlice";
import voiceRecordingReducer from "./slices/verificationSlice/voiceRecordingSlice";

// Updated persist configuration for the `auth` slice
const persistConfig = {
    key: "auth",
    storage,
    whitelist: ["token", "profile", "user"], // Ensuring that the necessary keys are persisted
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
    reducer: {
        auth: persistedAuthReducer, // Persisted auth reducer
        register: registerReducer,
        personalInfo: personalInfoReducer,
        contactInfo: contactInfoReducer,
        professionalInfo: professionalInfoReducer,
        uploadPicture: uploadPictureReducer,
        identityOrPassportPhoto: identityOrPassportPhotoReducer,
        voiceRecording: voiceRecordingReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable serializability check for persisted state
        }),
});

const persistor = persistStore(store);

export { store, persistor };

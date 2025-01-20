import React, { useState, useEffect } from 'react';
import './ProfilePicture.css';
import '../Verification.css';
import UploadPhoto from '../UploadPhoto/UploadPhoto';
import Profile1 from '../../../../images/Profile1.jpg';
import Profile2 from '../../../../images/Profile2.jpg';
import Profile3 from '../../../../images/Profile3.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPicture, completeProfile, resetUploadState } from '../../../../store/slices/verificationSlice/profilePictureSlice';
import PropTypes from 'prop-types';

const ProfilePicture = ({ handleSave, handleNext, isLastStep }) => {
    const dispatch = useDispatch();
    const { uploadedUrl } = useSelector((state) => state.uploadPicture);
    const [errorMessage, setErrorMessage] = useState('');

    const profile = useSelector((state) => state.auth.profile);

    useEffect(() => {
        console.log("uploadedUrl state updated:", uploadedUrl);
    }, [uploadedUrl]);

    // Load initial profile picture from profile
    useEffect(() => {
        if (profile && profile.photoDeProfile) {
            console.log("Initial profile picture URL:", profile.photoDeProfile);
            dispatch(uploadPicture(profile.photoDeProfile));
        }
    }, [dispatch, profile]);

    const handleFileSelect = async (file) => {
        console.log("Selected file:", file.name);
        const result = await dispatch(uploadPicture(file));
        console.log("Payload sent:", file);
        console.log("Thunk result:", result);
    };

    const handleCapturePhoto = () => {
        console.log("Capture photo clicked");
    };

    const handleSaveClick = async () => {
        console.log("handleSaveClick called");
        if (uploadedUrl) {
            console.log("Saving uploadedUrl:", uploadedUrl);
            await dispatch(completeProfile({ progress: "STEP_3_SUBSTEP_1", photoDeProfile: uploadedUrl }));
            handleSave();
        } else {
            setErrorMessage('Veuillez importer ou prendre une photo.');
        }
    };

    const handleNextClick = async () => {
        console.log("handleNextClick called");
        if (uploadedUrl) {
            console.log("Next with uploadedUrl:", uploadedUrl);
           const  step31Result =  await dispatch(completeProfile({ progress: "STEP_3_SUBSTEP_1", photoDeProfile: uploadedUrl }));
            console.log("STEP_3_SUBSTEP_1 results: step31Result", step31Result);
            handleNext();
        } else {
            setErrorMessage('Veuillez importer ou prendre une photo.');
        }
    };

    return (
        <div className='verification-container'>
            <div className="verification-section verification-left-section">
                <div>
                    <div className="photo-instructions">
                        <div className='text-first'>Normes relative de prendre les photos</div>
                        <div className="instruction-item">
                            <div className='text-second'>Taille de la photo</div>
                            <img
                                src={Profile1}
                                alt="1"
                                className="instruction-image1"
                            />
                            <div className='size-limit-size'>La taille de la photo ne doit pas dépasser 5 Mo.</div>
                        </div>
                        <div className="instruction-item">
                            <div className='text-second'>Format de la photo</div>
                            <img
                                src={Profile2}
                                alt="2"
                                className="instruction-image"
                            />
                        </div>
                        <div className="instruction-item">
                            <div className='text-second'>Qualité de la photo</div>
                            <img
                                src={Profile3}
                                alt="3"
                                className="instruction-image"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='verification-divider'></div>
            <div className='verification-section verification-right-section margin-upload'>
                <UploadPhoto
                    onFileSelect={handleFileSelect}
                    onCapturePhoto={handleCapturePhoto}
                    uploadedUrl={uploadedUrl} // Pass the uploadedUrl prop
                />
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <div className="button-container2">
                    <button
                        className="verification-button1 save-button1"
                        onClick={handleSaveClick}
                    >
                        Sauvegarder
                    </button>
                    <button
                        className="verification-button1 next-button1"
                        onClick={handleNextClick}
                    >
                        {isLastStep ? 'Créer' : 'Suivant →'}
                    </button>
                </div>
            </div>
        </div>
    );
};

ProfilePicture.propTypes = {
    handleSave: PropTypes.func,
    handleNext: PropTypes.func,
    isLastStep: PropTypes.bool,
};

export default ProfilePicture;
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Verification.css';
import idPhoto1 from '../../../images/f1.png';
import idPhoto2 from '../../../images/f2.png';
import passportPhoto from '../../../images/passportImg.png';
import UploadPhoto from './UploadPhoto/UploadPhoto';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPicture, completeProfile, updateRectoUrl, updateVersoUrl, updatePassportUrl, resetState } from '../../../store/slices/verificationSlice/IdentityOrPassportPhotoSlice';

const IdentityOrPassportPhoto = ({ handleSave, handleNext, isLastStep }) => {
    const dispatch = useDispatch();
    const { uploadedRectoUrl, uploadedVersoUrl, uploadedPassportUrl } = useSelector((state) => state.identityOrPassportPhoto);
    const [selectedOption, setSelectedOption] = useState('piece'); // Default option is 'pièce d'identité'
    const [errorMessage, setErrorMessage] = useState('');
    const [isOptionLocked, setIsOptionLocked] = useState(false); // State to lock the option

    const profile = useSelector((state) => state.auth.profile);
    // Load initial identity or passport photos from profile
    useEffect(() => {
        if (profile) {
            if (profile.cinRecto) {
                console.log("Initial CIN Recto URL:", profile.cinRecto);
                dispatch(updateRectoUrl(profile.cinRecto));
            }
            if (profile.cinVerso) {
                console.log("Initial CIN Verso URL:", profile.cinVerso);
                dispatch(updateVersoUrl(profile.cinVerso));
            }
            if (profile.passportImage) {
                console.log("Initial Passport Image URL:", profile.passportImage);
                dispatch(updatePassportUrl(profile.passportImage));
            }
        }
    }, [dispatch, profile]);
    const handleOptionChange = (event) => {
        if (isOptionLocked) return; // Prevent changing option if locked

        setSelectedOption(event.target.value);
        setErrorMessage(''); // Clear error message when option changes

        // Clear uploaded images when switching options
        if (event.target.value === 'piece') {
            dispatch(updatePassportUrl(null));
        } else {
            dispatch(updateRectoUrl(null));
            dispatch(updateVersoUrl(null));
        }
    };

    const handleFileSelect = async (file, type) => {
        console.log("Selected file:", file.name);
        const result = await dispatch(uploadPicture(file));
        console.log("Payload sent:", file);
        console.log("Thunk result:", result);

        if (result.payload) {
            if (type === 'recto') {
                dispatch(updateRectoUrl(result.payload));
            } else if (type === 'verso') {
                dispatch(updateVersoUrl(result.payload));
            } else if (type === 'passport') {
                dispatch(updatePassportUrl(result.payload));
            }
        }
    };

    const handleSaveClick = async () => {
        console.log("handleSaveClick called");
        if (selectedOption === 'piece' && uploadedRectoUrl && uploadedVersoUrl) {
            await dispatch(completeProfile({ progress: "STEP_3_SUBSTEP_2", cinRecto: uploadedRectoUrl, cinVerso: uploadedVersoUrl }));
            setIsOptionLocked(true); // Lock the option
            handleSave();
        } else if (selectedOption === 'passport' && uploadedPassportUrl) {
            await dispatch(completeProfile({ progress: "STEP_3_SUBSTEP_2", passportImage: uploadedPassportUrl }));
            setIsOptionLocked(true); // Lock the option
            handleSave();
        } else {
            setErrorMessage('Veuillez importer les photos requises.');
        }
    };

    const handleNextClick = async () => {
        console.log("handleNextClick called");
        if (selectedOption === 'piece' && uploadedRectoUrl && uploadedVersoUrl) {
            await dispatch(completeProfile({ progress: "STEP_3_SUBSTEP_2", cinRecto: uploadedRectoUrl, cinVerso: uploadedVersoUrl }));
            dispatch(resetState()); // Reset the state
            handleNext();
        } else if (selectedOption === 'passport' && uploadedPassportUrl) {
            await dispatch(completeProfile({ progress: "STEP_3_SUBSTEP_2", passportImage: uploadedPassportUrl }));
            dispatch(resetState()); // Reset the state
            handleNext();
        } else {
            setErrorMessage('Veuillez importer les photos requises.');
        }
    };

    return (
        <div className="verification-container">
            <div className="verification-section verification-left-section">
                <div className="text-first">Normes relative de prendre les photos</div>
                <div className="text-second">Photo d'identité</div>
                <div className="idImage-container">
                    <img src={idPhoto1} alt="id_photo" className="id-image" />
                    <img src={idPhoto2} alt="id_photo" className="id-image" />
                </div>
                <div className="text-third">Photo de passeport</div>
                <div className="idImage-container">
                    <img src={passportPhoto} alt="passport_photo" className="passport-image" />
                </div>
            </div>
            <div className="verification-divider"></div>
            <div className="verification-section verification-right-section">
                <div className="radio-group1">
                    <label className="radio-label1">
                        <input
                            type="radio"
                            value="piece"
                            checked={selectedOption === 'piece'}
                            onChange={handleOptionChange}
                            className="radio-input1"
                            disabled={isOptionLocked && selectedOption !== 'piece'} // Disable if locked and not selected
                        />
                        Pièce d'identité
                    </label>
                    <label className="radio-label1">
                        <input
                            type="radio"
                            value="passport"
                            checked={selectedOption === 'passport'}
                            onChange={handleOptionChange}
                            className="radio-input1"
                            disabled={isOptionLocked && selectedOption !== 'passport'} // Disable if locked and not selected
                        />
                        Passport
                    </label>
                </div>

                <div className="image-container">
                    {selectedOption === 'piece' ? (
                        <>
                            <div className="upload-title">
                                Recto <span>*</span>
                            </div>
                            <UploadPhoto title="Recto" onFileSelect={(file) => handleFileSelect(file, 'recto')} uploadedUrl={uploadedRectoUrl} />
                            <div className="upload-title">
                                Verso <span>*</span>
                            </div>
                            <UploadPhoto title="Verso" onFileSelect={(file) => handleFileSelect(file, 'verso')} uploadedUrl={uploadedVersoUrl} />
                        </>
                    ) : (
                        <UploadPhoto label="Passport" width="255px" height="250px" onFileSelect={(file) => handleFileSelect(file, 'passport')} uploadedUrl={uploadedPassportUrl} />
                    )}
                </div>

                {errorMessage && <p className="error-message">{errorMessage}</p>}

                {/* Buttons Section */}
                <div className="button-container1">
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

IdentityOrPassportPhoto.propTypes = {
    handleSave: PropTypes.func,
    handleNext: PropTypes.func,
    isLastStep: PropTypes.bool,
};

export default IdentityOrPassportPhoto;
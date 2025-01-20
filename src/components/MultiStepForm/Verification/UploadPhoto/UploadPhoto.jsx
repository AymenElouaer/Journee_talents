import React, { useState, useEffect } from 'react';
import './UploadPhoto.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import UploadIcon from '../../../../images/UploadIcon.png';

const UploadPhoto = ({ width = '200px', height = '200px', onFileSelect, uploadedUrl }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [fileName, setFileName] = useState('');
    const fileInputRef = React.createRef();

    useEffect(() => {
        console.log("uploadedUrl state updated:", uploadedUrl);
    }, [uploadedUrl]);

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size <= 5242880) {
            setFileName(file.name); // Set the file name
            setErrorMessage('');
            onFileSelect(file); // Call the onFileSelect prop
        } else {
            setFileName(''); // Clear file name if error
            setErrorMessage('La taille de la photo doit être inférieure à 5 Mo.');
        }
    };

    const handleTakePhoto = () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => {
                    console.log("Camera is on.");
                })
                .catch(err => {
                    console.error("Error accessing camera:", err);
                });
        } else {
            alert('Camera not supported on this device.');
        }
    };

    return (
        <div className="photo-upload-box" style={{ width, height }}>
            <div className="upload-area" onClick={handleUploadClick} style={{ backgroundImage: uploadedUrl ? `url(${uploadedUrl})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                {!uploadedUrl && <img src={UploadIcon} alt="Upload Icon" className="default-upload-icon" />}
                <input
                    type="file"
                    ref={fileInputRef}
                    className="file-input"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                {fileName && <p className="file-name"></p>}
            </div>

            <button className="upload-button" onClick={handleTakePhoto}>
                <FontAwesomeIcon icon={faCamera} className="take-photo-icon" />
                <span className="take-photo-text">Prendre une photo</span>
            </button>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
};

export default UploadPhoto;
import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player/lazy";
import vocalpic from "../../../../images/vocalpic.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faRedo, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { uploadVoiceRecording, completeProfile, resetUploadState } from '../../../../store/slices/verificationSlice/voiceRecordingSlice';
import "./VoiceRecording.css";
import "../Verification.css";

const VoiceRecording = ({ handleSave, handleNext, isLastStep }) => {
  const dispatch = useDispatch();
  const { uploadedUrl } = useSelector((state) => state.voiceRecording);
  const [errorMessage, setErrorMessage] = useState("");
  const [fileName, setFileName] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const navigate = useNavigate();

  // Retrieve data from localStorage
  const nom = localStorage.getItem('nom') || 'nom';
  const prenom = localStorage.getItem('prenom');
  const sexe = localStorage.getItem('sexe');
  const pays = localStorage.getItem('pays') || 'pays';

  // Determine gender and article
  const gender = sexe === 'H' ? 'homme' : sexe === 'F' ? 'femme' : 'sexe';
  const article = sexe === 'H' ? 'un' : sexe === 'F' ? 'une' : '';

  const fileInputRef = useRef();
  const audioRef = useRef();
  const mediaRecorderRef = useRef();

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('audio/')) {
      setFileName(file.name);
      const result = await dispatch(uploadVoiceRecording(file));
      if (result.payload) {
        setAudioUrl(result.payload);
      } else {
        setErrorMessage('Erreur lors du téléchargement du fichier.');
      }
    } else {
      setErrorMessage('Veuillez importer un fichier audio valide.');
    }
  };

  const handleStartRecording = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      setFileName("");
      setAudioUrl(null);
      navigator.mediaDevices.getUserMedia({ audio: true })
          .then((stream) => {
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            setIsRecording(true);
            setAudioUrl(null);

            const chunks = [];
            mediaRecorder.ondataavailable = (event) => chunks.push(event.data);

            mediaRecorder.onstop = () => {
              const blob = new Blob(chunks, { type: "audio/wav" });
              const url = URL.createObjectURL(blob);
              setAudioUrl(url);
              setIsRecording(false);
            };

            mediaRecorder.start();

            setTimeout(() => {
              if (mediaRecorder.state === "recording") {
                handleStopRecording();
              }
            }, 170000);
          })
          .catch(() => setErrorMessage("Erreur d'accès au microphone."));
    } else {
      alert("Le microphone n'est pas pris en charge sur cet appareil.");
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
    }
    setIsRecording(false);
  };

  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  const handleSaveClick = async () => {
    if (audioUrl) {
      const blob = await fetch(audioUrl).then(r => r.blob());
      const file = new File([blob], 'audio.wav', { type: 'audio/wav' });
      if (file.type.startsWith('audio/')) {
        const result = await dispatch(uploadVoiceRecording(file));
        if (result.payload) {
          await dispatch(completeProfile({ progress: "STEP_3_SUBSTEP_3", vocal: result.payload }));
          handleSave();
        } else {
          setErrorMessage('Erreur lors de l\'enregistrement du fichier.');
        }
      } else {
        setErrorMessage('Le fichier enregistré n\'est pas un fichier audio valide.');
      }
    } else {
      setErrorMessage('Veuillez enregistrer ou importer un fichier audio.');
    }
  };

  const handleNextClick = async () => {
    if (audioUrl) {
      const blob = await fetch(audioUrl).then(r => r.blob());
      const file = new File([blob], 'audio.wav', { type: 'audio/wav' });
      if (file.type.startsWith('audio/')) {
        const result = await dispatch(uploadVoiceRecording(file));
        if (result.payload) {
          await dispatch(completeProfile({ progress: "STEP_3_SUBSTEP_3", vocal: result.payload }));
          dispatch(resetUploadState()); // Reset the upload state
          handleNext();
        } else {
          setErrorMessage('Erreur lors de l\'enregistrement du fichier.');
        }
      } else {
        setErrorMessage('Le fichier enregistré n\'est pas un fichier audio valide.');
      }
    } else {
      setErrorMessage('Veuillez enregistrer ou importer un fichier audio.');
    }

    handleNextStep()
  };

  const handleNextStep = () => {
    if (isLastStep) {
      navigate("/"); // Navigate to home when it’s the last step
    } else {
      handleNext(); // Call the parent’s `handleNext` method for other steps
    }
  };

  return (
      <div className='verification-container'>
        <div className="verification-section verification-left-section">
          <div className="vr-text">
            <div>1. Choisissez un endroit calme.</div>
            <div>2. Bien positionner le micro.</div>
            <div>3. Lisez le paragraphe que vous voyez, de manière claire et à un rythme constant.</div>
          </div>
          <img src={vocalpic} alt="Verification Instructions" className="vocalpic-container" />
          <div className="record-instruction-text">
            <div>Appuyez sur le microphone pour démarrer ou terminer l'enregistrement.</div>
            <div>Appuyez sur play pour écouter.</div>
            <div>Appuyez sur pause pour mettre l'enregistrement en pause.</div>
            <div>Appuyez sur Répéter pour répéter l'enregistrement</div>
          </div>
        </div>
        <div className='verification-divider'></div>
        <div className='verification-section verification-right-section'>
          <div className="voice-recording-title">
            <div className="">Enregistrez Vocale</div>
          </div>
          <div className="voice-recording-text">
            <div>Bonjour, je suis {nom} {prenom}</div>
            <div>Je suis {article} {gender} qui réside à {pays}.</div>
            <div>Je souhaite participer aux Journées Talents.</div>
            <div>En créant mon compte, j'ai accepté et approuvé les Conditions</div>
            <div>de l'utilisation et le protocole de confidentialité de Journée Talents.</div>
          </div>

          <div className="voice-recording-container">
            <FontAwesomeIcon
                className={`audio-control-icon ${isRecording ? "recording" : ""}`}
                icon={faMicrophone}
                onClick={isRecording ? handleStopRecording : handleStartRecording}
            />

            <div className="react-player-wrapper">
              {audioUrl ? (
                  <>
                    <ReactPlayer
                        url={audioUrl}
                        ref={audioRef}
                        playing={isPlaying}
                        controls
                        width="100%" // Ensures ReactPlayer takes full width of its container
                        height="100%" // Ensure ReactPlayer height is 100% of the parent div
                    />
                    {isRecording && (
                        <div className="placeholder">Enregistrement en cours...</div> // Display when recording
                    )}
                  </>
              ) : (
                  <div className="placeholder">
                    Cliquez sur le microphone pour commencer à enregistrer.
                  </div>
              )}
            </div>

            <FontAwesomeIcon
                className={`audio-control-icon ${!audioUrl ? "disabled" : ""}`}
                icon={faRedo}
                onClick={() => {
                  setAudioUrl(null); // Reset the audioUrl to delete the recorded audio
                  setFileName("");   // Clear the file name if necessary
                }}
            />
          </div>
          {/* Upload audio file feature */}
          <label className="audio-upload-label">
            <div className="audio-upload-container">
              <div className="audio-upload-icon">🎵</div>
              <div className="audio-upload-text">
                Importer audio
              </div>
              <input
                  type="file"
                  id="audio-upload-input"
                  className="audio-upload-input"
                  accept="audio/*"
                  onChange={handleFileUpload}
              />
            </div>
          </label>
          <div>
          </div>

          <div className="button-container3">
            <button
                className="verification-button1 save-button1"
                onClick={handleSaveClick}
            >
              Sauvegarder
            </button>
            <button
                className={`verification-button1 next-button1 ${isLastStep ? 'blue-bg' : ''}`}
                onClick={handleNextClick}
            >
              {isLastStep ? 'Créer' : 'Suivant →'}
            </button>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>
  );
};

export default VoiceRecording;
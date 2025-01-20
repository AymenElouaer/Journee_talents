import { useState, useEffect } from 'react';
import { nationalities} from "./nationalities.js";
import {
  updateNom, updatePrenom, updateDateDeNaissance,
  updateLieuDeNaissance, updateSexe,
  updateNationalite, completeProfile,
} from '../../../store/slices/CreateAccountSlice/personalInfo';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Box, Button } from '@mui/material';
import {buttonStyles} from '../styles'
import  './CreateAccount.css'
import {toast} from "react-toastify";
import Select from "react-select";

const PersonalInfo = ({ onNext, onSave }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  // Access the redux state
  const personalInfo = useSelector((state) => state.personalInfo);
  const user = useSelector((state) => state.auth.user);

  const [selectedCountries, setSelectedCountries] = useState(personalInfo.nationalite || []);

  useEffect(() => {
    setSelectedCountries(personalInfo.nationalite || []);  // Ensure sync with Redux state
  }, [personalInfo.nationalite]);

  // Synchronize `localStorage` with Redux state
  useEffect(() => {
    localStorage.setItem('nom', user.nom || '');
    localStorage.setItem('prenom', user.prenom || '');
  }, [user]);

  // Load initial values from profile and localStorage
  useEffect(() => {
    const storedNom = localStorage.getItem('nom');
    const storedPrenom = localStorage.getItem('prenom');

    if (storedNom) {
      dispatch(updateNom(storedNom));
    }
    if (storedPrenom) {
      dispatch(updatePrenom(storedPrenom));
    }
  });


  const validateInfoForm = () => {
    const newErrors = {};

    // Access Redux state values for validation
    const { nom, prenom, dateDeNaissance, lieuDeNaissance, sexe } = personalInfo;

    // Debugging - log personalInfo and check if values are available
    console.log("Validating personalInfo:", personalInfo);

    if (!nom) newErrors.nom = "Le champ 'Nom' est requis.";
    if (!prenom) newErrors.prenom = "Le champ 'Prénom' est requis.";
    if (!dateDeNaissance) newErrors.dateDeNaissance = "Le champ 'Date de naissance' est requis.";
    if (!lieuDeNaissance) newErrors.lieuDeNaissance = "Le champ 'Lieu de naissance' est requis.";
    if (!sexe) newErrors.sexe = "Veuillez sélectionner votre sexe.";
    if (selectedCountries.length === 0) newErrors.nationalite = "Veuillez sélectionner au moins une nationalité.";

    // toast.error('Tous les champs sont obligatoires', );
    // console.log("Validation errors:", newErrors);  // Log all errors for debugging

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;

  };


  const handleSave = async (e) => {
    e.preventDefault();
    console.log("handleSave is called");

    if (!validateInfoForm()) {
      console.log('Validation failed, cannot proceed to save.');
      return;
    }

    // Proceed to save and dispatch
    try {
      const payload = {
       progress: personalInfo.progress,
        nom: personalInfo.nom,
        prenom: personalInfo.prenom,
        dateDeNaissance: personalInfo.dateDeNaissance,
        lieuDeNaissance: personalInfo.lieuDeNaissance,
        sexe: personalInfo.sexe,
        //nationalite: selectedCountries.map((country) => country), // Ensure we send the selected country values
        nationalite: selectedCountries // Send the selected country values
      };

      console.log("personalInfo payload is being sent:", payload);

      const result = await dispatch(completeProfile(payload));
      console.log("Thunk result:", result);

      if (onSave) onSave(result);
    } catch (error) {
      console.error('Error saving personal info:', error);
    }
  };
  // Save updated nom and prenom to localStorage
  useEffect(() => {
    localStorage.setItem('usernom', personalInfo.nom || '');
    localStorage.setItem('userprenom', personalInfo.prenom || '');
    console.log('Saved usernom:', localStorage.getItem('usernom'));
    console.log('Saved userprenom:', localStorage.getItem('userprenom'));
  }, [personalInfo.nom, personalInfo.prenom]);


  const handleSaveAndNext = async (e) => {
    e.preventDefault();
    console.log("handleSaveAndNext is called");

    if (!validateInfoForm()) {
      console.log('Validation failed, cannot proceed to save or next step.');
      return;
    }

    // Proceed to save and dispatch
    try {
      const payload = {
        progress: personalInfo.progress,
        nom: personalInfo.nom,
        prenom: personalInfo.prenom,
        dateDeNaissance: personalInfo.dateDeNaissance,
        lieuDeNaissance: personalInfo.lieuDeNaissance,
        sexe: personalInfo.sexe,
        nationalite: selectedCountries, // Send the selected country values
      };

      console.log("personalInfo payload is being sent:", payload);

      const result = await dispatch(completeProfile(payload));
      console.log("Thunk result:", result);

      if (onSave) onSave(result);
      if (onNext) onNext(result);
    } catch (error) {
      console.error('Error saving personal info:', error);

      // Check if backend returned a specific error message
      const errorMessage =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Une erreur inattendue est survenue"; // Default message if no backend message is available

      // Show the error in a toast notification
      toast.error(errorMessage);
    }
  };


  return (
      <div className="personal-info-container">
        <form className="personal-info-form" onSubmit={handleSaveAndNext}>
          {/* Form Row for Nom and Prenom */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">Nom</label>
              <input
                  type="text"
                  id="nom"
                  className={'form-control input-field'}
                  placeholder=""
                  value={personalInfo.nom || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    dispatch(updateNom(value));
                    localStorage.setItem('registerNom', value); // Synchronize with localStorage
                  }}

              />
              {errors.nom && <div className="invalid-feedback">{errors.nom}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Prénom</label>
              <input
                  type="text"
                  id="prenom"
                  className={`form-control input-field`}
                  placeholder=""
                  value={personalInfo.prenom || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    dispatch(updatePrenom(value));
                    localStorage.setItem('registerPrenom', value); // Synchronize with localStorage
                  }}
              />
              {errors.prenom && <div className="invalid-feedback">{errors.prenom}</div>}
            </div>
          </div>

          {/* Form Row for Date de naissance and Lieu de naissance */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dob">Date de naissance</label>
              <input
                  type="date"
                  id="dob"
                  className="form-control input-field input-date"
                  value={personalInfo.dateDeNaissance || ""}
                  onChange={(e) => dispatch(updateDateDeNaissance(e.target.value))}
              />
              {errors.dateDeNaissance && <div className="invalid-feedback">{errors.dateDeNaissance}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="birthPlace">Lieu de naissance</label>
              <input
                  type="text"
                  id="birthPlace"
                  className="form-control input-field input-location"
                  placeholder=""
                  value={personalInfo.lieuDeNaissance || ""}
                  onChange={(e) => dispatch(updateLieuDeNaissance(e.target.value))}
              />
              {errors.lieuDeNaissance && <div className="invalid-feedback">{errors.lieuDeNaissance}</div>}
            </div>
          </div>

          {/* Flex Row for Sexe and Nationalité */}
          <div className="form-row">
            <div className="radio-group">
              <label htmlFor="sexe" className="radio-label">
                Sexe
              </label>
              <div className="radio-buttons">
                <input
                    type="radio"
                    id="male"
                    name="sex"
                    value="H"
                    checked={personalInfo.sexe === 'H'}
                    onChange={(e) => dispatch(updateSexe(e.target.value))}
                />
                <label htmlFor="male">Homme</label>

                <input
                    type="radio"
                    id="female"
                    name="sex"
                    value="F"
                    checked={personalInfo.sexe === 'F'}
                    onChange={(e) => dispatch(updateSexe(e.target.value))}
                />
                <label htmlFor="female">Femme</label>
              </div>
              {errors.sexe && <div className="invalid-feedback">{errors.sexe}</div>}
            </div>
            <div className="form-group select-group nationality">
              <label htmlFor="nationality">
                Nationalité
              </label>
              <Select
                  value={selectedCountries}
                  onChange={(selectedOption) => {
                    setSelectedCountries(selectedOption);
                    dispatch(updateNationalite(selectedOption));
                  }}
                  options={nationalities}
                  isMulti={true}
              />
              {errors.nationalite && <div className="invalid-feedback">{errors.nationalite}</div>}
            </div>
          </div>

          {/* Save and Next Buttons */}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
                type="button"
                className="btn-primary"
                onClick={handleSave}
                sx={buttonStyles.primaryButton}
            >
              Sauvegarder
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button
                type="submit"
                className="btn-primary"
                sx={buttonStyles.primaryButton}
            >
              Suivant
            </Button>
          </Box>
        </form>
      </div>
  );
};

PersonalInfo.propTypes = {
  onNext: PropTypes.func,
  onSave: PropTypes.func,
};

export default PersonalInfo;
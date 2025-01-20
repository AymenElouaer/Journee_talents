import { useState, useEffect } from "react";
import CountrySelector from "./CountrySelector";
import { useDispatch, useSelector } from "react-redux";
import { completeProfile, updateContactField, updateSelectPays } from "../../../store/slices/CreateAccountSlice/contactInfoSlice";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import './CreateAccount.css';
import PropTypes from 'prop-types';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import {buttonStyles} from '../styles'
import { Box, Button } from '@mui/material';

const ContactInfo = ({ onNextStep, onBackStep }) => {
  const dispatch = useDispatch();
  const contactInfo = useSelector((state) => state.contactInfo);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.auth.user);

  // Save pays to local storage
  useEffect(() => {
    if (contactInfo.pays){
      localStorage.setItem('pays', JSON.stringify(contactInfo.pays.label));
    }
  }, [contactInfo]);

  // Save secondEmail and phoneNumber to localStorage
  useEffect(() => {
    localStorage.setItem('secondEmail', contactInfo.secondEmail || '');
    localStorage.setItem('phoneNumber', contactInfo.numeroTel || '');
    console.log('Saved secondEmail:', localStorage.getItem('secondEmail'));
    console.log('Saved phoneNumber:', localStorage.getItem('phoneNumber'));
  }, [contactInfo.secondEmail, contactInfo.numeroTel]);

  // Load initial values from profile
  useEffect(() => {
    if (user) {
      dispatch(updateContactField({ field: 'address', value: user.address }));
      dispatch(updateContactField({ field: 'codePostal', value: user.codePostal }));
      dispatch(updateSelectPays(user.pays));
      dispatch(updateContactField({ field: 'numeroTel', value: user.numeroTel }));
      dispatch(updateContactField({ field: 'pieceIdentite', value: user.pieceIdentite }));
      dispatch(updateContactField({ field: 'secondEmail', value: user.secondEmail }));
    }
  }, [dispatch, user]);

  const validateContactForm = () => {
    const newErrors = {};

    if (!contactInfo.address) newErrors.address = "Le champ 'Adresse' est requis.";
    if (!contactInfo.codePostal) newErrors.codePostal = "Le champ 'Code Postal' est requis.";
    if (!contactInfo.pays) newErrors.pays = "Le champ 'Pays de résidence' est requis.";
    if (!contactInfo.numeroTel || !parsePhoneNumberFromString(contactInfo.numeroTel)?.isValid()) newErrors.numeroTel = "Le champ 'Numéro de téléphone' est requis et doit être valide.";
    if (!contactInfo.secondEmail) newErrors.secondEmail = "Le champ 'E-mail' est requis.";
    if (!contactInfo.pieceIdentite) newErrors.pieceIdentite = "Le champ 'Pièce d'identité / Passeport' est requis.";

    console.log("Validation errors:", newErrors); // Debugging validation

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveAndNext = async (e) => {
    e.preventDefault();
    console.log("handleSaveAndNext is called");

    if (!validateContactForm()) {
      console.log('Validation failed, cannot proceed to save or next step.');
      return;
    }

    const payload = {
      progress: contactInfo.progress,
      address: contactInfo.address,
      codePostal: contactInfo.codePostal,
      pays: contactInfo.pays,
      numeroTel: contactInfo.numeroTel,
      pieceIdentite: contactInfo.pieceIdentite,
      secondEmail: contactInfo.secondEmail
    };
    console.log("Payload being sent:", payload);

    try {
      const result = await dispatch(completeProfile(payload));
      console.log("Thunk result:", result);

      onNextStep(result); // Move to the next step
    } catch (error) {
      console.error("Failed to complete profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="personal-info-container">
        <form className="personal-info-form" onSubmit={handleSaveAndNext}>
          {/* Form Row for Address and Postal Code */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="address">Adresse</label>
              <input
                  type="text"
                  id="address"
                  className="form-control input-field"
                  placeholder=""
                  value={contactInfo.address}
                  onChange={(e) => dispatch(updateContactField({ field: 'address', value: e.target.value }))}
              />
              {errors.address && <div className="invalid-feedback">{errors.address}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="postalCode">Code Postal</label>
              <input
                  type="text"
                  id="postalCode"
                  className="form-control input-field"
                  placeholder=""
                  value={contactInfo.codePostal}
                  onChange={(e) => dispatch(updateContactField({ field: "codePostal", value: e.target.value }))}
              />
              {errors.codePostal && <div className="invalid-feedback">{errors.codePostal}</div>}
            </div>
          </div>

          {/* Form Row for Country and Phone Number */}
          <div className="form-row">
            <div className="form-group select-group nationality">
              <label htmlFor="residenceCountry">Pays de résidence</label>
              <CountrySelector
                  isMulti={false}
                  value={contactInfo.pays}
                  onChange={(selectedOption) => dispatch(updateSelectPays(selectedOption))}
              />
              {errors.pays && <div className="invalid-feedback">{errors.pays}</div>}
            </div>
            <div className="form-group react-phone">
              <label htmlFor="phoneNumber">Numéro de téléphone</label>
              <PhoneInput
                  defaultCountry="us"
                  value={contactInfo.numeroTel}
                  onChange={(phone) => dispatch(updateContactField({ field: "numeroTel", value: phone }))}
                  className="react-tel-input form-control"
              />
              {errors.numeroTel && <div className="invalid-feedback">{errors.numeroTel}</div>}
            </div>
          </div>

          {/* Form Row for Email and Identity Document */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                  type="text"
                  id="email"
                  className="form-control input-field"
                  placeholder=""
                  value={contactInfo.secondEmail}
                  onChange={(e) => dispatch(updateContactField({ field: "secondEmail", value: e.target.value }))}
              />
              {errors.secondEmail && <div className="invalid-feedback">{errors.secondEmail}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="identityDocument">Pièce d&apos;identité / Passeport</label>
              <input
                  type="text"
                  id="identityDocument"
                  className="form-control input-field"
                  placeholder=""
                  value={contactInfo.pieceIdentite}
                  onChange={(e) => dispatch(updateContactField({ field: "pieceIdentite", value: e.target.value }))}
              />
              {errors.pieceIdentite && <div className="invalid-feedback">{errors.pieceIdentite}</div>}
            </div>
          </div>

          {/* Back and Next Buttons */}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
                type="button"
                color="inherit"
                onClick={onBackStep}
                sx={{
                  ...buttonStyles.backButton,
                  '@media (max-width: 768px)': {
                    fontSize: '16px',
                    padding: '10px 20px',
                    marginLeft: '10px',
                    marginRight: '10px',
                    width: '170px',
                  },
                }}
            >
              Retour
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button
                type="submit"
                className="btn-primary"
                sx={{
                  ...buttonStyles.primaryButton,
                  '@media (max-width: 768px)': {
                    fontSize: '16px',
                    padding: '10px 20px',
                    marginLeft: '40px',
                    marginRight: '10px',
                    width: '80%',
                  },
                }}
            >
              Suivant
            </Button>
          </Box>
        </form>
      </div>
  );
};

ContactInfo.propTypes = {
  onNextStep: PropTypes.func,
  onBackStep: PropTypes.func,
};

export default ContactInfo;
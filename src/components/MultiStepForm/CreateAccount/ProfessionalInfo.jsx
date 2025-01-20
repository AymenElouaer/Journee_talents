import  { useState, useEffect } from "react";
import './CreateAccount.css';
import { completeProfile, updateField } from "../../../store/slices/CreateAccountSlice/professionalInfoSlice";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';
import { Box, Button } from '@mui/material';
import { buttonStyles } from '../styles';

const ProfessionalInfo = ({ onNextStep, onBackStep }) => {
  const dispatch = useDispatch();
  const professionalInfo = useSelector((state) => state.professionalInfo);
  const [errors, setErrors] = useState({});
  const profile = useSelector((state) => state.auth.profile);


  // Load initial values from profile
  useEffect(() => {
    if (profile) {
      dispatch(updateField({ field: 'fonction', value: profile.fonction }));
      dispatch(updateField({ field: 'dernierePosteOccupe', value: profile.dernierePosteOccupe }));
      dispatch(updateField({ field: 'langueDeProcedure', value: profile.langueDeProcedure }));
      dispatch(updateField({ field: 'interessesPar', value: profile.interessesPar }));
    }
  }, [dispatch, profile]);
  const validateProfessionalForm = () => {
    const newErrors = {};

    if (!professionalInfo.fonction) newErrors.fonction = "Le champ 'Fonction' est requis.";
    if (!professionalInfo.dernierePosteOccupe) newErrors.dernierePosteOccupe = "Le champ 'Dernier poste occupé' est requis.";
    if (!professionalInfo.langueDeProcedure) newErrors.langueDeProcedure = "Le champ 'Langue de procédure' est requis.";
    if (!professionalInfo.interessesPar || professionalInfo.interessesPar.length === 0) newErrors.interessesPar = "Veuillez sélectionner au moins une option.";

    console.log("Validation errors:", newErrors); // Debugging validation

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextAndSave = async (e) => {
    e.preventDefault();
    console.log("handleNextAndSave is called");

    if (!validateProfessionalForm()) {
      console.log('Validation failed, cannot proceed to save or next step.');
      return;
    }

    const payload = {
      progress: professionalInfo.progress,
      fonction: professionalInfo.fonction,
      dernierePosteOccupe: professionalInfo.dernierePosteOccupe,
      langueDeProcedure: professionalInfo.langueDeProcedure,
      interessesPar: professionalInfo.interessesPar
    };
    console.log("Payload being sent:", payload);

    try {
      const result = await dispatch(completeProfile(payload));
      console.log("Thunk result:", result);

      onNextStep(result); // Move to the next step
    } catch (error) {
      console.error("Failed to complete profile:", error);
    }
  };

  return (
      <div className="personal-info-container">
        <form className="personal-info-form" onSubmit={handleNextAndSave}>
          {/* Form Row for Fonction and Dernier Poste Occupé */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fonction">Fonction</label>
              <select
                  id="fonction"
                  className="form-control input-field professional-select"
                  value={professionalInfo.fonction}
                  onChange={(e) => dispatch(updateField({ field: "fonction", value: e.target.value }))}
              >
                <option value="" disabled>
                  - - Sélectionner - -
                </option>
                <option value="developer">Développeur</option>
                <option value="designer">Designer</option>
                <option value="manager">Manager</option>
                <option value="other">Autre</option>
              </select>
              {errors.fonction && <div className="invalid-feedback">{errors.fonction}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="dernierPosteOccupe">Dernier poste occupé</label>
              <input
                  type="text"
                  id="dernierPosteOccupe"
                  className="form-control input-field"
                  placeholder=""
                  value={professionalInfo.dernierePosteOccupe}
                  onChange={(e) =>
                      dispatch(updateField({ field: "dernierePosteOccupe", value: e.target.value }))
                  }
              />
              {errors.dernierePosteOccupe && <div className="invalid-feedback">{errors.dernierePosteOccupe}</div>}
            </div>
          </div>

          {/* Form Row for Langue de Procédure */}
          <div className="form-row">
            <div className="form-group langue-margin">
              <label htmlFor="langueProcedure">Langue de procédure</label>
              <select
                  id="langueProcedure"
                  className="form-control input-field professional-select langue-margin"
                  value={professionalInfo.langueDeProcedure}
                  onChange={(e) =>
                      dispatch(updateField({ field: "langueDeProcedure", value: e.target.value }))
                  }
              >
                <option value="" disabled>
                  - - Sélectionner - -
                </option>
                <option value="french">Français</option>
                <option value="english">Anglais</option>
              </select>
              {errors.langueDeProcedure && <div className="invalid-feedback">{errors.langueDeProcedure}</div>}
            </div>
          </div>

          {/* Form Row for Intéressé par */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="interested">Intéressé par</label>
              <div className="checkbox-container">
                {["bourse", "stage", "travails"].map((value) => (
                    <div key={value} className="checkbox-item">
                      <input
                          type="checkbox"
                          id={value}
                          name="interested"
                          value={value}
                          checked={professionalInfo.interessesPar?.includes(value)}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            const updatedList = checked
                                ? [...(professionalInfo.interessesPar || []), value]
                                : professionalInfo.interessesPar.filter((item) => item !== value);

                            dispatch(updateField({ field: "interessesPar", value: updatedList }));
                          }}
                      />
                      <label htmlFor={value}>
                        {value === "bourse"
                            ? "Bourse d'étude"
                            : value === "stage"
                                ? "Stage à l'étranger"
                                : "Travail à l'étranger"}
                      </label>
                    </div>
                ))}
              </div>
              {errors.interessesPar && <div className="invalid-feedback">{errors.interessesPar}</div>}
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
                    width: '60%',
                  },
                }}
            >
              Continuer
            </Button>
          </Box>
        </form>
      </div>
  );
};

ProfessionalInfo.propTypes = {
  onNextStep: PropTypes.func,
  onBackStep: PropTypes.func,
};

export default ProfessionalInfo;
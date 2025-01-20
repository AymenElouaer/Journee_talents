import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CreateAccountSubStepper from './SubSteppers/CreateAccountSubStepper';
import VerificationSubStepper from './SubSteppers/VerificationSubStepper';
import { stepperStyles, createAccount, innerBoxStyles, outerBoxStyles } from './styles';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ProgressEnum } from "../../utils/enum.js";

const mainSteps = ['S\'inscrire', 'Profil', 'Vérification'];

const MultiStepForm = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const [activeMainStep, setActiveMainStep] = useState(1); // Default to 'Profil'

    // Determine the active main step based on user's progress
    useEffect(() => {
        console.log("user progress",user.progress )
        if (user && user.progress) {
            setActiveMainStep(getMainStepFromProgress(user.progress));
        }
    }, [user]);

    // Redirect user if progress is invalid
    useEffect(() => {
        if (!user || user.progress > ProgressEnum.STEP_3_SUBSTEP_3) {
            navigate(`/mForm/${getProgressPath(user.progress)}`);
        }
    }, [user, navigate]);

    const getMainStepFromProgress = (progress) => {
        if (progress <= ProgressEnum.STEP_2_SUBSTEP_2) return 1; // Profil
        if (progress <= ProgressEnum.STEP_3_SUBSTEP_3) return 2; // Vérification
        return 0; // Default to the first step
    };

    const getProgressPath = (progress) => {
        switch (progress) {
            case ProgressEnum.STEP_1_SUBSTEP_1:
                return 'personal-info';
            case ProgressEnum.STEP_2_SUBSTEP_1:
                return 'contact-info';
            case ProgressEnum.STEP_2_SUBSTEP_2:
                return 'professional-info';
            case ProgressEnum.STEP_3_SUBSTEP_1:
                return 'profile-picture';
            case ProgressEnum.STEP_3_SUBSTEP_2:
                return 'voice-recording';
            case ProgressEnum.STEP_3_SUBSTEP_3:
                return 'identity-or-passport-photo';
            default:
                return 'home';
        }
    };

    const handleNextMainStep = () => {
        setActiveMainStep((prev) => prev + 1);
    };

    const renderMainStepContent = () => {
        switch (activeMainStep) {

            case 1:
                return (
                    <CreateAccountSubStepper onNextMainStep={handleNextMainStep} />
                );
            case 2:
                return (
                    <Box>
                        <Typography sx={createAccount}>
                            Vérification
                        </Typography>
                        <VerificationSubStepper />
                    </Box>
                );
            default:
                return null;
        }
    };

    return (
        <Box
            sx={{
                ...outerBoxStyles,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    ...innerBoxStyles, width: activeMainStep === 2 ? '1180px' : '800px',
                }}
            >
                <Stepper activeStep={activeMainStep} alternativeLabel sx={stepperStyles.mainStepper}>
                    {mainSteps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <Box mt={2}>{renderMainStepContent()}</Box>
            </Box>
        </Box>
    );
};

export default MultiStepForm;

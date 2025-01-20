import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { stepperStyles } from '../styles';
import IdentityOrPassportPhoto from '../Verification/IdentityOrPassportPhoto';
import ProfilePicture from '../Verification/ProfilePicture/ProfilePicture';
import VoiceRecording from '../Verification/VoiceRecording/VoiceRecording';
import {useSelector} from "react-redux";
import {ProgressEnum} from "../../../utils/enum.js";

const step3SubStepperData = [
    'Photo de Profile',
    'Photo de Pièce d\'Identité ou Passeport',
    'Enregistrement Vocal'
];

const VerificationSubStepper = () => {
    const [activeSubStep, setActiveSubStep] = useState(0);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        console.log("user  3333333333333",user.progress )
        if (user && user.progress) {
            setActiveSubStep(getSubStepFromProgress(user.progress));
        }
    }, [user]);

    const getSubStepFromProgress = (progress) => {
        switch (progress) {
            case ProgressEnum.STEP_3_SUBSTEP_1:
                return 1;
            case ProgressEnum.STEP_3_SUBSTEP_2:
                return 2;
            default:
                return 0; // Default to the first sub-step
        }
    };
    // Determine the active sub-step based on the user's progress
    const handleNext = () => {
        if (activeSubStep < step3SubStepperData.length - 1) {
            setActiveSubStep((prev) => prev + 1);
        }
    };

    const handleSave = () => {
        // Implement save logic here (e.g., send data to backend or local storage)
        console.log('Data saved for sub-step:', activeSubStep);
    };

    const renderSubStepContent = () => {
        return (
            <>
                {activeSubStep === 0 && (
                    <ProfilePicture
                        handleSave={handleSave}
                        handleNext={handleNext}
                        isLastStep={false}
                    />
                )}
                {activeSubStep === 1 && (
                    <IdentityOrPassportPhoto
                        handleSave={handleSave}
                        handleNext={handleNext}
                        isLastStep={false}
                    />
                )}
                {activeSubStep === 2 && (
                    <VoiceRecording
                        handleSave={handleSave}
                        handleNext={handleNext}
                        isLastStep={true}
                    />
                )}
            </>
        );
    };

    return (
        <Box>
            <Stepper activeStep={activeSubStep} alternativeLabel sx={{
                ...stepperStyles.subStepper,
                maxWidth: '800px', // Keep the sub-stepper width fixed
                width: '100%',
                display: 'flex',   // Use flexbox for alignment
                justifyContent: 'center', // Center the content
                margin: 'auto', // Center the stepper within the parent container
                marginTop: '70px', // Add margin above the stepper

            }}>
                {step3SubStepperData.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Box mt={2}>{renderSubStepContent()}</Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            </Box>
        </Box>
    );
};

export default VerificationSubStepper;
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { stepperStyles } from '../styles';
import PersonalInfo from '../CreateAccount/PersonalInfo';
import ContactInfo from '../CreateAccount/ContactInfo';
import ProfessionalInfo from '../CreateAccount/ProfessionalInfo';
import { useDispatch, useSelector } from 'react-redux';
import { completeProfile as completePersonalInfo } from '../../../store/slices/CreateAccountSlice/personalInfo';
import { completeProfile as completeContactInfo } from '../../../store/slices/CreateAccountSlice/contactInfoSlice';
import { completeProfile as completeProfessionalInfo } from '../../../store/slices/CreateAccountSlice/professionalInfoSlice';
import { ProgressEnum } from '../../../utils/enum.js';

const subSteps = [
    'Informations Personnelles',
    'Coordonnées',
    'Informations Professionnelles'
];

const CreateAccountSubStepper = ({ onNextMainStep }) => {
    const dispatch = useDispatch();
    const personalInfo = useSelector((state) => state.personalInfo);
    const contactInfo = useSelector((state) => state.contactInfo);
    const professionalInfo = useSelector((state) => state.professionalInfo);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        console.log("user substepers",user.progress )
        if (user && user.progress) {
            setActiveSubStep(getSubStepFromProgress(user.progress));
        }
    }, [user]);

    const getSubStepFromProgress = (progress) => {
        switch (progress) {
            case ProgressEnum.STEP_2_SUBSTEP_1:
                return 1;
            case ProgressEnum.STEP_2_SUBSTEP_2:
                return 2;
            case ProgressEnum.STEP_2_SUBSTEP_3:
                return 2;
            default:
                return 0; // Default to the first sub-step
        }
    };
    // Determine the active sub-step based on the user's progress

    const [activeSubStep, setActiveSubStep] = useState(0);

    const handleNext = () => {
        if (activeSubStep < subSteps.length - 1) {
            setActiveSubStep((prev) => prev + 1);
        } else {
            onNextMainStep();
        }
    };

    const handleBack = () => {
        if (activeSubStep > 0) {
            setActiveSubStep((prev) => prev - 1);
        }
    };

    const handleSave = async () => {
        try {
            if (activeSubStep === 0) {
                console.log('Form data being sent:', personalInfo);
                const result = await dispatch(completePersonalInfo(personalInfo));
                console.log('Profile saved (personalInfo):', result);
            } else if (activeSubStep === 1) {
                console.log('Form data being sent:', contactInfo);
                const result = await dispatch(completeContactInfo(contactInfo));
                console.log('Profile saved (contactInfo):', result);
            } else if (activeSubStep === 2) {
                console.log('Form data being sent:', professionalInfo);
                const result = await dispatch(completeProfessionalInfo(professionalInfo));
                console.log('Profile saved (professionalInfo):', result);
            }
        } catch (error) {
            console.error('Error saving info:', error);
        }
    };

    const renderSubStepContent = () => {
        return (
            <>
                {activeSubStep === 0 && (
                    <PersonalInfo
                        onSave={handleSave}
                        onNext={handleNext}
                        isLastStep={false}
                    />
                )}
                {activeSubStep === 1 && (
                    <ContactInfo
                        onNextStep={handleNext}
                        onBackStep={handleBack}
                        isLastStep={false}
                    />
                )}
                {activeSubStep === 2 && (
                    <ProfessionalInfo
                        onNextStep={handleNext}
                        onBackStep={handleBack}
                    />
                )}
            </>
        );
    };

    return (
        <Box>
            <Stepper
                activeStep={activeSubStep}
                alternativeLabel
                sx={{
                    ...stepperStyles.subStepper,
                    maxWidth: '800px', // Fixed width for the sub-stepper
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    margin: 'auto',
                    marginTop: '70px', // Margin above the stepper
                }}
            >
                {subSteps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Box mt={2}>{renderSubStepContent()}</Box>
        </Box>
    );
};

CreateAccountSubStepper.propTypes = {
    onNextMainStep: PropTypes.func.isRequired,
};

export default CreateAccountSubStepper;

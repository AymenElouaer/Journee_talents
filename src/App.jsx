import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components';
import LoginPage from './components/Login/LoginPage.jsx';
import RegisterPage from './components/Register/Register.jsx';
import TermsAndConditions from "./components/TermsAndConditions/TermsAndConditions.jsx";
import LandingPage from "./pages/LandingPage/Page1/LandingPage.jsx";
import LaunchingPage from "./pages/LandingPage/LaunchingPage/LaunchingPage.jsx";
import HomePage from "./pages/HomePage/Home/Page1/HomePage.jsx";
import DemandsPage from "./pages/Demands/DemandsPage.jsx";
import ConvocationPage from "./pages/Convocation/ConvocationPage.jsx";
import EntretientPage from "./pages/Entretient/EntretientPage.jsx";
import Compte from "./pages/Compte/Compte.jsx";
import ScrollTop from './components/ScrollTop';
import MultiStepForm from './components/MultiStepForm/MultiStepForm.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import PublicRoute from "./components/PublicRoute.jsx";
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import { PersonalInfo, ContactInfo, ProfessionalInfo, ProfilePicture, VoiceRecording, IdentityOrPassportPhoto } from './components';
import { ProgressEnum } from "./utils/enum.js";
import ForgotPassword from "./components/MultiStepForm/ForgetPassword/ForgotPassword.jsx"
import ResetPassword from "./components/MultiStepForm/ForgetPassword/ResetPassword.jsx";
import ResetLinkConfirmation from "./components/MultiStepForm/ForgetPassword/ResetLinkConfirmation.jsx";
import verifyMail from "./components/Login/VerifyMail.jsx";
import VerifyMail from "./components/Login/VerifyMail.jsx";

const App = () => {
    const location = useLocation();

    const noNavbarPaths = ['/', '/home', '/demands', '/entretient', '/convocation', '/compte'];

    return (
        <>
            {/* Conditionally Render Navbar */}
            {!noNavbarPaths.includes(location.pathname) && <Navbar />}

            <ScrollTop />
            <ToastContainer />
            <div className="layout-container">
                <Routes>
                    {/* Public Routes */}
                    <Route path="/register" element={<RegisterPage />} />
                    {/*<Route path="/login" element={<LoginPage />} />*/}
                    <Route path="/conditions" element={<TermsAndConditions />} />
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/launchingpage" element={<LaunchingPage />} />
                    <Route path='forgot-password' element={<ForgotPassword/>}/>
                    <Route path='reset-password' element={<ResetPassword/>}/>
                    <Route path='reset-link-confirmation' element={<ResetLinkConfirmation/>}/>
                    <Route path='verifymail' element={<VerifyMail/>}/>

                    {/* Public Routes */}
                    <Route
                        path="/login"
                        element={
                            <PublicRoute>
                                <LoginPage />
                            </PublicRoute>
                        }
                    />


                    {/* MultiStepForm Protected Routes */}
                    <Route
                        path="/mForm"
                        element={
                            <ProtectedRoute requiredProgress={ProgressEnum.STEP_1_SUBSTEP_1}>
                                <MultiStepForm />
                            </ProtectedRoute>
                        }
                    >
                        {/* Nested Routes */}
                        <Route
                            path="personal-info"
                            element={
                                <ProtectedRoute requiredProgress={ProgressEnum.STEP_1_SUBSTEP_1}>
                                    <PersonalInfo />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="contact-info"
                            element={
                                <ProtectedRoute requiredProgress={ProgressEnum.STEP_2_SUBSTEP_2}>
                                    <ContactInfo />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="professional-info"
                            element={
                                <ProtectedRoute requiredProgress={ProgressEnum.STEP_2_SUBSTEP_3}>
                                    <ProfessionalInfo />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="profile-picture"
                            element={
                                <ProtectedRoute requiredProgress={ProgressEnum.STEP_3_SUBSTEP_1}>
                                    <ProfilePicture />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="voice-recording"
                            element={
                                <ProtectedRoute requiredProgress={ProgressEnum.STEP_3_SUBSTEP_2}>
                                    <VoiceRecording />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="identity-or-passport-photo"
                            element={
                                <ProtectedRoute requiredProgress={ProgressEnum.STEP_3_SUBSTEP_3}>
                                    <IdentityOrPassportPhoto />
                                </ProtectedRoute>
                            }
                        />
                    </Route>


                    {/* Other Protected Routes */}
                    <Route
                        path="/home"
                        element={
                            <ProtectedRoute requiredProgress={ProgressEnum.STEP_3_SUBSTEP_3}>
                                <HomePage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/demands"
                        element={
                            <ProtectedRoute>
                                <DemandsPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/convocation"
                        element={
                            <ProtectedRoute>
                                <ConvocationPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/entretient"
                        element={
                            <ProtectedRoute>
                                <EntretientPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/compte"
                        element={
                            <ProtectedRoute>
                                <Compte />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </div>
        </>
    );
};

export default App;

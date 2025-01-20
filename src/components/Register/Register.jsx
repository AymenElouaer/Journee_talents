import "./Register.css";
import Glogo from "../../images/Glogo.png";
import Recaptcha from "react-google-recaptcha";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import TermsAndConditions from "../TermsAndConditions/TermsAndConditions";
import { register, registerWithGoogle } from "../../store/slices/registerSlice";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {ProgressEnum} from "../../utils/enum.js";
import CryptoJS from "crypto-js";

const Register = () => {
    const [withGoogle, setWithGoogle] = useState(false);
    const [captchaValue, setCaptchaValue] = useState(null);
    const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        confirmEmail: "",
        password: "",
        confirmPassword: "",
        nom: "",
        prenom: "",
        captchaToken: "",
        acceptedTerms: false,
    });
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onCaptchaChange = (value) => {
        setCaptchaValue(value);
        setFormData((prevData) => ({
            ...prevData,
            captchaToken: value,
        }));
    };



    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };
    // Save nom and prenom to localStorage
    useEffect(() => {
        if (formData.nom) {
            localStorage.setItem('registerNom', formData.nom);
            console.log('Saved registerNom:', localStorage.getItem('registerNom'));
        }
    }, [formData.nom]);

    useEffect(() => {
        if (formData.prenom) {
            localStorage.setItem('registerPrenom', formData.prenom);
            console.log('Saved registerPrenom:', localStorage.getItem('registerPrenom'));
        }
    }, [formData.prenom]);

    useEffect(() => {
        if (formData.email) {
            localStorage.setItem('registerEmail', formData.email);
            console.log('Saved registerEmail:', localStorage.getItem('registerEmail'));
        }
    }, [formData.prenom]);

    const validateForm = (validateOnlyCaptcha = false) => {
        const newErrors = {};
        if (!validateOnlyCaptcha) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const passwordRegex =
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

            if (!formData.nom) newErrors.nom = "Nom est requis.";
            if (!formData.prenom) newErrors.prenom = "Prénom est requis.";
            if (!formData.email || !emailRegex.test(formData.email)) {
                newErrors.email = "L'e-mail doit être au format exemple@domaine.com.";
            }
            if (formData.email !== formData.confirmEmail) {
                newErrors.confirmEmail = "Les e-mails ne correspondent pas.";
            }
            if (!formData.password || !passwordRegex.test(formData.password)) {
                newErrors.password =
                    "Le mot de passe doit contenir au moins 8 caractères, incluant une majuscule, une minuscule, un chiffre et un caractère spécial";
            }
            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = "Les mots de passe ne correspondent pas.";
            }
        }

        if (!formData.captchaToken) {
            newErrors.captcha = "CAPTCHA requis.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const handleRegisterClick = async (e) => {
        e.preventDefault();

        // Validate form fields before proceeding
        if (!formData.captchaToken) {
            newErrors.captcha = "CAPTCHA requis.";
        }
        if (!validateForm()) return;

        // Set withGoogle to false for normal registration
        setWithGoogle(false);
        // Open Terms modal after validation
        setIsTermsModalOpen(true);
    };
    const handleRegisterWithGoogleClick = async (e) => {
        e.preventDefault();

        // Validate form fields before proceeding
        if (!validateForm(true)) return;

        // Set `withGoogle` to true for Google signup
        setWithGoogle(true);
        // Open Terms modal after validation
        setIsTermsModalOpen(true);
    };

    const handleAcceptTerms = async () => {
        try {
            // Close Terms modal after validation
            setIsTermsModalOpen(false);

            let resultAction;

            if (withGoogle) {
                const { captchaToken, acceptedTerms } = formData;

                // Call registerWithGoogle with the required arguments
                const result = await dispatch(
                    registerWithGoogle({ captchaToken, acceptedTerms })
                );

                if (result.type === "auth/signupWithGoogle/fulfilled") {
                    const token = result.payload.token;
                    localStorage.setItem('token', token);
                    // Redirect to /verifymail upon successful Google registration
                    toast.success("Inscription réussie ! Redirection...", {
                        autoClose: 1500, // Auto-close after 1.5 seconds
                        onClose: () => navigate("/login"), // Adjust the redirect path as needed
                    });
                    return; // Prevent additional toast handling
                } else {
                    // Show error toast notification with additional error details if available
                    // toast.error(
                    //     "L'email déjà existe"
                    // );
                    navigate("/login")
                    return; // Prevent further execution
                    //later come back and fix this !!important
                }
            } else {
                // Call register for normal email/password registration
                resultAction = await dispatch(
                    register({
                        email: formData.email,
                        password: formData.password,
                        nom: formData.nom,
                        prenom: formData.prenom,
                        captchaToken: captchaValue,
                        acceptedTerms: true,
                    })
                );
            }

            // Handle resultAction for normal registration
            if (resultAction && register.fulfilled.match(resultAction)) {
                console.log('Full response:', resultAction.payload);
                const token = resultAction.payload.data.token.tokenValue;
                console.log('Received token:', token); // Add this for debugging
                localStorage.setItem('token', token);
                toast.success("Inscription réussie ! Redirection en cours...", {
                    autoClose: 1500,
                    onClose: () => navigate("/verifymail"),
                });
            } else if (resultAction && register.rejected.match(resultAction)) {
                // Extract error message from the backend response if available
                const errorMessage = resultAction.payload?.message || "L'email déjà existe, inscription échouée";

                // Show error toast with dynamic backend error message
                toast.error(errorMessage);
            }
        } catch (error) {
            // Show error toast for unexpected errors
            const errorMessage = error?.response?.data?.message || "Une erreur inattendue est survenue";
            toast.error(errorMessage);
        }
    };


    return (
        <div className="register-page">
            <form className="register-form" autoComplete="off">
                <div className="register-text">S'inscrire</div>
                <div className="email-section">
                    <div className="email-text">Inscrivez-vous avec e-mail</div>
                </div>

                <div className="form-rowRegister">
                    <div className="form-group form-margin">
                        <label htmlFor="nom">Nom</label>
                        <input
                            type="text"
                            id="nom"
                            className="form-controlRegister"
                            value={formData.nom}
                            onChange={handleInputChange}
                        />
                        {errors.nom && <div className="error">{errors.nom}</div>}
                    </div>

                    <div className="form-group form-margin">
                        <label htmlFor="prenom">Prénom</label>
                        <input
                            type="text"
                            id="prenom"
                            className="form-controlRegister"
                            value={formData.prenom}
                            onChange={handleInputChange}
                        />
                        {errors.prenom && <div className="error">{errors.prenom}</div>}
                    </div>
                </div>

                <div className="form-rowRegister">
                    <div className="form-group form-margin">
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="email"
                            id="email"
                            className="form-controlRegister"
                            value={formData.email}
                            autoComplete="off"
                            onChange={handleInputChange}
                        />
                        {errors.email && <div className="error">{errors.email}</div>}
                    </div>

                    <div className="form-group form-margin">
                        <label htmlFor="confirmEmail">Confirmer l'e-mail</label>
                        <input
                            type="email"
                            id="confirmEmail"
                            className="form-controlRegister"
                            value={formData.confirmEmail}
                            onChange={handleInputChange}
                        />
                        {errors.confirmEmail && (
                            <div className="error">{errors.confirmEmail}</div>
                        )}
                    </div>
                </div>

                <div className="form-rowRegister">
                    <div className="form-group form-margin">
                        <label htmlFor="password">Mot de passe</label>
                        <div className="password-container">
                            <input
                                type={passwordVisible ? "text" : "password"}
                                id="password"
                                className="form-controlRegister"
                                value={formData.password}
                                autoComplete="off"

                                onChange={handleInputChange}
                            />
                            <FontAwesomeIcon
                                icon={passwordVisible ? faEyeSlash : faEye}
                                className="eye-icon"
                                onClick={togglePasswordVisibility}
                            />
                        </div>
                        {errors.password && <div className="error">{errors.password}</div>}
                    </div>

                    <div className="form-group form-margin">
                        <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                        <div className="password-container">
                            <input
                                type={confirmPasswordVisible ? "text" : "password"}
                                id="confirmPassword"
                                className="form-controlRegister"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                            />
                            <FontAwesomeIcon
                                icon={confirmPasswordVisible ? faEyeSlash : faEye}
                                className="eye-icon"
                                onClick={toggleConfirmPasswordVisibility}
                            />
                        </div>
                        {errors.confirmPassword && (
                            <div className="error">{errors.confirmPassword}</div>
                        )}
                    </div>
                </div>

                <div className="form-rowRegister">
                    <div className="form-group captcha-container">
                        <Recaptcha
                            sitekey="6Lf7eJgqAAAAAOv9k-Sj0O8nZeD771pSwwKW1Zws"
                            onChange={onCaptchaChange}
                            size="normal" // Or "compact" to make it smaller
                            theme="light" // Can be dark or light
                            style={{ transform: 'scale(0.8)', transformOrigin: '0 0' ,marginLeft:'4rem',marginTop:'3rem'}} // Scale down the reCAPTCHA
                        />

                        {errors.captcha && <div className="error">{errors.captcha}</div>}
                    </div>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary form-margin"
                    onClick={handleRegisterClick}
                >
                    S'inscrire
                </button>
                <div className="email-section">
                    <div className="email-text1">Ou avec</div>
                </div>
                <div className="form-group google-button-container">
                    <button
                        type="button"
                        className="btn google-button"
                        onClick={handleRegisterWithGoogleClick}
                    >
                        <img src={Glogo} alt="Google logo" className="google-logo" />
                        Google
                    </button>
                </div>
                <div className="account-prompt">
                    <span className="grey-text">Vous avez déjà un compte ? </span>
                    <a href="/login" className="blue-text">
                        Se connecter
                    </a>
                </div>
            </form>

            {isTermsModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <TermsAndConditions
                            onClose={() => setIsTermsModalOpen(false)}
                            setFormData={setFormData}
                            onAccept={handleAcceptTerms} // Pass the accept logic here
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Register;

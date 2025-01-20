import React, { useState } from "react";
import "./ForgotPassword.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { callResetPassword } from "../../../store/slices/authSlice";
const ResetPassword = () => {
    const dispatch = useDispatch();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const validateFields = () => {
        if (!password || !confirmPassword) {
            setError("Tous les champs sont requis.");
            return false;
        }
        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            return false;
        }
        if (password.length < 6) {
            setError("Le mot de passe doit contenir au moins 6 caractères.");
            return false;
        }
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            setError("L'e-mail doit être au format exemple@domaine.com.");
        }
        return true;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = searchParams.get("token");

        if (!token) {
            setError("Le lien de réinitialisation est invalide ou a expiré.");
            return;
        }

        if (validateFields()) {
            setError("");

            try {
                const result = await dispatch(
                    callResetPassword({ newPassword: password, resetToken: token })
                );
                if (result.error) {
                    console.log("result.payload.error", result.payload);
                    toast.error(result.payload.message || "Error");
                } else {
                    toast.success("Mot de passe modifié avec succès", {
                        autoClose: 1500,
                        onClose: () => navigate("/login"),
                    });
                }
                console.log("Thunk result:", result);

                //  onNextStep(result); // Move to the next step
            } catch (error) {
                console.error("Échec de l'envoi du lien de réinitialisation", error);
                toast.error(result.payload.message);
            }
            // navigate("/reset-link-confirmation");
        }
    };

    return (
        <div className="register-page">
            <form className="fp-form" onSubmit={handleSubmit}>
                <div className="fp-title">Changer mot de passe</div>

                {error && <div className="error-message">{error}</div>}

                <div className="fp-form-row">
                    <div className="form-group fp-margin">
                        <label htmlFor="password">Mot de passe</label>
                        <div className="password-container">
                            <input
                                type={passwordVisible ? "text" : "password"}
                                id="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <FontAwesomeIcon
                                icon={passwordVisible ? faEyeSlash : faEye}
                                className="eye-icon"
                                onClick={togglePasswordVisibility}
                            />
                        </div>
                    </div>
                </div>

                <div className="fp-form-row">
                    <div className="form-group fp-margin">
                        <label htmlFor="confirm-password">Confirmez mot de passe</label>
                        <div className="password-container">
                            <input
                                type={confirmPasswordVisible ? "text" : "password"}
                                id="confirm-password"
                                className="form-control"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <FontAwesomeIcon
                                icon={confirmPasswordVisible ? faEyeSlash : faEye}
                                className="eye-icon"
                                onClick={toggleConfirmPasswordVisibility}
                            />
                        </div>
                    </div>
                </div>

                <button type="submit" className="reset-password-btn">
                    Changer mot de passe
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;

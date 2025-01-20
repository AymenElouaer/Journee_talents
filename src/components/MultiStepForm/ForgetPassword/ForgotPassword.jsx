import React, { useState } from "react";
import "./ForgotPassword.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { sendResetPasswordLink } from "./../../../store/slices/authSlice.js";

const ForgotPassword = ({ onNextStep, onBackStep }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const handleInputChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("L'e-mail doit être au format exemple@domaine.com.");
        } else {
            setError("");
            // Proceed with form submission
            //todo call the API to send email
            try {
                const result = await dispatch(sendResetPasswordLink({ email: email }));
                if (result.error) {
                    console.log("result.payload.error", result.payload);
                    toast.error(result.payload.message || "Error");
                } else {
                    toast.success(
                        "L'email de réinitialisation du mot de passe a été envoyé avec succès.",
                        {
                            autoClose: 1500,
                            onClose: () => navigate("/reset-link-confirmation"),
                        }
                    );
                }
                console.log("Thunk result:", result);

                //  onNextStep(result); // Move to the next step
            } catch (error) {
                console.error("Failed to send reset Link:", error);
                toast.error(result.payload.message);
            } finally {
                setLoading(false);
            }
            console.log("Form submitted with email:", email);
            // navigate("/reset-link-confirmation");
        }
    };

    return (
        <div className="register-page">
            <form className="fp-form" onSubmit={handleSubmit}>
                <div className="fp-title">Mot de passe oublié?</div>
                <div className="fp-text">
                    Entrez votre e-mail et nous vous <br />
                    enverrons un lien pour réinitialiser votre mot <br /> de passe tout de
                    suite
                </div>

                <div className="fp-form-row">
                    <div className="form-group form-margin">
                        <input
                            type="email"
                            id="reset-password"
                            className="form-control"
                            value={email}
                            onChange={handleInputChange}
                        />
                        {error && <div className="error">{error}</div>}
                    </div>
                </div>
                <button type="submit" className="reset-password-btn">
                    Réinitialiser mot de passe
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;

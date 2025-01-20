import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resendVerificationEmail, verifyEmail } from "../../store/slices/authSlice.js";
import "./VerifyMail.css";
import {useNavigate} from "react-router-dom";

const VerifyMail = () => {
    const [verificationCode, setVerificationCode] = useState("");
    const userEmail = useSelector((state) => state.auth.profile?.email); // Adjust based on your state
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useNavigate


    const handleVerify = async () => {
        if (verificationCode.trim()) {
            const codeAsNumber = parseInt(verificationCode, 10); // Convert to number
            if (!isNaN(codeAsNumber)) {
                const result = await dispatch(
                    verifyEmail({ userEmail: userEmail, verificationCode: codeAsNumber })
                );
                if (result.meta.requestStatus === "fulfilled") {
                    // If the verification is successful, navigate to /login
                    navigate("/login");
                } else {
                    alert("Échec de la vérification. Veuillez réessayer.");
                }
            } else {
                alert("Veuillez entrer un code de vérification valide (numérique).");
            }
        } else {
            alert("Veuillez entrer un code de vérification.");
        }
    };


    const handleResend = () => {
        const registerEmail = localStorage.getItem("registerEmail"); // Retrieve email from localStorage
        if (registerEmail) {
            dispatch(resendVerificationEmail({ userEmail: registerEmail }));
            alert("Code de verification est envoyée.");
        } else {
            alert("Email introuvable. Veuillez réessayer.");
        }
    };

    return (
        <div className="fedi1-page">
            <form className="fedi1-form">
                <div className="fedi1-title">Aidez-nous à protéger votre compte</div>
                <div className="fedi1-text">
                    Pour plus de sécurité, vous devrez vérifier votre identité. <br />
                    Nous avons envoyé un code de vérification à votre adresse e-mail.
                </div>

                <div className="fedi1-form-row">
                    <div className="form-group fedi1-margin">
                        <label htmlFor="verification-code" className="fedi1-label">
                            Code de vérification
                        </label>
                        <input
                            type="text"
                            id="verification-code"
                            className="fedi1-input"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                        />
                    </div>
                </div>

                <button
                    type="button"
                    className="fedi1-verify-btn"
                    onClick={handleVerify}
                >
                    Vérifier le code
                </button>
                <button
                    type="button"
                    className="fedi1-resend-btn"
                    onClick={handleResend}
                >
                    Renvoyer le code
                </button>
            </form>
        </div>
    );
};

export default VerifyMail;

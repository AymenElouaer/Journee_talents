import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import "./ResetLinkConfirmation.css"; // Import CSS file

const ResetLinkConfirmation = () => {
    return (
        <div className="container">
            <FontAwesomeIcon icon={faCheckCircle} className="icon" />
            <p className="text">
                Nous vous avons envoyé un courrier électronique contenant <br /> un lien
                pour réinitialiser votre mot de passe. <br /> Si vous ne l'avez pas
                encore reçu, vérifiez le dossier
                <br />
                de courrier indésirable ou spam.
            </p>
        </div>
    );
};

export default ResetLinkConfirmation;

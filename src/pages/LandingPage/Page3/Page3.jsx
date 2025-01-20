import React from 'react';
import './Page3.css';
import Page3Pic from '../../../assets/images/Page3Pic.jpeg';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Page3 = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleNavigateToLogin = () => {
        navigate('/login'); // Redirect to /login
    };

    return (
        <section className="candidate-space">
            <div className="candidate-container">
                {/* Text Content */}
                <div className="candidate-text">
                    <h2>Espace Candidat</h2>
                    <p>
                        Le bouton "S'inscrire" vous permet de créer gratuitement votre compte Journée Talents en 3 étapes simplifiées. Une fois votre compte vérifié, le bouton "Se connecter" via le web ou l’application mobile de Journées Talents vous permettra d’accéder à l’espace candidat "Mon compte" où vous pourrez profiter des différents programmes et demander à participer aux journées disponibles que vous désirez.
                    </p>
                    <button
                        className="candidate-button"
                        onClick={handleNavigateToLogin} // Navigate to /login
                    >
                        Participer
                    </button>
                </div>

                {/* Image */}
                <div className="candidate-image">
                    <img
                        src={Page3Pic}
                        alt="Espace Candidat"
                    />
                </div>
            </div>
        </section>
    );
};

export default Page3;

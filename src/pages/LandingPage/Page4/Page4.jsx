import React from 'react';
import './Page4.css';
import Page4Pic from '../../../assets/images/Page4Pic.jpeg';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Page4 = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleNavigateToLogin = () => {
        navigate('/login'); // Redirect to /login
    };

    return (
        <section className="page4-container">
            <div className="page4-content">
                <div className="page4-image">
                    <img src={Page4Pic} alt="Recruiter Space" />
                </div>
                <div className="page4-text">
                    <h2>Espace recruteur</h2>
                    <p>
                        Pour répondre à vos besoins en matière de ressources humaines et dénicher les candidats les plus
                        talentueux dans le monde, inscrivez-vous à l'espace recruteur et recevez notre invitation à
                        participer à plus de 12 000 journées par an. Une expérience inégalée pour recruter des talents
                        mondiaux avec tous les avantages nécessaires. Prime de participation, sélection et évaluation
                        des candidats via IA, prise en charge totale de votre participation, mise en place de
                        technologies de pointe VR/AR... Journée Talents, votre partenaire de réussite.
                    </p>
                    <button
                        className="recruteur-button"
                        onClick={handleNavigateToLogin} // Navigate to /login
                    >
                        Participer
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Page4;

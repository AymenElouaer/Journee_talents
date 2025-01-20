import React from 'react';
import './Page5.css';
import Page5Pic from '../../../assets/images/Page5Pic.jpg';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Page5 = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleNavigateToLogin = () => {
        navigate('/login'); // Redirect to /login
    };

    return (
        <section className="investor-space">
            <div className="investor-container">
                {/* Text Content */}
                <div className="investor-text">
                    <h2>Espace investisseur</h2>
                    <p>
                        Que vous soyez un établissement privé, une entreprise ou un individu passionné par
                        l’investissement et l’innovation, inscrivez-vous à l'espace investisseur et accédez à la banque
                        d'idées de projets la plus riche du monde. Des projets clés en main à un taux de risque
                        abordable. Là où votre imagination s'arrête, nous vous apportons.
                    </p>
                    <button
                        className="investisseur-button"
                        onClick={handleNavigateToLogin} // Navigate to /login
                    >
                        Participer
                    </button>
                </div>

                {/* Image */}
                <div className="investor-image">
                    <img
                        src={Page5Pic}
                        alt="Espace investisseur"
                    />
                    <div className="image-border"></div>
                </div>
            </div>
        </section>
    );
};

export default Page5;

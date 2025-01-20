import React, { useState } from 'react';
import './Page2.css';
import pic1 from '../../../assets/images/pic1.jpeg';
import pic2 from '../../../assets/images/pic2.webp';
import pic3 from '../../../assets/images/pic3.jpeg';
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Page2 = () => {
    // State to track the expanded cards
    const [expandedCard, setExpandedCard] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleExpand = (index) => {
        setExpandedCard(expandedCard === index ? null : index); // Toggle expansion
    };

    const handleNavigateToLogin = () => {
        navigate("/login"); // Redirect to /login
    };

    const programs = [
        {
            image: pic1,
            title: "+46 destinations de travail",
            description: "Chaque année, des journées de recrutement hybrides (présentielles ou virtuelles) sont organisées à l’échelle mondiale, permettant aux professionnels du recrutement de découvrir des talents exceptionnels et des perles rares dans le monde du travail.",
        },
        {
            image: pic2,
            title: "Jusqu’au 25 k USD de financement ",
            description: "Le programme de bourses de stages privés offre une opportunité unique de financement pour vos stages nationaux et internationaux. Nos investisseurs financent vos stages en échange de vos idées innovantes.",
        },
        {
            image: pic3,
            title: "Jusqu’au 15 k USD de financement",
            description: "Le programme de bourses d’études privées consiste à financer vos parcours académiques supérieurs dans la limite de 15 000 USD par année d’étude internationale et 10 000 USD par année d’étude nationale.",
        },
    ];

    return (
        <section className="program-section">
            <div className="program-container">
                {/* Section Header */}
                <h2 className="program-title">Nos Programmes</h2>

                {/* Program Cards */}
                <div className="program-cards">
                    {programs.map((program, index) => (
                        <div className="program-card" key={index}>
                            <img
                                src={program.image}
                                alt={program.title}
                                className="program-image"
                            />
                            <div className="program-card-content">
                                <h3>{program.title}</h3>
                                <p onClick={() => handleExpand(index)} className="program-more">
                                    {expandedCard === index ? "Moins" : "Plus"}
                                </p>
                                {expandedCard === index && (
                                    <div className="program-details-text">
                                        <p>{program.description}</p>
                                        <p>{program.details}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                {/* Program Details Section */}
                <div className="program-details">
                    <div className="program-detail">
                        <h3>Mobilité professionnelle</h3>
                        <p>La mobilité professionnelle des journées talents est une initiative privée qui consiste à organiser des journées de recrutement nationales ou internationales, présentielles ou virtuelles, ayant pour but de dénicher les candidats talentueux dans le monde et de leur offrir l’occasion de relancer leur carrière.</p>
                        <button
                            className="program-button"
                            onClick={handleNavigateToLogin} // Navigate to /login
                        >
                            Participer
                        </button>
                    </div>
                    <div className="program-detail">
                        <h3>Bourse de stage</h3>
                        <p>Une bourse de stage privée est un achat de l’idée de projet avant sa réalisation. En effet, c’est un investissement sous forme d’aide financière offert à l’étudiant afin d’acquérir la propriété intellectuelle de l’idée.</p>
                        <button
                            className="program-button"
                            onClick={handleNavigateToLogin} // Navigate to /login
                        >
                            Participer
                        </button>
                    </div>
                    <div className="program-detail">
                        <h3>Bourse d’étude</h3>
                        <p>Une bourse d’étude privée est une forme d’investissement angel pour des étudiants talentueux selon des critères spécifiques par des organismes privés, des entreprises ou des individus pour soutenir les études supérieures d’un étudiant dans le but de récolter les fruits de son succès.</p>
                        <button
                            className="program-button"
                            onClick={handleNavigateToLogin} // Navigate to /login
                        >
                            Participer
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Page2;

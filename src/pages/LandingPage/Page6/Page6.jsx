import React from 'react';
import './Page6.css';
import Page6Pic from '../../../assets/images/Page6Pic.png'

const Page6 = () => {
    return (
        <section className="ai-section">
            <div className="ai-container">
                {/* Left Image Section */}
                <div className="ai-image">
                    <img
                        src={Page6Pic} // Replace this with your actual image URL
                        alt="Artificial Intelligence Background"
                    />
                </div>

                {/* Right Text Section */}
                <div className="ai-text">
                    <h2>Intelligence Artificielle</h2>
                    <p>
                        L’intelligence artificielle désigne un ensemble de technologies et de systèmes informatiques capables de simuler des fonctions cognitives humaines, telles que l’apprentissage, la résolution de problèmes, le raisonnement, et la perception. En s'appuyant sur des algorithmes avancés et des modèles d'apprentissage, l'IA peut analyser des données, reconnaître des motifs complexes, et prendre des décisions ou exécuter des tâches de manière autonome. Elle est utilisée dans divers domaines, allant de l'automatisation industrielle à la reconnaissance vocale et visuelle, en passant par l’analyse prédictive et les interactions humaines.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Page6;

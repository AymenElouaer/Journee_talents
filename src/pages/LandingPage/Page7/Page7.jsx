import React from 'react';
import './Page7.css';
import Page7Pic from '../../../assets/images/Page7.jpg';

const Page7 = () => {
    return (
        <section className="page7-container">
            <div className="page7-content">
                <div className="page7-text-container">
                    <div className="page7-text">
                        <h2>A propos de nous</h2>
                        <p>
                            Journées Talents est une initiative privée destinée aux employeurs, recruteurs, investisseurs ainsi qu’aux organismes gouvernementaux et non gouvernementaux.<br/> Elle permet aux candidats inscrits de faire connaître leur candidature, de manifester leur intérêt pour des opportunités dans des pays donnés, et de rencontrer physiquement ou virtuellement des employeurs et recruteurs du monde entier.<br/>
                            Elle offre également un financement pour les parcours académiques et les stages d’études des candidats, dans le cadre de l’investissement en ressources humaines de la société mère ou de ses partenaires, conformément aux conditions des Bourses Privées.
                        </p>
                    </div>
                </div>
                <div className="page7-image">
                    <img src={Page7Pic} alt="Dreams and Ambitions" />
                </div>
            </div>
        </section>
    );
};

export default Page7;

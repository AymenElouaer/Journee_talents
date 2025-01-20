import React, { useState, useEffect } from "react";
import "./LandingFooter.css";
import FooterLogo from "../../../assets/images/FooterLogo.png";

const LandingFooter = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer); // Cleanup on unmount
    }, []);

    // Calculate rotation angles for clock hands
    const getHourAngle = (date) => (date.getHours() % 12) * 30 + date.getMinutes() * 0.5; // 360° / 12 hours + offset for minutes
    const getMinuteAngle = (date) => date.getMinutes() * 6; // 360° / 60 minutes
    const getSecondAngle = (date) => date.getSeconds() * 6; // 360° / 60 seconds

    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Logo Section */}
                <div className="footer-logo">
                    <img src={FooterLogo} alt="Journées Talents Logo" className="footer-logo-image" />
                </div>

                {/* Nos Services Section */}
                <div className="footer-column">
                    <h3 className="footer-title">Nos Services</h3>
                    <p className="footer-paragraph">Mobilité professionnelle</p>
                    <p className="footer-paragraph">Bourses d’études</p>
                    <p className="footer-paragraph">Bourses de stage</p>
                </div>

                {/* Comptes Section */}
                <div className="footer-column">
                    <h3 className="footer-title">Comptes</h3>
                    <p className="footer-paragraph">Recruteur</p>
                    <p className="footer-paragraph">Investisseur</p>
                    <p className="footer-paragraph">Candidat</p>
                </div>

                {/* Qui sommes-nous Section */}
                <div className="footer-column">
                    <h3 className="footer-title">Qui sommes-nous?</h3>
                    <p className="footer-paragraph">A propos de nous</p>
                    <p className="footer-paragraph">Protocole de confidentialité</p>
                    <p className="footer-paragraph">Protocole de prix</p>
                </div>

                {/* Support Section */}
                <div className="footer-column">
                    <h3 className="footer-title">Support</h3>
                    <p className="footer-paragraph">Contactez-nous</p>
                    <p className="footer-paragraph">FAQ</p>
                </div>

                {/* Analog Clock */}
                <div className="footer-clock">
                    <div className="clock">
                        <div
                            className="clock-hand hour-hand"
                            style={{ transform: `rotate(${getHourAngle(currentTime)}deg)` }}
                        />
                        <div
                            className="clock-hand minute-hand"
                            style={{ transform: `rotate(${getMinuteAngle(currentTime)}deg)` }}
                        />
                        <div
                            className="clock-hand second-hand"
                            style={{ transform: `rotate(${getSecondAngle(currentTime)}deg)` }}
                        />
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="footer-bottom">
                <div className="footer-bottom-text">
                    <p>&copy; <strong>2025</strong> COPYRIGHT © Journées talents</p>
                </div>

                {/* Social Links */}
                <div className="social-links">
                    <a href="#" aria-label="LinkedIn">
                        <i className="fab fa-linkedin"></i>
                    </a>
                    <a href="#" aria-label="Facebook">
                        <i className="fab fa-facebook"></i>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default LandingFooter;

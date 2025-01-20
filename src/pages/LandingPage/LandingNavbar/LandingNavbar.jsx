import React from 'react';
import './LandingNavbar.css';
import LogoLandingNav from '../../../assets/images/LogoLandingPage.png';

const LandingNavbar = ({ navbarColor }) => {

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <header className="landing-navbar" style={{ backgroundColor: navbarColor }}>
            <div className="landing-navbar-content">
                <div
                    className="landing-navbar-logo"
                    onClick={scrollToTop}
                    style={{ cursor: 'pointer' }}
                >
                    <img src={LogoLandingNav} alt="Journées Talents Logo" className="landing-nav-logo" />
                </div>
                <div className="landing-navbar-actions">

                    <a href="/login" className="landing-navbar-btn">Se connecter</a>
                    <a href="/register" className="landing-navbar-btn landing-navbar-btn-primary">S’inscrire</a>
                </div>
            </div>
        </header>
    );
};

export default LandingNavbar;

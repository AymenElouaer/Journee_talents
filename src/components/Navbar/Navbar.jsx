import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Navbar.css';
import LogoNav from '../../assets/images/LogoNav.png'; // Keep LogoNav or miniLogo based on preference

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-custom">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img
                        src={LogoNav}
                        alt="Journées Talents Logo"
                        className="logo"
                    />
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;

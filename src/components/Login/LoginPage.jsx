import React, { useEffect, useState } from 'react';
import './LoginPage.css';
import LogoLoginPage from '../../images/login-logo.png';
import GoogleLogo from '../../images/Glogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, loginWithGoogle } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ProgressEnum } from '../../utils/enum.js';
import CryptoJS from 'crypto-js';

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);


    // Utility: Encrypt and decrypt data
    const encryptData = (data) => CryptoJS.AES.encrypt(data, 'secret-key').toString();
    const decryptData = (encryptedData) => {
        const bytes = CryptoJS.AES.decrypt(encryptedData, 'secret-key');
        return bytes.toString(CryptoJS.enc.Utf8);
    };

    // Load saved email on component mount
    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        if (storedEmail) {
            setEmail(decryptData(storedEmail));
            setRememberMe(true);
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        const result = await dispatch(loginUser({ email, password }));
        if (result.type === 'auth/loginUser/fulfilled') {
            console.log("user payload",result.payload )
            const token = result.payload.token; // Token returned by the server
            const userProgress = result.payload.user.progress;
            console.log("user progress fedi",userProgress);

            // Store the token securely
            localStorage.setItem('token', token);

            // Determine the redirect path based on progress
            const redirectPath =
                userProgress < ProgressEnum.STEP_3_SUBSTEP_3 ? '/mForm' : '/home';

            toast.success('Connexion réussie ! Redirection...', {
                autoClose: 1500,
                onClose: () => navigate(redirectPath),
            });

            if (rememberMe) {
                // Save encrypted email for "Remember Me"
                localStorage.setItem('email', encryptData(email));
            } else {
                localStorage.removeItem('email');
            }
        } else {
            console.error("Login failed:", result.payload); // Log the error payload
            toast.error(result.payload || 'Échec de la connexion. Veuillez réessayer.', {
                autoClose: 1500,
            });
        }
    };

    const handleGoogleLogin = async () => {
        const result = await dispatch(loginWithGoogle());

        //auth/loginWithGoogle/fulfilled
        if (result.type === 'auth/loginWithGoogle/fulfilled') {
            console.log("payload", result.payload.user.progress)
            const userProgress = result.payload.user.progress;

            // Determine the redirect path based on progress
            const redirectPath =  userProgress  <= ProgressEnum.STEP_3_SUBSTEP_2 ?'/mForm' :  '/home';
            console.log("redirectPathredirectPathredirectPath", redirectPath , );
            toast.success('Connexion Google réussie ! Redirection...', {
                autoClose: 1500,
                onClose: () => navigate(redirectPath),
            });
        } else {
            toast.error(result.payload || 'Connexion Google échouée. Veuillez réessayer.');
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };



    return (
        <div className="login-container">
            <div className="login-left-section">
                <img src={LogoLoginPage} alt="Journées Talents Logo" className="login-logo" />
                <p className="login-description">
                    Bienvenue aux Journées Talents, un événement dédié à
                    la découverte et au développement des talents.
                    Que vous soyez un professionnel cherchant à évoluer dans
                    votre carrière, un artiste en quête de nouvelles opportunités,
                    ou un entrepreneur souhaitant renforcer vos compétences,
                    ces journées sont faites pour vous.
                </p>
            </div>

            <div className="login-right-section">
                <h2 className="login-header">Se connecter</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form className="login-form" onSubmit={handleLogin}>
                    <div className="login-form-group">
                        <label htmlFor="email" className="login-form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="login-form-input"
                            placeholder="Entrez votre email"
                        />
                    </div>

                    <div className="login-form-group">
                        <div className="login-password-container">
                            <label htmlFor="password" className="login-form-label">Mot de passe</label>
                            <a href="/forgot-password" className="forgot-password-link">Mot de passe oublié ?</a>
                        </div>
                        <div className="password-wrapper">
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="login-form-input"
                                placeholder="Entrez votre mot de passe"
                                required
                            />
                            <span className="password-toggle" onClick={togglePasswordVisibility}>
                                <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} />
                            </span>
                        </div>
                    </div>

                    <div className="remember-me-group">
                        <input
                            className="checkbox"
                            type="checkbox"
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={() => setRememberMe(!rememberMe)}
                        />
                        <label htmlFor="rememberMe" className="remember-me-label">Se souvenir de moi</label>
                    </div>

                    <button type="submit" className="login-form-button" disabled={loading}>
                        {loading ? 'Connexion en cours...' : 'Se connecter'}
                    </button>

                    <div className="login-divider">
                        <span className="line"></span>
                        <span className="text">Ou</span>
                        <span className="line"></span>
                    </div>

                    <button type="button" className="login-google-button" onClick={handleGoogleLogin}>
                        <img src={GoogleLogo} alt="Google logo" className="login-google-logo" />
                        <span>Connexion avec Google</span>
                    </button>
                </form>

                <p className="signup-link">
                    Vous n'avez pas de compte ? <a href="/register">S’inscrire</a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;

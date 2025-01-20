const validateForm = (formData, captchaValue) => {
    const newErrors = {};

    // Regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Regex for password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Nom and Prénom validation
    if (!formData.nom) newErrors.nom = 'Nom est requis.';
    if (!formData.prenom) newErrors.prenom = 'Prénom est requis.';

    // Email validation
    if (!formData.email) {
        newErrors.email = 'E-mail est requis.';
    } else if (!emailRegex.test(formData.email)) {
        newErrors.email = 'E-mail doit être au format text@something.com.';
    }

    // Confirm Email validation
    if (formData.email !== formData.confirmEmail) {
        newErrors.confirmEmail = 'Les e-mails ne correspondent pas.';
    }

    // Password validation
    if (!formData.password) {
        newErrors.password = 'Mot de passe est requis.';
    } else if (!passwordRegex.test(formData.password)) {
        newErrors.password =
            'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre, et un caractère spécial.';
    }

    // Confirm Password validation
    if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Les mots de passe ne correspondent pas.';
    }

    // CAPTCHA validation
    if (!captchaValue) {
        newErrors.captcha = 'Veuillez compléter le CAPTCHA.';
    }

    return newErrors;
};

export default validateForm;

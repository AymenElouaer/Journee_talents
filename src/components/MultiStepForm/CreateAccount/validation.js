// validation.js
const validatePersonalInfo = (personalInfo, selectedCountries) => {
    const errors = {};

    if (!personalInfo.nom) errors.nom = "Le champ 'Nom' est requis.";
    if (!personalInfo.prenom) errors.prenom = "Le champ 'Prénom' est requis.";
    if (!personalInfo.dateDeNaissance) errors.dateDeNaissance = "Le champ 'Date de naissance' est requis.";
    if (!personalInfo.LieuDeNaissance) errors.LieuDeNaissance = "Le champ 'Lieu de naissance' est requis.";
    if (!personalInfo.sexe) errors.sexe = "Veuillez sélectionner votre sexe.";
    if (!selectedCountries || selectedCountries.length === 0) {
        errors.nationalite = "Veuillez sélectionner au moins une nationalité.";
    }

    return errors;
};
export default validatePersonalInfo
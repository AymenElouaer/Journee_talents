import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import Page3Pic1 from '../../../../assets/images/Page3Pic1.jpg';
import Page3Pic2 from '../../../../assets/images/Page3Pic2.png';

const Page3 = () => {
    return (
        <Box
            sx={{
                padding: '2rem',
                '@media (max-width: 768px)': {
                    padding: '1rem', // Reduce padding for tablets
                },
                '@media (max-width: 480px)': {
                    padding: '0.5rem', // Further reduce padding for mobile
                },
            }}
        >
            {/* First Section */}
            <Grid container spacing={4} alignItems="center">
                {/* Text Section */}
                <Grid item xs={12} md={6}>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 'bold',
                            color: '#002665',
                            marginBottom: '1rem',
                            textAlign: { xs: 'center', md: 'left' }, // Center-align text for smaller screens
                            fontSize: { xs: '1.2rem', md: '1.5rem' }, // Adjust font size
                        }}
                    >
                        Bourse d’études
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: '#6D6D6D',
                            lineHeight: 1.7,
                            textAlign: { xs: 'justify', md: 'left' }, // Justify text for smaller screens
                            fontSize: { xs: '0.9rem', md: '1rem' }, // Adjust font size
                        }}
                    >
                        Une bourse d’étude privée est une forme d’investissement angel pour des étudiants talentueux selon des critères spécifiques par des organismes privés, des entreprises ou des individus pour soutenir les études supérieures d’un étudiant dans le but de récolter les fruits de son succès.
                    </Typography>
                </Grid>
                {/* Image Section */}
                <Grid item xs={12} md={6}>
                    <Box
                        component="img"
                        src={Page3Pic1}
                        alt="Bourse d’études"
                        sx={{
                            width: '100%',
                            borderRadius: '8px',
                            boxShadow: 3,
                            height: { xs: '400px', md: 'auto' }, // Reduce height for smaller screens
                            objectFit: 'cover', // Ensure image fits nicely
                        }}
                    />
                </Grid>
            </Grid>

            {/* Second Section */}
            <Grid container spacing={4} alignItems="center" sx={{ marginTop: '3rem' }}>
                {/* Image Section */}
                <Grid item xs={12} md={6}>
                    <Box
                        component="img"
                        src={Page3Pic2}
                        alt="Intelligence artificielle"
                        sx={{
                            width: '100%',
                            borderRadius: '8px',
                            boxShadow: 3,
                            height: { xs: '400px', md: 'auto' }, // Reduce height for smaller screens
                            objectFit: 'cover',
                        }}
                    />
                </Grid>
                {/* Text Section */}
                <Grid item xs={12} md={6}>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 'bold',
                            color: '#002665',
                            marginBottom: '1rem',
                            textAlign: { xs: 'center', md: 'left' }, // Center-align on smaller screens
                            fontSize: { xs: '1.2rem', md: '1.5rem' }, // Adjust font size
                        }}
                    >
                        Intelligence artificielle
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: '#6D6D6D',
                            lineHeight: 1.7,
                            textAlign: { xs: 'justify', md: 'left' }, // Justify text for smaller screens
                            fontSize: { xs: '0.9rem', md: '1rem' }, // Adjust font size
                        }}
                    >
                        L’intelligence artificielle désigne un ensemble de technologies et de systèmes informatiques capables de simuler des fonctions cognitives humaines, telles que l’apprentissage, la résolution de problèmes, le raisonnement, et la perception. En s'appuyant sur des algorithmes avancés et des modèles d'apprentissage, l'IA peut analyser des données, reconnaître des motifs complexes, et prendre des décisions ou exécuter des tâches de manière autonome. Elle est utilisée dans divers domaines, allant de l'automatisation industrielle à la reconnaissance vocale et visuelle, en passant par l’analyse prédictive et les interactions humaines.
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Page3;

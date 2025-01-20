import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import Page4Pic1 from '../../../../assets/images/Page4Pic1.jpg';

const Page4 = () => {
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
            <Grid container spacing={4} alignItems="center">
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
                        A propos de nous
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
                        Journées Talents est une initiative privée destinée aux employeurs, recruteurs, investisseurs ainsi qu’aux organismes gouvernementaux et non gouvernementaux.
                        Elle permet aux candidats inscrits de faire connaître leur candidature, de manifester leur intérêt pour des opportunités dans des pays donnés, et de rencontrer physiquement ou virtuellement des employeurs et recruteurs du monde entier.
                        Elle offre également un financement pour les parcours académiques et les stages d’études des candidats, dans le cadre de l’investissement en ressources humaines de la société mère ou de ses partenaires, conformément aux conditions des Bourses Privées.
                    </Typography>
                </Grid>
                {/* Image Section */}
                <Grid item xs={12} md={6}>
                    <Box
                        component="img"
                        src={Page4Pic1}
                        alt="Mobilité professionnelle"
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
        </Box>
    );
};

export default Page4;

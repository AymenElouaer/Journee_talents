import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import Page2Pic1 from '../../../../assets/images/Page2Pic.jpg';
import Page2Pic2 from '../../../../assets/images/Pag2Pic2.jpeg';

const Page2 = () => {
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
            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    fontWeight: '500',
                    color: '#2E2E2E',
                    textAlign: { xs: 'center', md: 'left' }, // Center text for smaller screens
                    fontSize: { xs: '1.8rem', md: '2.125rem' }, // Adjust font size for smaller screens
                }}
            >
                Journées Talents
            </Typography>

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
                            textAlign: { xs: 'center', md: 'left' }, // Center-align on smaller screens
                            fontSize: { xs: '1.2rem', md: '1.5rem' }, // Adjust font size
                        }}
                    >
                        Mobilité professionnelle
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
                        La mobilité professionnelle des journées talents est une initiative privée qui consiste à organiser des journées de recrutement nationales ou internationales, présentielles ou virtuelles, ayant pour but de dénicher les candidats talentueux dans le monde et de leur offrir l’occasion de relancer leur carrière.
                    </Typography>
                </Grid>
                {/* Image Section */}
                <Grid item xs={12} md={6}>
                    <Box
                        component="img"
                        src={Page2Pic1}
                        alt="Mobilité professionnelle"
                        sx={{
                            width: '100%',
                            borderRadius: '8px',
                            boxShadow: 3,
                            height: { xs: '300px', md: 'auto' }, // Reduce height for smaller screens
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
                        src={Page2Pic2}
                        alt="Bourse de stages"
                        sx={{
                            width: '100%',
                            borderRadius: '8px',
                            boxShadow: 3,
                            height: { xs: '300px', md: 'auto' }, // Reduce height for smaller screens
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
                        Bourse de stages
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
                        Une bourse de stage privée est un achat de l’idée de projet avant sa réalisation. En effet, c’est un investissement sous forme d’aide financière offert à l’étudiant afin d’acquérir la propriété intellectuelle de l’idée.
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Page2;

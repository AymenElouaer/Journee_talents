import React, { useState } from 'react';
import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import HomeNavbar from '../HomePage/HomeNavbar/HomeNavbar.jsx';
import SideBar from "../HomePage/SideBar/SideBar.jsx";
import {useNavigate} from "react-router-dom";

const drawerWidth = 250;

const EntretientPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const isMobile = useMediaQuery('(max-width: 768px)'); // Check if the screen is mobile-sized
    const navigate = useNavigate();
    const handleReserveClick = () =>{
        navigate('/demands');
    }

    const toggleSidebar = () => {
        setSidebarOpen((prevOpen) => !prevOpen);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                height: '100vh',
                overflow: 'hidden',
                flexDirection: 'column',
            }}
        >
            {/* Navbar */}
            <Box
                sx={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 10,
                    backgroundColor: '#F6F4F4',
                    borderBottom: '1px solid #ddd',
                    width: '100%',
                    paddingLeft: sidebarOpen && !isMobile ? `${drawerWidth}px` : 0, // Adjust padding for mobile and sidebar state
                    transition: 'padding-left 0.3s ease-in-out',
                }}
            >
                <HomeNavbar onMenuClick={toggleSidebar} /> {/* Pass the toggle function */}
            </Box>

            {/* Main Content Area */}
            <Box
                sx={{
                    display: 'flex',
                    flex: 1,
                    height: '100%',
                    overflow: 'auto',
                    backgroundColor: '#F6F4F4',
                }}
            >
                {/* Sidebar */}
                <SideBar open={sidebarOpen} toggleSidebar={toggleSidebar} />

                {/* Main Content */}
                <Box
                    sx={{
                        flex: 1,
                        marginLeft: sidebarOpen && !isMobile ? `${drawerWidth}px` : 0, // Adjust margin for sidebar state and mobile
                        transition: 'margin-left 0.3s ease-in-out',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: isMobile ? '1rem' : '2rem', // Adjust padding for mobile
                        backgroundColor: '#F6F4F4',
                    }}
                >
                    {/* Content without the countdown */}
                    <Box textAlign="center">
                        <Typography
                            variant="h3"
                            color="textPrimary"
                            gutterBottom
                            sx={{
                                color: '#BEC0C1',
                                fontSize: isMobile ? '36px' : '51px', // Adjust font size for mobile
                                marginBottom: isMobile ? '3rem' : '7rem', // Adjust margin for mobile
                            }}
                        >
                            Les entretiens seront disponibles <br />
                            après la réservation de rendez-vous
                        </Typography>
                        {/* Ajouter Une Demande Button */}
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginBottom: '2rem',
                            }}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleReserveClick}
                                sx={{
                                    padding: '10px 20px',
                                    fontSize: '16px',
                                    fontWeight: 500,
                                    borderRadius: '5px',
                                    width: isMobile ? '100%' : '438px', // Adjust width for mobile
                                    backgroundColor: '#002665',
                                    '&:hover': {
                                        backgroundColor: '#003366',
                                    }

                                }}
                            >
                                Reserver Rendez-vous
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default EntretientPage;

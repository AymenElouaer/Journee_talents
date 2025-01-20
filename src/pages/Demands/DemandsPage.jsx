import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Divider, useMediaQuery } from '@mui/material';
import HomeNavbar from '../HomePage/HomeNavbar/HomeNavbar.jsx';
import SideBar from "../HomePage/SideBar/SideBar.jsx";

const drawerWidth = 250;

const calculateTimeLeft = () => {
    const targetDate = new Date("2025-02-22");
    const now = new Date();

    const difference = targetDate - now;
    if (difference > 0) {
        return {
            DAYS: Math.floor(difference / (1000 * 60 * 60 * 24)),
            HOURS: Math.floor((difference / (1000 * 60 * 60)) % 24),
            MINUTES: Math.floor((difference / 1000 / 60) % 60),
            SECONDS: Math.floor((difference / 1000) % 60),
        };
    }
    return null;
};

const DemandsPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const isMobile = useMediaQuery('(max-width: 768px)'); // Check if the screen is mobile-sized

    const toggleSidebar = () => {
        setSidebarOpen((prevOpen) => !prevOpen);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

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
                    paddingLeft: sidebarOpen && !isMobile ? `${drawerWidth}px` : 0, // Adjust for sidebar and screen size
                    transition: 'padding-left 0.3s ease-in-out',
                }}
            >
                <HomeNavbar onMenuClick={toggleSidebar} /> {/* Pass the toggle function here */}
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
                        marginLeft: sidebarOpen && !isMobile ? `${drawerWidth}px` : 0, // Adjust for sidebar and screen size
                        transition: 'margin-left 0.3s ease-in-out',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: isMobile ? '1rem' : '2rem', // Adjust padding for mobile
                        backgroundColor: '#F6F4F4',
                    }}
                >
                    {timeLeft ? (
                        <Box textAlign="center">
                            <Typography
                                variant="h3"
                                color="textPrimary"
                                gutterBottom
                                sx={{
                                    color: '#BEC0C1',
                                    fontSize: isMobile ? '36px' : '51px', // Adjust font size for mobile
                                    marginBottom: '2rem',
                                }}
                            >
                                Cette section est temporairement <br /> indisponible
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    color: '#BEC0C1',
                                    fontSize: isMobile ? '20px' : '30px', // Adjust font size for mobile
                                    marginBottom: '4rem',
                                }}
                            >
                                sera de nouveau accessible à partir du
                            </Typography>
                            <Grid
                                container
                                spacing={4}
                                justifyContent="center"
                                alignItems="center"
                                sx={{ width: '100%' }}
                            >
                                {Object.entries(timeLeft).map(([unit, value]) => (
                                    <Grid item key={unit} xs={3} sm={2}>
                                        <Typography
                                            sx={{
                                                fontSize: isMobile
                                                    ? '2rem'
                                                    : '4rem',
                                                color: "#002665",
                                                fontWeight: "400",
                                            }}
                                        >
                                            {value}
                                        </Typography>
                                        <Divider
                                            sx={{
                                                backgroundColor: "#002665",
                                                height: "2px",
                                                width: "100%",
                                                margin: "8px 0",
                                            }}
                                        />
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                color: "#002665",
                                                fontSize: isMobile
                                                    ? '0.75rem'
                                                    : '1.25rem',
                                            }}
                                        >
                                            {unit.charAt(0).toUpperCase() + unit.slice(1)}
                                        </Typography>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    ) : (
                        <Typography variant="h4" align="center">
                            Le compte à rebours est terminé !
                        </Typography>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default DemandsPage;

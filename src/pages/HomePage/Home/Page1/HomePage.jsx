import React, { useState } from 'react';
import { Box, Button, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import HomeNavbar from '../../HomeNavbar/HomeNavbar.jsx';
import SideBar from '../../SideBar/SideBar.jsx';
import Actualites from '../../Actualites/Actualites.jsx';
import Page2 from '../Page2/Page2.jsx';
import Page3 from '../Page3/Page3.jsx';
import Page4 from '../Page4/Page4.jsx';
import Slider from '../../Slider.jsx';

const drawerWidth = 250;

const HomePage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const navigate = useNavigate(); // Initialize useNavigate
    const isMobile = useMediaQuery('(max-width: 768px)'); // Check for mobile screens

    const toggleSidebar = () => {
        setSidebarOpen((prevOpen) => !prevOpen);
    };

    const handleNavigate = () => {
        navigate('/demands');
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
                    width: '100%',
                    paddingLeft: sidebarOpen && !isMobile ? `${drawerWidth}px` : 0,
                    transition: 'padding-left 0.3s ease-in-out',
                }}
            >
                <HomeNavbar onMenuClick={toggleSidebar} />
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
                        marginLeft: sidebarOpen && !isMobile ? `${drawerWidth}px` : 0,
                        transition: 'margin-left 0.3s ease-in-out',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {/* Content Wrapper with White Background */}
                    <Box
                        sx={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            backgroundColor: 'white',
                            borderRadius: '51px 51px 0 0',
                            margin: 2,
                            padding: 2,
                        }}
                    >
                        {/* Slider */}
                        <Box
                            sx={{
                                width: '100%',
                                height: '500px',
                                position: 'relative',
                                marginBottom: '2rem',
                            }}
                        >
                            <Slider />
                        </Box>

                        {/* Ajouter Une Demande Button */}
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginBottom: '2rem',
                                marginTop:'4rem'
                            }}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{
                                    padding: '10px 20px',
                                    fontSize: '16px',
                                    fontWeight: 500,
                                    borderRadius: '5px',
                                    width: '438px',
                                    backgroundColor: '#002665',
                                    '&:hover': {
                                        backgroundColor: '#003366',
                                    },
                                }}
                                onClick={handleNavigate}
                            >
                                Ajouter Une Demande
                            </Button>
                        </Box>

                        {/* Content Sections */}
                        <Box
                            sx={{
                                display: 'flex',
                                flex: 1,
                                flexDirection: 'row',
                                gap: '1rem',
                                flexWrap: isMobile ? 'wrap' : 'nowrap', // Wrap content on mobile
                            }}
                        >
                            {/* Left Section: Dynamic Pages (Page2, Page3, etc.) */}
                            <Box
                                sx={{
                                    flex: isMobile ? '1 1 100%' : '2',
                                    padding: '2rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <Page2 />
                                <Page3 />
                                <Page4 />
                            </Box>

                            {/* Right Section: Actualites */}
                            <Box
                                sx={{
                                    flex: isMobile ? '1 1 100%' : '1',
                                    paddingLeft: 2,
                                    position: 'sticky',
                                    top: 0,
                                    height: '100vh',
                                    overflowY: 'auto',
                                    borderLeft: '1px solid #ddd',
                                }}
                            >
                                <Actualites />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default HomePage;

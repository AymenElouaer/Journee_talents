import React, {useEffect, useState} from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, useMediaQuery, Drawer, List, ListItem, ListItemText } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import {useSelector,useDispatch} from "react-redux"; // Hamburger Icon
import {useNavigate} from "react-router-dom";
import {handleLogout} from "../../../store/slices/authSlice.js";

const HomeNavbar = () => {
    const [menuOpen, setMenuOpen] = useState(false); // State to manage menu visibility
    const isMobile = useMediaQuery('(max-width: 768px)');

    const toggleMenu = () => {
        setMenuOpen(!menuOpen); // Toggle menu visibility
    };

    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogoutClick = () => {
        dispatch(handleLogout());
        navigate('/login');

    }





    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: '1238px',
                margin: 'auto',
                borderRadius: '0 0 16px 16px',
                overflow: 'hidden',
                boxShadow: 3,
                height: '6rem',
                backgroundColor: 'white',
                marginLeft: '1rem',
            }}
        >
            <AppBar
                position="static"
                sx={{
                    backgroundColor: 'white',
                    boxShadow: 'none',
                    height: '100%',
                }}
            >
                <Toolbar
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap', // Allow wrapping on smaller screens
                    }}
                >
                    {/* Left Section (Center text on mobile, left-aligned on desktop) */}
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems={isMobile ? 'center' : 'flex-start'} // Center on mobile, left-align on desktop
                        justifyContent="center" // Center vertically
                        sx={{
                            flexBasis: '50%',
                            textAlign: isMobile ? 'center' : 'left', // Center text for mobile screens
                            marginBottom: { xs: 2, sm: 0 }, // Add margin bottom for mobile screens
                            height: '100%', // Ensure it takes up full height for centering
                        }}
                    >
                        <Typography
                            variant={isMobile ? 'h6' : 'h5'} // Smaller text size on mobile
                            sx={{
                                color: '#002665',
                                fontWeight: '700',
                            }}
                        >
                            {user.nom} {user.prenom}
                        </Typography>
                        <Typography
                            variant={isMobile ? 'body2' : 'subtitle2'} // Smaller text size on mobile
                            sx={{
                                color: '#002665',
                            }}
                        >
                            {user.uniqueId ? user.uniqueId : 'No uniqueId available'}
                        </Typography>
                    </Box>

                    {/* Right Section (Hide on Mobile) */}
                    {!isMobile && (
                        <Box
                            display="flex"
                            alignItems="center"
                            gap={2}
                            sx={{
                                flexBasis: '50%',
                                justifyContent: 'flex-end', // Align icons to the right
                            }}
                        >
                            <IconButton sx={{ color: '#002665' }}>
                                <NotificationsIcon />
                            </IconButton>
                            <IconButton sx={{ color: '#002665' }} onClick={handleLogoutClick} >
                                <LogoutIcon />
                            </IconButton>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>

            {/* Hamburger Menu for Mobile */}
            {isMobile && (
                <IconButton
                    sx={{
                        color: '#002665',
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                    }}
                    onClick={toggleMenu}
                >
                    <MenuIcon />
                </IconButton>
            )}

            {/* Drawer (Menu) for Mobile */}
            <Drawer
                anchor="right"
                open={menuOpen}
                onClose={toggleMenu}
                sx={{
                    '@media (min-width: 769px)': {
                        display: 'none', // Hide on larger screens
                    },
                }}
            >
                <List>
                    <ListItem button onClick={() => alert('Notifications')}>
                        <ListItemText primary="Notifications" />
                    </ListItem>
                    <ListItem button onClick={handleLogoutClick}>
                        <ListItemText primary="Logout" />
                    </ListItem>
                    {/* Add other menu items here */}
                </List>
            </Drawer>
        </Box>
    );
};

export default HomeNavbar;

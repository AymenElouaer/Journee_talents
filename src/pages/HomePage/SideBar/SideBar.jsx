import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Box, IconButton, useMediaQuery } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EventIcon from '@mui/icons-material/Event';
import ChatIcon from '@mui/icons-material/Chat';
import ListAltIcon from '@mui/icons-material/ListAlt';
import MenuIcon from '@mui/icons-material/Menu'; // Hamburger Icon
import MoreVertIcon from '@mui/icons-material/MoreVert'; // 3 Dots Icon
import SideBarPic from '../../../assets/images/SideBarPic.png';

const links = [
    { to: '/home', label: 'Accueil', icon: <HomeIcon /> },
    { to: '/compte', label: 'Mon Compte', icon: <AccountCircleIcon /> },
    { to: '/demands', label: 'Mes Demandes', icon: <ListAltIcon /> },
    { to: '/entretient', label: 'Mes Entretiens', icon: <ChatIcon /> },
    { to: '/convocation', label: 'Mes Convocations', icon: <EventIcon /> },
];

const SideBar = () => {
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const isMobile = useMediaQuery('(max-width: 768px)'); // Check if the screen size is mobile

    const toggleSidebar = () => {
        setOpen(!open);
    };

    const isActive = (path) => location.pathname === path;

    return (
        <Box sx={{ display: 'flex' }}>
            {/* Drawer for larger screens */}
            <Drawer
                open={!isMobile || open} // Always open on large screens, toggle on mobile
                onClose={toggleSidebar}
                variant={isMobile ? 'temporary' : 'persistent'} // Temporary drawer on mobile, persistent on desktop
                sx={{
                    '& .MuiDrawer-paper': {
                        width: 250,
                        boxSizing: 'border-box',
                        backgroundColor: '#002665',
                        color: 'white',
                        borderColor: '#F6F4F4',
                    },
                }}
            >
                {/* Logo */}
                <div>
                    <Link to="/home">
                        <Box
                            component="img"
                            src={SideBarPic}
                            alt="Journées Talents"
                            sx={{
                                width: isMobile ? '70%' : '100%', // Smaller logo on mobile
                                maxWidth: isMobile ? '140px' : '200px', // Adjust max width
                                margin: '0 auto',
                                display: 'block',
                                padding: isMobile ? 1 : 2, // Adjust padding
                                height: isMobile ? '12vh' : '18vh', // Smaller height on mobile
                            }}
                        />
                    </Link>
                </div>

                {/* Sidebar Links */}
                <List>
                    {links.map((link, index) => {
                        return (
                            <ListItem
                                button
                                key={index}
                                component={Link}
                                to={link.to}
                                sx={{
                                    display: 'flex',
                                    width: isMobile ? '90%' : '80%', // Adjust width on mobile
                                    justifyContent: 'flex-end',
                                    padding: isMobile ? '8px 16px' : '10px 20px', // Smaller padding on mobile
                                    backgroundColor: isActive(link.to) ? '#F6F4F4' : 'transparent',
                                    borderRadius: '20px 0 0 20px',
                                    marginBottom: '10px',
                                    marginLeft: isMobile ? '1rem' : '3.12rem', // Adjust margin on mobile
                                    height: isMobile ? '8vh' : '10vh', // Smaller height on mobile
                                    color: isActive(link.to) ? '#002665' : 'white',
                                    '&:hover': {
                                        backgroundColor: isActive(link.to) ? '#F6F4F4' : '#003a8c',
                                    },
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        color: isActive(link.to) ? '#002665' : 'white',
                                        minWidth: isMobile ? '30px' : '40px', // Smaller icon spacing on mobile
                                    }}
                                >
                                    {link.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={link.label}
                                    primaryTypographyProps={{
                                        fontWeight: isActive(link.to) ? 'bold' : 'normal',
                                        fontSize: isMobile ? '0.85rem' : '1rem', // Smaller font size on mobile
                                    }}
                                />
                            </ListItem>
                        );
                    })}
                </List>
            </Drawer>

            {/* 3 Dots Icon for Smaller Screens */}
            {isMobile && (
                <IconButton
                    onClick={toggleSidebar}
                    sx={{
                        position: 'absolute',
                        top: 16,
                        left: 1,
                        zIndex: 1400, // Ensure the icon is on top of other content
                        color: '#002665',
                    }}
                >
                    <MoreVertIcon /> {/* 3 Dots Icon */}
                </IconButton>
            )}
        </Box>
    );
};

export default SideBar;

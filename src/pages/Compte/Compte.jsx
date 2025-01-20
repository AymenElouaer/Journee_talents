import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, TextField, useMediaQuery } from '@mui/material';
import { styled } from '@mui/system';
import HomeNavbar from '../HomePage/HomeNavbar/HomeNavbar.jsx';
import SideBar from "../HomePage/SideBar/SideBar.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfileAsync,setProfile } from "../../store/slices/authSlice.js";
import { persistor } from "../../store/index.js";  // Ensure persistence for updated state

// Drawer width
const drawerWidth = 250;

// Styled Components
const StyledComponents = {
    FormContainer: styled(Box)(({ theme }) => ({
        width: '600px',
        margin: '50px auto',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        backgroundColor: '#ffffff',
        fontFamily: "'Roboto', sans-serif",
        textAlign: 'center',
        [theme.breakpoints.down('md')]: {
            width: '90%',
            margin: '20px auto',
            padding: '10px',
        },
    })),
    InputFieldWrapper: styled(Box)(() => ({
        marginBottom: '20px',
        textAlign: 'left',
    })),
    StyledButton: styled(Button)(({ theme }) => ({
        margin: '10px',
        padding: '10px 20px',
        borderRadius: '5px',
        textTransform: 'none',
        fontSize: '16px',
        fontWeight: 500,
    })),
};

// ProfileForm Component
const ProfileForm = () => {
    const dispatch = useDispatch();
    const { FormContainer, InputFieldWrapper, StyledButton } = StyledComponents;

    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);

    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setNom(user.nom || '');
            setPrenom(user.prenom || '');
            setEmail(user.secondEmail || '');
            setPhoneNumber(user.numeroTel || '');
        }
    }, [user]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedProfile = {
            user: {
                nom,
                prenom,
                secondEmail: email,
                numeroTel: phoneNumber,
            },
        };

        dispatch(updateProfileAsync(updatedProfile))
            .unwrap()
            .then((res) => {
                // The setProfile action will handle saving to Redux and localStorage
                dispatch(setProfile({
                    user: res.data.user,
                    token: res.token || token, // Keep existing token if no new token is returned
                    profile: res.data.user,
                }));
                navigate("/home");

                console.log("Profile updated successfully!", res);
            })
            .catch((error) => console.error("Error updating profile:", error));
    };




    return (
        <FormContainer>
            <Typography variant="h5" fontWeight="bold" color='#002366' gutterBottom>
                Modifier Profil
            </Typography>
            <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
                <InputFieldWrapper>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                        Prénom
                    </Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                    />
                </InputFieldWrapper>
                <InputFieldWrapper>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                        Nom
                    </Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                    />
                </InputFieldWrapper>
                <InputFieldWrapper>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                        E-mail
                    </Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                    />
                </InputFieldWrapper>
                <InputFieldWrapper>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                        Numéro de téléphone
                    </Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </InputFieldWrapper>
                <Box display="flex" justifyContent="center" gap={2}>
                    <StyledButton
                        variant="contained"
                        onClick={() => navigate("/home")}
                        sx={{color:'#002665',borderColor:'#002665',backgroundColor:'transparent'}}
                    >
                        Annuler
                    </StyledButton>
                    <StyledButton
                        variant="contained"
                        color="primary"
                        type="submit"
                        sx={{color:'white',backgroundColor:"#002665"}}
                    >
                        Modifier
                    </StyledButton>
                </Box>
            </Box>
        </FormContainer>
    );
};

// Main Compte Component
const Compte = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '130vh' }}>
            <Box
                sx={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 10,
                    backgroundColor: '#F6F4F4',
                    width: '100%',
                    paddingLeft: sidebarOpen && !isMobile ? `${drawerWidth}px` : 0,
                }}
            >
                <HomeNavbar onMenuClick={() => setSidebarOpen((prev) => !prev)} />
            </Box>
            <Box sx={{ display: 'flex', flex: 1, backgroundColor: '#F6F4F4' }}>
                <SideBar open={sidebarOpen} toggleSidebar={() => setSidebarOpen((prev) => !prev)} />
                <Box
                    sx={{
                        flex: 1,
                        marginLeft: sidebarOpen && !isMobile ? `${drawerWidth}px` : 0,
                        padding: '2rem',
                    }}
                >
                    <ProfileForm />
                </Box>
            </Box>
        </Box>
    );
};

export default Compte;

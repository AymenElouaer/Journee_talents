import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Box, Paper, Button, Grid, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {useNavigate} from "react-router-dom";

const Actualites = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [dateFilter, setDateFilter] = useState('anytime');
    const [location, setLocation] = useState('');
    const [filteredJobs, setFilteredJobs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const cachedJobs = localStorage.getItem('jobs');

        if (cachedJobs) {
            setJobs(JSON.parse(cachedJobs));
            setFilteredJobs(JSON.parse(cachedJobs));
            setLoading(false);
        } else {
            const fetchJobs = async () => {
                const options = {
                    method: 'GET',
                    url: 'https://jobs-api14.p.rapidapi.com/v2/list',
                    params: {
                        query: 'Web Developer',
                        location: 'United States',
                        autoTranslateLocation: 'true',
                        remoteOnly: 'false',
                        employmentTypes: 'fulltime;parttime;intern;contractor',
                    },
                    headers: {
                        'x-rapidapi-key': '8de651c7b7mshf3e5ddbc7b4ac33p1f7f08jsn9c21843b31b0',
                        'x-rapidapi-host': 'jobs-api14.p.rapidapi.com',
                    },
                };

                try {
                    const response = await axios.request(options);
                    const jobData = response.data.jobs || [];
                    setJobs(jobData);
                    setFilteredJobs(jobData);
                    setLoading(false);
                    localStorage.setItem('jobs', JSON.stringify(jobData));
                } catch (error) {
                    console.error('Error fetching job data:', error);
                    setError('Failed to fetch job data');
                    setLoading(false);
                }
            };

            fetchJobs();
        }
    }, []);

    const handleSearch = () => {
        let filtered = jobs;

        if (dateFilter === 'pastmonth') {
            filtered = filtered.filter(job => {
                const jobDate = new Date(job.datePosted);
                return job.datePosted && jobDate > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
            });
        } else if (dateFilter === 'pastweek') {
            filtered = filtered.filter(job => {
                const jobDate = new Date(job.datePosted);
                return job.datePosted && jobDate > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
            });
        } else if (dateFilter === 'past24hours') {
            filtered = filtered.filter(job => {
                const jobDate = new Date(job.datePosted);
                return job.datePosted && jobDate > new Date(Date.now() - 24 * 60 * 60 * 1000);
            });
        }

        if (location) {
            filtered = filtered.filter(job =>
                job.location.toLowerCase().includes(location.toLowerCase())
            );
        }

        setFilteredJobs(filtered);
    };
    const handlePostulerClick = () => {
        navigate("/demands");
    }

    return (
        <div>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: '500', color: '#2E2E2E', textAlign: { xs: 'center', sm: 'left' } }}>
                Actualités
            </Typography>

            <Box
                sx={{
                    marginBottom: '1rem',
                    padding: '1rem',
                    backgroundColor: 'white',
                    '@media (max-width: 768px)': {
                        padding: '0.5rem', // Reduce padding for tablets
                    },
                    '@media (max-width: 480px)': {
                        padding: '0.2rem', // Reduce padding further for mobile
                    },
                }}
            >
                <Grid container spacing={2} alignItems="center">
                    {/* Date de Publication */}
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                            <InputLabel>Date de publication</InputLabel>
                            <Select
                                value={dateFilter}
                                onChange={(e) => setDateFilter(e.target.value)}
                                label="Date de publication"
                                sx={{ height: '5.5vh' }}
                            >
                                <MenuItem value="anytime">Any time</MenuItem>
                                <MenuItem value="pastmonth">Past month</MenuItem>
                                <MenuItem value="pastweek">Past week</MenuItem>
                                <MenuItem value="past24hours">Past 24 hours</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Lieu, Adresse */}
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Lieu, Adresse"
                            size="small"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </Grid>

                    {/* Rechercher Button */}
                    <Grid item xs={12} sm={4}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{
                                textTransform: 'none',
                                fontWeight: 'bold',
                                backgroundColor: '#002665',
                            }}
                            onClick={handleSearch}
                        >
                            Rechercher
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            {loading && <Typography variant="h6" sx={{ textAlign: 'center' }}>Loading jobs...</Typography>}
            {error && <Typography variant="h6" color="error" sx={{ textAlign: 'center' }}>{error}</Typography>}

            {!loading && !error && (
                <Grid container spacing={2}>
                    {filteredJobs.length > 0 ? (
                        filteredJobs.map((job, index) => (
                            <Grid item xs={12} key={index}>
                                <Paper
                                    sx={{
                                        padding: '1rem',
                                        borderRadius: '8px',
                                        boxShadow: 2,
                                        color: '#6D6D6D',
                                        marginRight: '1rem',
                                        '@media (max-width: 480px)': {
                                            padding: '0.5rem', // Adjust padding for mobile
                                        },
                                    }}
                                >
                                    <Typography
                                        variant="subtitle1"
                                        color="#6D6D6D"
                                        gutterBottom
                                        sx={{ textAlign: { xs: 'left', sm: 'left' } }}
                                    >
                                        {job.company}
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        gutterBottom
                                        sx={{ textAlign: { xs: 'left', sm: 'left' }, fontSize: { xs: '1rem', sm: '1.2rem' } }}
                                    >
                                        {job.title}
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                            color: '#6D6D6D',
                                            justifyContent: { xs: 'left', sm: 'flex-start' },
                                        }}
                                    >
                                        <LocationOnIcon fontSize="small" />
                                        <Typography variant="body2">
                                            {job.location || 'Adresse de l\'offre'}
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                            color: 'text.secondary',
                                            marginTop: '0.5rem',
                                            justifyContent: { xs: 'left', sm: 'flex-start' },
                                        }}
                                    >
                                        <AccessTimeIcon fontSize="small" />
                                        <Typography variant="body2">
                                            {job.datePosted || 'Date'}
                                        </Typography>
                                    </Box>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        href={job.applyLink}
                                        target="_blank"
                                        onClick={handlePostulerClick}
                                        sx={{
                                            textTransform: 'none',
                                            marginTop: '0.5rem',
                                            borderRadius: '8px',
                                            '&:hover': {
                                                backgroundColor: '#0056b3',
                                                color: 'white',
                                            },
                                            padding: '8px 16px',
                                            fontSize: '14px',
                                            color: '#002665',
                                            backgroundColor: '#ffffff',
                                        }}
                                    >
                                        Postuler
                                    </Button>
                                </Paper>
                            </Grid>
                        ))
                    ) : (
                        <Typography variant="body1" sx={{ textAlign: 'center' }}>No job listings available.</Typography>
                    )}
                </Grid>
            )}
        </div>
    );
};

export default Actualites;

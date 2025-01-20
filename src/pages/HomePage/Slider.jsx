import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import etudePic from '../../assets/images/etude.jpg';
import francePic from '../../assets/images/france.jpg';
import stagePic from '../../assets/images/stage.jpg';
import qatarPic from '../../assets/images/qatar.jpg';
import canadaPic from '../../assets/images/canada.jpg';

const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const images = [etudePic, francePic, stagePic, qatarPic, canadaPic];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
        }, 3000); // Change slide every 3 seconds
        return () => clearInterval(interval); // Cleanup on unmount
    }, [images.length]);

    return (
        <Box
            sx={{
                width: '80%',
                height: '500px',
                marginTop: '1rem',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: 'lightgray',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginBottom: '1rem',
                border: '2px solid #D9D9D9',
                borderRadius: '10px',
                '@media (max-width: 768px)': {
                    width: '90%', // Adjust width for tablets
                    height: '400px', // Adjust height for tablets
                    marginLeft: 'auto',
                    marginRight: 'auto',
                },
                '@media (max-width: 480px)': {
                    width: '100%', // Full-width on mobile
                    height: '230px', // Reduce height for smaller screens
                    margin: '0.5rem auto',
                    marginTop:'7rem'
                },
            }}
        >
            <Box
                component="img"
                src={images[currentSlide]}
                alt={`Slide ${currentSlide + 1}`}
                sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: {
                        xs: 'contain', // Ensure the entire image is visible on smaller screens
                        sm: 'cover', // Use cover for medium to large screens
                    },
                    transition: 'opacity 0.5s ease-in-out',
                }}
            />
            {/* Navigation Dots */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: '10px',
                }}
            >
                {images.map((_, index) => (
                    <Box
                        key={index}
                        sx={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            backgroundColor: currentSlide === index ? 'black' : 'lightgray',
                            cursor: 'pointer',
                        }}
                        onClick={() => setCurrentSlide(index)}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default Slider;

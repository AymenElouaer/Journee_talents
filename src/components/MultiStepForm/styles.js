const stepperStyles = {
    mainStepper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
        '& .MuiStepIcon-root': {
            color: '#D9D9D9',
            width: 40,
            height: 40,
        },
        '& .MuiStepIcon-text': {
            fill: 'white',
            fontSize: '18px',
        },
        '& .Mui-active .MuiStepIcon-root': {
            color: '#002665',
        },
        '& .Mui-completed .MuiStepIcon-root': {
            color: '#002665',
        },
        '& .MuiStepConnector-root': {
            top: '25%',
        },
        '& .MuiStepIcon-root:not(.Mui-completed):not(.Mui-active) .MuiStepIcon-text': {
            fill: '#002665',
        },
        '& .MuiStepLabel-label': {
            fontFamily: 'Arial, sans-serif',
            fontWeight: 700,
            color: '#919498',
        },
        '& .MuiStepLabel-label.Mui-active': {
            color: '#919498',
            fontWeight: 700,
        },
        '& .MuiStepLabel-label.Mui-completed': {
            color: '#002665',
            fontWeight: 700,
        },
        // Media Queries for small and medium devices
        '@media (max-width: 768px)': {
            '& .MuiStepIcon-root': {
                width: 25, // Reduce icon size on small screens
                height: 25,
            },
            '& .MuiStepIcon-text': {
                fontSize: '14px', // Reduce font size for step text
            },
            '& .MuiStepLabel-label': {
                fontSize: '10px', // Reduce label font size
            },
        },
    },
    subStepper: {
        margin: '0 auto',
        marginTop: '70px',
        '& .MuiStepIcon-root': {
            color: '#919498',
        },
        '& .MuiStepIcon-text': {
            display: 'none',
        },
        '& .MuiStepLabel-label': {
            fontFamily: 'Arial',
            fontSize: '14px',
            color: '#919498',
        },
        '& .Mui-active .MuiStepLabel-label': {
            color: '#002665',
            fontWeight: 700,
        },
        '& .Mui-active': {
            color: '#002665',
            fontWeight: 700,
        },
        '& .Mui-completed': {
            color: '#919498',
        },
        // Media Queries for small and medium devices
        '@media (max-width: 768px)': {
            '& .MuiStepIcon-root': {
                width: 25, // Reduce icon size for small screens
                height: 25,
            },
            '& .MuiStepLabel-label': {
                fontSize: '8px', // Reduce label font size for small screens
            },
        },
    },
};

const buttonStyles = {
    primaryButton: {
        mr: 1,
        marginTop: '50px',
        marginLeft: '20px',
        marginRight: '20px',
        marginBottom: '30px',
        borderRadius: '10px',
        backgroundColor: '#002665',
        color: '#FFFFFF',
        fontSize: '21px',
        fontWeight: '400',
        textTransform: 'none',
        fontFamily: "'Arial Rounded MT', sans-serif",
        padding: '12px 24px', // Default padding
        '@media (max-width: 768px)': {
            fontSize: '16px', // Smaller font size on small screens
            padding: '10px 20px', // Adjust padding on small screens
            marginLeft: '10px', // Adjust margins on smaller screens
            marginRight: '10px', // Adjust margins on smaller screens
        },
    },
    backButton: {
        mr: 1,
        marginTop: '30px',
        marginLeft: '20px',
        borderRadius: '10px',
        color: '#002665',
        padding: '16px',
        fontSize: '21px',
        fontWeight: '400',
        textTransform: 'none',
        fontFamily: "'Arial Rounded MT', sans-serif",
        '@media (max-width: 768px)': {
            fontSize: '16px', // Smaller font size on small screens
            padding: '10px 20px', // Adjust padding on small screens
            marginLeft: '10px', // Adjust margins on smaller screens
            marginRight: '10px', // Adjust margins on smaller screens
        },
        '&:hover': {
      filter: 'brightness(2)', // Increases the brightness to highlight it
    },
    },
};

// Outer box styles for layout adjustments
const outerBoxStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
    backgroundColor: '#f8f9fa',
    padding: '95px', // Adjust for larger screens
    width: '100%',
    boxSizing: 'border-box',
    '@media (max-width: 768px)': {
        padding: '20px', // Less padding on smaller screens
    },
};

const innerBoxStyles = {
    width: '800px',
    backgroundColor: '#ffffff',
    border: '1px solid #919498',
    borderRadius: '10px',
    padding: '30px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    boxSizing: 'border-box',
    '@media (max-width: 768px)': {
        width: '100%', // Full width on small screens
        padding: '15px', // Adjust padding
    },
};

const createAccount = {
    width: '300px',
    height: '34px',
    fontFamily: 'Arial, sans-serif',
    fontWeight: 700,
    lineHeight: '34.5px',
    textDecoration: 'none',
    color: '#002665',
    opacity: 1,
    fontSize: 'clamp(1.2rem, 2.5vw, 2rem)',
    textAlign: 'center',
    margin: '0 auto',
    padding: '10px',
    maxWidth: '100%',
    boxSizing: 'border-box',
    wordWrap: 'break-word',
    '@media (max-width: 768px)': {
        fontSize: 'clamp(1rem, 3vw, 1.5rem)', // Smaller font size on mobile
    },
};

export { stepperStyles, buttonStyles, createAccount, outerBoxStyles, innerBoxStyles };

import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Paper, Divider } from "@mui/material";
import Launch1 from "../../../assets/images/Launch1.jpeg";
import Launch2 from "../../../assets/images/Launch2.png";

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

const LaunchingPage = () => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (!timeLeft) {
        return (
            <Typography variant="h4" align="center">
                The countdown is over!
            </Typography>
        );
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundImage: `url(${Launch1})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                paddingLeft: "5%",
            }}
        >
            <Paper
                elevation={10}
                sx={{
                    padding: 4,
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    borderRadius: 3,
                    textAlign: "center",
                    width: "40%",
                    position: "relative",
                    minHeight: "90vh",
                }}
            >
                <Typography
                    variant="h3"
                    sx={{ color: "#255001", fontWeight: "bold", marginBottom: 2 }}
                >
                    Launching soon
                </Typography>
                <Typography
                    variant="h6"
                    sx={{ color: "#255001", marginBottom: 4, fontStyle: "italic" ,fontWeight:"700" }}
                >
                    Time left until launching
                </Typography>
                <Grid container spacing={4} justifyContent="center" alignItems="center">
                    {Object.entries(timeLeft).map(([unit, value]) => (
                        <Grid item key={unit}>
                            <Typography
                                sx={{
                                    fontSize: "4rem",
                                    color: "#D10303",
                                    fontWeight: "400",
                                }}
                            >
                                {value}
                            </Typography>
                            <Divider
                                sx={{
                                    backgroundColor: "#D10303",
                                    height: "2px",
                                    width: "100%",
                                    margin: "8px 0",
                                }}
                            />
                            <Typography
                                variant="h6"
                                sx={{
                                    color: "#D10303",
                                    fontSize: "1rem",
                                    fontWeight:"light",
                                }}
                            >
                                {unit.charAt(0).toUpperCase() + unit.slice(1)}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>

                <img
                    src={Launch2}
                    alt="Launch Background"
                    style={{
                        width: "50%",
                        position: "absolute",
                        bottom: "-30px",
                        left: "70%",
                        transform: "translateX(-50%)",
                    }}
                />
            </Paper>
        </Box>
    );
};

export default LaunchingPage;

import React, { useEffect, useState } from "react";
import {
    AppBar,
    Toolbar,
    Box,
    Snackbar,
    Alert,
    Typography,
    IconButton,
    Card,
    CardContent,
    Avatar,
    Fade
} from "@mui/material";
import { Info, Error, CheckCircle } from "@mui/icons-material";
import ProductDrawer from "../../components/productComponents/ProductDrawer";
import axios from 'axios';

export default function Deposit() {
    const [notifications, setNotifications] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const baseURL = "https://goldblue-backend-z2sk.vercel.app/api";

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const token = localStorage.getItem("jwt");
                const response = await axios.get(`${baseURL}/getNotifications`, {
                    headers: { "x-access-token": token }
                });
                setNotifications(response.data);
                if (response.data.length > 0) {
                    setSnackbarMessage("You have new notifications!");
                    setSnackbarSeverity("info");
                    setSnackbarOpen(true);
                }
            } catch (error) {
                console.error("Error fetching notifications:", error.response ? error.response.data : error.message);
                setSnackbarMessage("Failed to fetch notifications.");
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
            }
        };

        fetchNotifications();
    }, []);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const getIcon = (severity) => {
        switch (severity) {
            case "success":
                return <CheckCircle sx={{ color: 'var(--icon-color)' }} />;
            case "error":
                return <Error sx={{ color: 'var(--icon-color)' }} />;
            case "info":
                return <Info sx={{ color: 'var(--icon-color)' }} />;
            default:
                return <Info sx={{ color: 'var(--icon-color)' }} />;
        }
    };

    return (
        <Box>
            <AppBar position="static" sx={{ backgroundColor: 'var(--button-color)' }}>
                <Toolbar>
                    <ProductDrawer />
                    <Typography variant="h6" sx={{ flexGrow: 1, color: 'var(--primary-text-color)' }}>
                        Deposit
                    </Typography>
                </Toolbar>
            </AppBar>
            <Toolbar />
            <Box sx={{ padding: 2 }}>
                <Typography variant="h5" gutterBottom sx={{ color: 'var(--primary-text-color)' }}>
                    Your Notifications
                </Typography>
                {notifications.length === 0 ? (
                    <Typography sx={{ color: 'var(--primary-text-color)' }}>No new notifications</Typography>
                ) : (
                    notifications.map((notification) => (
                        <Fade in key={notification.id} timeout={500}>
                            <Card sx={{
                                marginBottom: 2,
                                display: 'flex',
                                alignItems: 'center',
                                boxShadow: 3,
                                backgroundColor: 'var(--card-background-color)',
                                color: 'var(--primary-text-color)'
                            }}>
                                <Avatar sx={{ backgroundColor: 'var(--button-color)', margin: 2 }}>
                                    {getIcon(notification.severity)}
                                </Avatar>
                                <CardContent>
                                    <Typography variant="body1">
                                        {notification.message}
                                    </Typography>
                                    <Typography variant="caption" color="textSecondary">
                                        {new Date(notification.created_at).toLocaleString()}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Fade>
                    ))
                )}
            </Box>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbarSeverity}
                    icon={getIcon(snackbarSeverity)}
                    sx={{ backgroundColor: 'var(--modal-color)', color: 'var(--primary-text-color)', boxShadow: 3 }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}

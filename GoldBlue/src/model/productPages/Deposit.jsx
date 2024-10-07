import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Card,
    CardContent,
    Typography,
    Box,
    IconButton,
    Tooltip,
    Button,
    TextField
} from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ProductDrawer from "../../components/productComponents/ProductDrawer";
import { QRCodeSVG } from 'qrcode.react';
import withUserData from '../../components/UserData';
import { deposit } from '../../services/Axios'; // Import the deposit function
import Modal from "../../components/Modal";


import supabaseClient from "../../services/SupaBaseClient";

const Deposit = () => {
    const bankNumber = "0165 0397 8973"; // Placeholder Tron wallet address
    const [copied, setCopied] = useState(false);
    const [image, setImage] = useState(null);
    const [amount, setAmount] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false); // State for modal visibility
    const [modalTitle, setModalTitle] = useState(""); // Title for modal
    const [modalContent, setModalContent] = useState(""); // Content for modal

    

    

    const handleCopyAccount = () => {
        navigator.clipboard.writeText(bankNumber);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleImageUpload = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsUploading(true);
    
        if (!image || !amount) {
            setModalTitle("Error");
            setModalContent("Please upload an image and enter an amount.");
            setModalOpen(true);
            setIsUploading(false);
            return;
        }
    
        try {
            // Ensure user is authenticated
            const { user } = supabaseClient.auth;
    
            if (!user) {
                throw new Error("User is not authenticated.");
            }
    
            // Upload image to Supabase
            const { data, error } = await supabaseClient.storage
                .from('deposits')
                .upload(`deposit-${Date.now()}`, image, {returning: 'minimal'});
    
            if (error) {
                console.error("Supabase upload error:", error);
                throw error;
            }
    
            const imageUrl = supabaseClient.storage
                .from('deposits')
                .getPublicUrl(data.path).publicURL;
    
            // Call deposit service with the image URL and amount
            const result = await deposit(imageUrl, amount);
    
            if (result.success) {
                setModalTitle("Success");
                setModalContent("Deposit confirmation submitted successfully.");
            } else {
                setModalTitle("Error");
                setModalContent("Deposit submission failed.");
            }
        } catch (error) {
            console.error("Error during submission:", error);
            setModalTitle("Error");
            setModalContent("An error occurred while submitting your deposit.");
        } finally {
            setModalOpen(true);
            setIsUploading(false);
        }
    };
    

    const handleCloseModal = () => {
        setModalOpen(false); // Close the modal
    };

    return (
        <Box sx={{ maxWidth: 400, mx: "auto", p: 3, mt: 5 }}>
            <AppBar>
                <Toolbar>
                    <ProductDrawer />
                </Toolbar>
            </AppBar>
            <Toolbar />

            {/* Deposit Card */}
            <Card className="deposit-card" sx={{ mt: 2, p: 3 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Deposit via Tron (TRX)
                    </Typography>

                    {/* TRON Wallet Address */}
                    <Typography variant="body1" sx={{ mt: 2 }}>
                        Send amount to the following GOTYME account: <Typography  component="strong" sx={{ fontWeight: 'bold' }} >Eufemia Lim</Typography>
                    </Typography>
                    <Box
                        sx={{
                            mt: 2,
                            p: 2,
                            border: "1px solid var(--input-border-color)",
                            borderRadius: "8px",
                            wordBreak: "break-all",
                            textAlign: "center",
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        {bankNumber}

                        {/* Copy Icon */}
                        <Tooltip title={copied ? "Copied!" : "Copy to clipboard"}>
                            <IconButton onClick={handleCopyAccount} sx={{ ml: 1, color: "var(--icon-color)" }}>
                                <ContentCopyIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>

                    {/* QR Code for Tron Wallet */}
                    <Box sx={{ textAlign: "center", mt: 3 }}>
                        <QRCodeSVG value={bankNumber} size={180} />
                        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                            Scan to copy the GOTYME account
                        </Typography>
                    </Box>

                    {/* Deposit Amount */}
                    <TextField
                        label="Enter Amount you have deposited"
                        variant="outlined"
                        fullWidth
                        sx={{ mt: 3, color: "var(--primary-text-color)" }}
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />

                    {/* Image Uploader with Preview */}
                    <Box sx={{ mt: 3 }}>
                        <Typography variant="body1">Upload Deposit Confirmation:</Typography>
                        <input type="file" onChange={handleImageUpload} />

                        {image && (
                            <Box sx={{ mt: 2, textAlign: "center" }}>
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt="Uploaded preview"
                                    style={{ maxWidth: '100%', maxHeight: '200px' }}
                                />
                            </Box>
                        )}
                    </Box>

                    {/* Submit Button */}
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3 }}
                        onClick={handleSubmit}
                        disabled={isUploading}
                    >
                        {isUploading ? "Submitting..." : "Confirm Deposit"}
                    </Button>
                </CardContent>
            </Card>

            {/* Modal for Feedback */}
            <Modal 
                open={modalOpen} 
                handleClose={handleCloseModal} 
                title={modalTitle} 
                content={modalContent} 
                onConfirm={handleCloseModal} 
            />
        </Box>
    );
};

export default withUserData(Deposit);

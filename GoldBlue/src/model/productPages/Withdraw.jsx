import React, { useState } from "react";
import ProductDrawer from "../../components/productComponents/ProductDrawer";
import {
    AppBar,
    Toolbar,
    Card,
    CardContent,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Button,
    Box,
} from "@mui/material";
import "../../App.css";
import withUserData from '../../components/UserData';

const Withdraw = () => {
    const [method, setMethod] = useState("");
    const [amount, setAmount] = useState("");
    const [walletKey, setWalletKey] = useState(""); // New state for wallet key
    const [accountName, setAccountName] = useState(""); // New state for account name
    const [accountNumber, setAccountNumber] = useState(""); // New state for account number

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ensure all fields are filled before submitting
        if (!method || !amount || (method !== "trx" && (!accountName || !accountNumber))) {
            alert("Please fill out all fields before submitting.");
            return;
        }

        // Prepare the data to send to the backend
        const data = {
            method,
            amount: parseFloat(amount),  // Convert the amount to a number
            ...(method === "trx" ? { walletKey } : { accountName, accountNumber }) // Include walletKey or account info based on method
        };

        try {
            const response = await fetch("http://localhost:5000/withdraw", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert("Withdrawal request submitted!");
                // Clear form fields after successful submission
                setMethod("");
                setAmount("");
                setWalletKey(""); // Clear wallet key field
                setAccountName("");  // Clear account name field
                setAccountNumber("");  // Clear account number field
            } else {
                alert("Failed to submit the withdrawal request.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("There was an error submitting your request.");
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: "auto", mt: 10, p: 3 }}>
            <AppBar>
                <Toolbar>
                    <ProductDrawer />
                </Toolbar>
            </AppBar>
            <Toolbar />

            <Card className="withdraw-page" sx={{ mt: 2, p: 3 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Withdraw Funds
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        {/* Payment Method */}
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="method-label" sx={{ color: "var(--primary-text-color)" }}>
                                Select Payment Method
                            </InputLabel>
                            <Select
                                labelId="method-label"
                                id="method"
                                value={method}
                                onChange={(e) => setMethod(e.target.value)}
                                required
                                label="Select Payment Method"
                                sx={{
                                    color: "var(--select-text-color)", // Set dropdown text color
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "var(--input-border-color)", // Set border color
                                    },
                                    "&:hover .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "var(--input-border-color)", // Set border color on hover
                                    },
                                }}
                            >
                                <MenuItem value="gcash">GCash</MenuItem>
                                <MenuItem value="gotyme">GoTyme</MenuItem>
                                <MenuItem value="trx">TRX</MenuItem> {/* Added TRX option */}
                            </Select>
                        </FormControl>

                        {method === "trx" ? (
                            // Wallet Key Input for TRX
                            <TextField
                                label="Wallet Key"
                                value={walletKey}
                                onChange={(e) => setWalletKey(e.target.value)}
                                required
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                inputProps={{
                                    style: { color: "var(--input-text-color)" }, // Set input text color
                                }}
                                InputLabelProps={{
                                    style: { color: "var(--primary-text-color)" }, // Set label color
                                }}
                                sx={{
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "var(--input-border-color)", // Set border color
                                    },
                                    "&:hover .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "var(--input-border-color)", // Set border color on hover
                                    },
                                }}
                            />
                        ) : (
                            <>
                                {/* Account Name for other payment methods */}
                                <TextField
                                    label="Account Name"
                                    value={accountName}
                                    onChange={(e) => setAccountName(e.target.value)}
                                    required
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    inputProps={{
                                        style: { color: "var(--input-text-color)" }, // Set input text color
                                    }}
                                    InputLabelProps={{
                                        style: { color: "var(--primary-text-color)" }, // Set label color
                                    }}
                                    sx={{
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "var(--input-border-color)", // Set border color
                                        },
                                        "&:hover .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "var(--input-border-color)", // Set border color on hover
                                        },
                                    }}
                                />

                                {/* Account Number for other payment methods */}
                                <TextField
                                    label="Account Number"
                                    value={accountNumber}
                                    onChange={(e) => setAccountNumber(e.target.value)}
                                    required
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    inputProps={{
                                        style: { color: "var(--input-text-color)" }, // Set input text color
                                    }}
                                    InputLabelProps={{
                                        style: { color: "var(--primary-text-color)" }, // Set label color
                                    }}
                                    sx={{
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "var(--input-border-color)", // Set border color
                                        },
                                        "&:hover .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "var(--input-border-color)", // Set border color on hover
                                        },
                                    }}
                                />
                            </>
                        )}

                        {/* Amount */}
                        <TextField
                            label="Amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            inputProps={{
                                style: { color: "var(--input-text-color)" }, // Set input text color
                            }}
                            InputLabelProps={{
                                style: { color: "var(--primary-text-color)" }, // Set label color
                            }}
                            sx={{
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "var(--input-border-color)", // Set border color
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "var(--input-border-color)", // Set border color on hover
                                },
                            }}
                        />

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Withdraw
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
};

export default withUserData(Withdraw);

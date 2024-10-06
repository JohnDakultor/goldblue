import React, { useEffect, useState } from "react";
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
    Snackbar,
} from "@mui/material";
import axios from "axios";
import ProductDrawer from "../../components/productComponents/ProductDrawer";
import withUserData from '../../components/UserData';

const countries = [
    { name: "Philippines", code: "+63" },
    { name: "United States", code: "+1" },
    { name: "Australia", code: "+61" },
    // Add other countries as needed
];

const Withdraw = () => {
    const [method, setMethod] = useState("");
    const [amount, setAmount] = useState("");
    const [walletKey, setWalletKey] = useState("");
    const [accountName, setAccountName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [totalDeposits, setTotalDeposits] = useState(0);
    const [accumulation, setAccumulation] = useState(() => {
        // Initialize accumulation from local storage if available
        return parseFloat(localStorage.getItem("accumulation")) || 0;
    });
    const [withdrawalMessage, setWithdrawalMessage] = useState("");
    const [isAccumulationSent, setIsAccumulationSent] = useState(false);
    const [lastTotalDeposits, setLastTotalDeposits] = useState(() => {
        return parseFloat(localStorage.getItem("lastTotalDeposits")) || 0;
    });

    

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const depositsResponse = await axios.get("http://localhost:3001/api/transactions", {
                    headers: { "x-access-token": localStorage.getItem("jwt") },
                });

                const totalDeposited = depositsResponse.data.reduce((sum, deposit) => {
                    const amount = parseFloat(deposit.amount);
                    return isNaN(amount) ? sum : sum + amount;
                }, 0);

                setTotalDeposits(totalDeposited);

                // Check the last processed total deposits from the server
                const lastProcessedTotalResponse = await axios.get("http://localhost:3001/api/lastProcessedTotal", {
                    headers: { "x-access-token": localStorage.getItem("jwt") },
                });

                const lastProcessedTotal = lastProcessedTotalResponse.data.lastProcessedTotal;

                // Only send accumulation if the total deposited has changed
                if (totalDeposited !== lastProcessedTotal) {
                    await sendAccumulation(totalDeposited);
                    setLastTotalDeposits(totalDeposited); // Update last total deposits
                    localStorage.setItem("lastTotalDeposits", totalDeposited); // Store it in localStorage
                }
            } catch (error) {
                console.error("Error fetching deposits:", error);
                setErrorMessage("Error fetching deposits");
            }
        };

        fetchInitialData();
        fetchAccumulation(); // Fetch accumulation on mount

        // Interval to fetch accumulated value every minute
        const interval = setInterval(() => {
            fetchAccumulation();
        }, 24 * 60 * 60 * 1000); //60000 = 1 minute for testing

        return () => clearInterval(interval);
    }, [lastTotalDeposits]); // No need for dependencies; we check lastTotalDeposits inside

    const sendAccumulation = async (totalDeposits) => {
        try {
            await axios.post("http://localhost:3001/api/accumulation", {
                amount: totalDeposits,
            }, {
                headers: { "x-access-token": localStorage.getItem("jwt") },
            });
        } catch (error) {
            console.error("Error sending accumulation:", error);
            setErrorMessage("Error sending accumulation");
        }
    };

    const fetchAccumulation = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/accumulation", {
                headers: { "x-access-token": localStorage.getItem("jwt") },
            });
            setAccumulation(response.data.accumulation);
            localStorage.setItem("accumulation", response.data.accumulation); // Store in local storage
        } catch (error) {
            console.error("Error fetching accumulation:", error);
            setErrorMessage("Error fetching accumulation");
        }
    };

    useEffect(() => {
        const currentDay = new Date().getDay();
        if (currentDay === 0 || currentDay === 6) {
            setWithdrawalMessage("");
        } else {
            setWithdrawalMessage("Unable to withdraw. Withdrawable days are Friday and Saturday.");
        }
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        if (!method || !amount || (method !== "trx" && (!accountName || !accountNumber))) {
            setErrorMessage("Please fill out all fields before submitting.");
            setLoading(false);
            return;
        }
    
        if (amount <= 0) {
            setErrorMessage("Amount must be greater than zero.");
            setLoading(false);
            return;
        }
    
        if (parseFloat(amount) > accumulation) {
            setErrorMessage("Amount exceeds your withdrawable balance.");
            setLoading(false);
            return;
        }
    
        try {
            // Step 1: Call the withdrawal API that updates the database
            const dbResponse = await axios.post("http://localhost:3001/api/withdraw", {
                method,
                amount: parseFloat(amount),
                ...(method === "trx" ? { walletKey, accountName } : { accountName, accountNumber }),
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": localStorage.getItem("jwt"),
                },
            });
    
            // Immediately deduct from accumulation without waiting for dbResponse
            const accumulationResponse = await axios.post("http://localhost:3001/api/accumulation/withdraw", {
                amount: parseFloat(amount),
            }, {
                headers: {
                    "x-access-token": localStorage.getItem("jwt"),
                },
            });
    
            if (dbResponse.status === 200) {
                setSuccessMessage("Withdrawal request submitted!");
                setAmount("");
                setAccountName("");
                setAccountNumber("");
                setWalletKey("");
                setMethod("");
                setSelectedCountry("");
    
                // Update the accumulation value from the response
                const newAccumulation = accumulationResponse.data.newAccumulation; 
                setAccumulation(newAccumulation);
                localStorage.setItem("accumulation", newAccumulation);
            } else {
                setErrorMessage("Error processing withdrawal.");
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage("There was an error submitting your request.");
        } finally {
            setLoading(false);
        }
    };
    
    

    const handleCloseSnackbar = () => {
        setErrorMessage("");
        setSuccessMessage("");
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

                    <Typography variant="h6">Total Deposits: ${totalDeposits ? totalDeposits.toFixed(2) : '0.00'}</Typography>
                    <Typography variant="h6">Withdrawable Interest: ${accumulation ? accumulation.toFixed(2) : '0.00'}</Typography>

                    <form onSubmit={handleSubmit}>
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="method-label" sx={{ color: "var(--primary-text-color)" }}>
                                Select Payment Method
                            </InputLabel>
                            <Select
                                labelId="method-label"
                                id="method"
                                value={method}
                                onChange={(e) => {
                                    setMethod(e.target.value);
                                    if (e.target.value !== "gcash") {
                                        setSelectedCountry("");
                                    }
                                }}
                                required
                                label="Select Payment Method"
                                sx={{
                                    color: "var(--select-text-color)",
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "var(--input-border-color)",
                                    },
                                    "&:hover .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "var(--input-border-color)",
                                    },
                                }}
                            >
                                <MenuItem value="gcash">GCash</MenuItem>
                                <MenuItem value="gotyme">GoTyme</MenuItem>
                                <MenuItem value="trx">TRX</MenuItem>
                            </Select>
                        </FormControl>

                        {method === "trx" && (
                            <>
                                <TextField
                                    label="Wallet Key"
                                    variant="outlined"
                                    value={walletKey}
                                    onChange={(e) => setWalletKey(e.target.value)}
                                    required
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Account Name"
                                    variant="outlined"
                                    value={accountName}
                                    onChange={(e) => setAccountName(e.target.value)}
                                    required
                                    fullWidth
                                    margin="normal"
                                />
                            </>
                        )}

                        {method === "gotyme" && (
                            <>
                                <TextField
                                    label="Account Name"
                                    variant="outlined"
                                    value={accountName}
                                    onChange={(e) => setAccountName(e.target.value)}
                                    required
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Account Number"
                                    variant="outlined"
                                    value={accountNumber}
                                    onChange={(e) => setAccountNumber(e.target.value)}
                                    required
                                    fullWidth
                                    margin="normal"
                                />
                            </>
                        )}

                        {method === "gcash" && (
                            <>
                                <FormControl fullWidth margin="normal">
                                    <InputLabel id="country-label" sx={{ color: "var(--primary-text-color)" }}>
                                        Country
                                    </InputLabel>
                                    <Select
                                        labelId="country-label"
                                        value={selectedCountry}
                                        onChange={(event) => {
                                            setSelectedCountry(event.target.value);
                                            const countryCode = countries.find(country => country.name === event.target.value)?.code;
                                            setAccountNumber(countryCode || ""); // Set to default country code
                                        }}
                                        required
                                        sx={{
                                            color: "var(--select-text-color)",
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "var(--input-border-color)",
                                            },
                                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "var(--input-border-color)",
                                            },
                                        }}
                                    >
                                        {countries.map((country) => (
                                            <MenuItem key={country.code} value={country.name}>
                                                {country.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <TextField
                                    label="Account Name"
                                    variant="outlined"
                                    value={accountName}
                                    onChange={(e) => setAccountName(e.target.value)}
                                    required
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Account Number"
                                    variant="outlined"
                                    value={accountNumber}
                                    onChange={(e) => setAccountNumber(e.target.value)}
                                    required
                                    fullWidth
                                    margin="normal"
                                />
                            </>
                        )}

                        <TextField
                            label="Amount"
                            variant="outlined"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                            fullWidth
                            margin="normal"
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2 }}
                            disabled={loading || withdrawalMessage !== ""}
                        >
                            {loading ? "Processing..." : "Withdraw"}
                        </Button>

                        {withdrawalMessage && (
                            <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                                {withdrawalMessage}
                            </Typography>
                        )}
                    </form>
                    <Snackbar
                        open={!!successMessage}
                        autoHideDuration={6000}
                        onClose={handleCloseSnackbar}
                        message={successMessage}
                    />

                    <Snackbar
                        open={!!errorMessage}
                        autoHideDuration={6000}
                        onClose={handleCloseSnackbar}
                        message={errorMessage}
                    />

                </CardContent>
            </Card>
        </Box>
    );
};

export default withUserData(Withdraw);

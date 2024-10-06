import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import axios from "axios";

const Balance = ({ accumulation, onBalanceChange }) => {
    const [lastUpdateTime, setLastUpdateTime] = useState(Date.now());
    const [depositedBalance, setDepositedBalance] = useState(0);
    const accumulationRate = 0.015; // 1.5% per minute

    useEffect(() => {
        const fetchDeposits = async () => {
            try {
                const depositsResponse = await axios.get("http://localhost:3001/api/transactions", {
                    headers: { "x-access-token": localStorage.getItem("jwt") },
                });
                const deposits = depositsResponse.data;
                const confirmedDeposit = deposits.find(deposit => deposit.status === "confirmed");

                if (confirmedDeposit) {
                    setDepositedBalance(confirmedDeposit.amount);
                }
            } catch (error) {
                console.error("Error fetching deposits:", error);
            }
        };

        fetchDeposits();
    }, []);

    // Accumulation logic
    useEffect(() => {
        const intervalId = setInterval(() => {
            const currentTime = Date.now();
            const timeElapsedInMinutes = (currentTime - lastUpdateTime) / 60000;

            if (timeElapsedInMinutes >= 1 && depositedBalance > 0) {
                const newAccumulation = accumulation + (depositedBalance * accumulationRate * timeElapsedInMinutes);
                onBalanceChange(newAccumulation); // Update accumulation
                setLastUpdateTime(currentTime); // Update last update time
            }
        }, 60000); // Check every minute

        return () => clearInterval(intervalId);
    }, [accumulation, depositedBalance, lastUpdateTime, onBalanceChange]);

    // Persist accumulation when it updates
    useEffect(() => {
        const persistAccumulation = async () => {
            try {
                await axios.post(
                    "http://localhost:3001/api/accumulation",
                    { accumulation, lastUpdate: Date.now() },
                    { headers: { "x-access-token": localStorage.getItem("jwt") } }
                );
            } catch (error) {
                console.error("Error persisting accumulation:", error);
            }
        };

        if (accumulation > 0) {
            persistAccumulation(); // Save new accumulation data to server
        }
    }, [accumulation]);

    return (
        <Box>
            <Typography variant="h4">Accumulation</Typography>
            <Typography variant="h6">Withdrawable Balance: ${accumulation.toFixed(2)}</Typography>
        </Box>
    );
};

export default Balance;

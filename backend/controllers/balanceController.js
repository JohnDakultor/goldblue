import jwt from 'jsonwebtoken'; // Import jwt if not already imported
import { BalanceService } from '../services/balanceService.js';

class balanceController {
    // Get the user's balance
    static getBalance = async (req, res) => {
        const token = req.headers['x-access-token'];
        if (!token) {
            return res.status(403).json({ message: 'No token provided' });
        }
    
        try {
            const decoded = jwt.verify(token, process.env.JWT_KEY); // Ensure you're using the correct key
            const userId = decoded.id;  // Assuming you have user ID from JWT
            console.log("User ID from token:", userId); // Log the user ID for debugging
            const balance = await BalanceService.getBalanceByUserId(userId);
            res.status(200).json(balance);
        } catch (error) {
            console.error("Error fetching balance:", error); // Log the error for debugging
            res.status(500).json({ message: 'Error fetching balance', error: error.message });
        }
    };
    

    // Update balance and accumulation for the user
    static updateBalance = async (req, res) => {
        const token = req.headers['x-access-token'];
        if (!token) {
            return res.status(403).json({ message: 'No token provided' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_KEY); // Replace with your secret
            const userId = decoded.id; // Get user ID from token
            const deposits = req.body.deposits || []; // Deposits passed from the request
            const withdrawals = req.body.withdrawals || []; // Withdrawals passed from the request

            const updatedBalance = await BalanceService.updateBalance(userId, deposits, withdrawals);
            res.status(200).json(updatedBalance);
        } catch (error) {
            res.status(500).json({ message: 'Error updating balance', error: error.message });
        }
    };

    // Create a balance for a new user
    static createBalance = async (req, res) => {
        try {
            const userId = req.body.user_id; // Assuming the request provides user ID
            const newBalance = await BalanceService.createBalanceForUser(userId);
            res.status(201).json(newBalance);
        } catch (error) {
            res.status(500).json({ message: 'Error creating balance', error: error.message });
        }
    }
    static calculateDailyAccumulation = async (req, res) => {
        const token = req.headers['x-access-token'];
        if (!token) {
            return res.status(403).json({ message: 'No token provided' });
        }
    
        try {
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            const userId = decoded.id;
            const updatedBalance = await BalanceService.calculateDailyAccumulation(userId);
            res.status(200).json(updatedBalance);
        } catch (error) {
            res.status(500).json({ message: 'Error calculating daily accumulation', error: error.message });
        }
    };
}



export { balanceController };

// controllers/accumulationController.js
import { AccumulationService } from "../services/accumulationService.js";

class AccumulationController {
    static getAccumulation = async (req, res) => {
        try {
            const userId = req.userId;
            if (!userId) {
                return res.status(400).json({ message: "User ID is missing" });
            }
            const accumulationData = await AccumulationService.getAccumulationByUserId(userId);
            res.json(accumulationData);
        } catch (error) {
            console.error("Error in getAccumulation:", error);
            res.status(500).json({ message: "Failed to retrieve accumulation data" });
        }
    };

    static updateAccumulation = async (req, res) => {
        try {
            const userId = req.userId;
            if (!userId) {
                return res.status(400).json({ message: "User ID is missing" });
            }
    
            const { amount } = req.body;
            if (typeof amount !== 'number' || isNaN(amount)) {
                return res.status(400).json({ message: "Invalid amount" });
            }
    
            // Check if the amount has already been processed
            const lastProcessedDeposit = AccumulationService.getLastProcessedDeposit(userId);
            if (lastProcessedDeposit === amount) {
                return res.status(200).json({ message: "This amount has already been processed." });
            }
    
            const currentAccumulation = await AccumulationService.getAccumulationByUserId(userId);
            const newAccumulation = currentAccumulation.accumulation + amount;
    
            await AccumulationService.updateAccumulationByUserId(userId, newAccumulation);
            AccumulationService.updateLastProcessedDeposit(userId, amount); // Update in-memory store
    
            res.status(200).json({ accumulation: newAccumulation });
        } catch (error) {
            console.error('Error updating accumulation:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }
    

    static withdrawAccumulation = async (req, res) => {
        try {
            const userId = req.userId; // Get user ID from the request
            const { amount } = req.body; // Get withdrawal amount from the request
    
            // Call the service to deduct accumulation
            const newAccumulation = await AccumulationService.deductAccumulationByUserId(userId, amount);
    
            // Respond with the new accumulation
            res.status(200).json({ message: "Accumulation updated successfully", newAccumulation });
        } catch (error) {
            console.error("Error updating accumulation:", error);
            res.status(500).json({ message: "Failed to update accumulation" });
        }
    };

    static getLastProcessedTotal = async (req, res) => {
        try {
            const userId = req.userId;
            const lastTotal = AccumulationService.getLastProcessedDeposit(userId);
            res.json({ lastProcessedTotal: lastTotal });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    };
    
    
}

export { AccumulationController };

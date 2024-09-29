import { TransactionService } from '../services/transactionService.js';

class TransactionController {
  static deposit = async (req, res) => {
    console.log('Deposit request:', req.body);
    try {
      const result = await TransactionService.deposit(req);
      res.status(200).json(result);
    } catch (error) {
      console.error('Error in deposit controller:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  };

  static getTransactions = async (req, res) => {
    const userId = req.userId; // Assume userId is set in the request from your JWT middleware

    try {
        const transactions = await TransactionService.getTransactionsByUserId(userId);
        return res.status(200).json(transactions); // Return transactions as JSON
    } catch (error) {
        console.error("Error in getTransactions controller:", error);
        return res.status(500).json({ message: error.message });
    }
};
}

export { TransactionController };

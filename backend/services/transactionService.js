import Transaction from "../models/transactionModel.js";

class TransactionService {
    static deposit = async (req) => {
        const { amount } = req.body;
        const imagePath = req.file.path; // Ensure this is set correctly
        const userId = req.userId; // User ID should be set by your JWT verification

        // Validate required fields
        if (!userId || !amount || !imagePath) {
            throw new Error("All fields are required.");
        }

        try {
            const newTransaction = await new Transaction({
                user_id: userId,
                amount: amount,
                image_path: imagePath,
                status: 'pending', // Set initial status
                created_at: new Date() // Make sure to add created_at
            }).save(); // Use Bookshelf's save method

            return { success: true, depositId: newTransaction.id };
        } catch (error) {
            console.error('Error inserting deposit:', error);
            throw new Error('Database error');
        }
    };

    static getTransactionsByUserId = async (userId) => {
        try {
            // Fetch transactions for the specified user ID
            const transactions = await Transaction.where({ user_id: userId }).fetchAll();
            return transactions.toJSON(); // Return the transactions
        } catch (error) {
            console.error("Error fetching transactions:", error);
            throw new Error("Database error while fetching transactions.");
        }
    };
}


export { TransactionService };

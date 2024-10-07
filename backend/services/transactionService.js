// import TransactionWithdraw from "../models/transactionWithdrawModel.js";
// import { bookshelfInstance } from "../config/dbConfig.js";
// import Transaction from "../models/transactionModel.js";
// import { createBookshelfModel } from "../models/userModel.js";
// import { NotificationService } from "./notificationService.js";

// class TransactionService {
//   static deposit = async (req) => {
//     const { amount } = req.body;
//     const imagePath = req.file.path; // Ensure this is set correctly
//     const userId = req.userId; // User ID should be set by your JWT verification

//     // Validate required fields
//     if (!userId || !amount || !imagePath) {
//       throw new Error("All fields are required.");
//     }

//     try {
//       const newTransaction = await new Transaction({
//         user_id: userId,
//         amount: amount,
//         image_path: imagePath,
//         status: "pending", // Set initial status
//         created_at: new Date(), // Make sure to add created_at
//       }).save(); // Use Bookshelf's save method

//       return { success: true, depositId: newTransaction.id };
//     } catch (error) {
//       console.error("Error inserting deposit:", error);
//       throw new Error("Database error");
//     }
//   };

//   static getTransactionsByUserId = async (userId) => {
//     try {
//       // Fetch transactions for the specified user ID
//       const transactions = await Transaction.where({
//         user_id: userId,
//       }).fetchAll();
//       return transactions.toJSON(); // Return the transactions
//     } catch (error) {
//       console.error("Error fetching transactions:", error);
//       throw new Error("Database error while fetching transactions.");
//     }
//   };

//   static confirmDeposit = async (transactionId) => {
//     try {
//       const transaction = await Transaction.where({
//         id: transactionId,
//       }).fetch();

//       if (!transaction) {
//         throw new Error("Transaction not found.");
//       }

//       // Update the status to 'confirmed'
//       await transaction.save({ status: "confirmed" }, { patch: true });

//       return { success: true, message: "Transaction confirmed." };
//     } catch (error) {
//       console.error("Error confirming transaction:", error);
//       throw new Error("Database error while confirming transaction.");
//     }
//   };

//   static getAllTransactions = async () => {
//     try {
//       const transactions = await Transaction.fetchAll(); // Fetch all transactions
//       return transactions.toJSON();
//     } catch (error) {
//       console.error("Error fetching all transactions:", error);
//       throw new Error("Database error while fetching all transactions.");
//     }
//   };

//   static withdraw = async (data) => {
//     const { user_id, method, accountName, accountNumber, walletKey, amount } = data;

//     try {
//       // Insert withdrawal data into transaction_withdraw using the model
//       const newWithdraw = await new TransactionWithdraw({
//         user_id,
//         method,
//         account_name: accountName,
//         account_number: accountNumber,
//         wallet_key: walletKey,
//         amount,
//         date: new Date(), // Set date to current timestamp
//       }).save();

//       // Fetch user's firstname and lastname from user_accounts table
//     //   const user = await bookshelfInstance
//     //     .model('UserAccount') // Assuming you have a UserAccount model
//     //     .where({ id: user_id })
//     //     .fetch();
//     await NotificationService.createNotification(user_id, `Your withdrawal of $${amount} has been processed.`);

//       const user = createBookshelfModel("user_accounts");
//       const userAccount = await new user({ id: user_id }).fetch();
//       if (!user) {
//         throw new Error("User not found");
//       }

//       const { firstname, lastname } = userAccount.toJSON();

//       return { ...newWithdraw.toJSON(), firstname, lastname }; // Return with firstname and lastname
//     } catch (error) {
//       console.error("Error during withdrawal:", error);
//       throw error;
//     }
//   };
// }

// export { TransactionService };

// import TransactionWithdraw from "../models/transactionWithdrawModel.js";
// import { bookshelfInstance } from "../config/dbConfig.js";
// import Transaction from "../models/transactionModel.js";
// import { createBookshelfModel } from "../models/userModel.js";
// import { NotificationService } from "./notificationService.js";

// class TransactionService {
//   static deposit = async (req) => {
//     const { amount } = req.body;
//     const imagePath = req.file.path; // Ensure this is set correctly
//     const userId = req.userId; // User ID should be set by your JWT verification

//     // Validate required fields
//     if (!userId || !amount || !imagePath) {
//       throw new Error("All fields are required.");
//     }

//     try {
//       const newTransaction = await new Transaction({
//         user_id: userId,
//         amount: amount,
//         image_path: imagePath,
//         status: "pending", // Set initial status
//         created_at: new Date(), // Make sure to add created_at
//       }).save(); // Use Bookshelf's save method

//       return { success: true, depositId: newTransaction.id };
//     } catch (error) {
//       console.error("Error inserting deposit:", error);
//       throw new Error("Database error");
//     }
//   };

//   static getTransactionsByUserId = async (userId) => {
//     try {
//       // Fetch transactions for the specified user ID
//       const transactions = await Transaction.where({
//         user_id: userId,
//       }).fetchAll();
//       return transactions.toJSON(); // Return the transactions
//     } catch (error) {
//       console.error("Error fetching transactions:", error);
//       throw new Error("Database error while fetching transactions.");
//     }
//   };

//   // New method to fetch a transaction by ID
//   static getTransactionById = async (transactionId) => {
//     try {
//       const transaction = await Transaction.where({ id: transactionId }).fetch();
//       return transaction; // Returns the transaction model
//     } catch (error) {
//       console.error("Error fetching transaction by ID:", error);
//       throw new Error("Database error while fetching transaction by ID.");
//     }
//   };

//   static confirmDeposit = async (transactionId) => {
//     try {
//       const transaction = await Transaction.where({
//         id: transactionId,
//       }).fetch();

//       if (!transaction) {
//         throw new Error("Transaction not found.");
//       }

//       // Update the status to 'confirmed'
//       await transaction.save({ status: "confirmed" }, { patch: true });

//       await NotificationService.createNotification(id, `Your withdrawal of $${amount} has been processed.`);

//       return { success: true, message: "Transaction confirmed." };
//     } catch (error) {
//       console.error("Error confirming transaction:", error);
//       throw new Error("Database error while confirming transaction.");
//     }
//   };

//   static getAllTransactions = async () => {
//     try {
//       const transactions = await Transaction.fetchAll(); // Fetch all transactions
//       return transactions.toJSON();
//     } catch (error) {
//       console.error("Error fetching all transactions:", error);
//       throw new Error("Database error while fetching all transactions.");
//     }
//   };

//   static withdraw = async (data) => {
//     const { user_id, method, accountName, accountNumber, walletKey, amount } = data;

//     try {
//       // Insert withdrawal data into transaction_withdraw using the model
//       const newWithdraw = await new TransactionWithdraw({
//         user_id,
//         method,
//         account_name: accountName,
//         account_number: accountNumber,
//         wallet_key: walletKey,
//         amount,
//         date: new Date(), // Set date to current timestamp
//       }).save();

//       // Fetch user's firstname and lastname from user_accounts table
//       const user = createBookshelfModel("user_accounts");
//       const userAccount = await new user({ id: user_id }).fetch();
//       if (!userAccount) {
//         throw new Error("User not found");
//       }

//       const { firstname, lastname } = userAccount.toJSON();

//       // Send notification about the withdrawal
//       await NotificationService.createNotification(user_id, `Your withdrawal of $${amount} has been processed.`);

//       return { ...newWithdraw.toJSON(), firstname, lastname }; // Return with firstname and lastname
//     } catch (error) {
//       console.error("Error during withdrawal:", error);
//       throw error;
//     }
//   };
// }

// export { TransactionService };
import TransactionWithdraw from "../models/transactionWithdrawModel.js";
import { bookshelfInstance } from "../config/dbConfig.js";
import Transaction from "../models/transactionModel.js";
import { createBookshelfModel } from "../models/userModel.js";
import { NotificationService } from "./notificationService.js";

class TransactionService {
  static deposit = async (req) => {
    const { amount, imageUrl } = req.body;
    const userId = req.userId; // Assume userId is set by your JWT middleware

    // Validate required fields
    if (!userId || !amount || !imageUrl) {
      throw new Error("All fields are required.");
    }

    try {
      const newTransaction = await new Transaction({
        user_id: userId,
        amount: amount,
        image_path: imageUrl,  // Store image URL instead of local path
        status: "pending",
        created_at: new Date(),
      }).save();

      // Fetch user's first and last name from user_accounts
      const user = createBookshelfModel("user_accounts");
      const userAccount = await new user({ id: userId }).fetch();
      if (!userAccount) {
        throw new Error("User not found");
      }

      const { firstname, lastname } = userAccount.toJSON();

      // Send notification
      await NotificationService.createNotification(userId, `Your deposit of $${amount} is pending confirmation.`);

      return { success: true, depositId: newTransaction.id, firstname, lastname };
    } catch (error) {
      console.error("Error inserting deposit:", error);
      throw new Error("Database error");
    }
  };

  static getTransactionsByUserId = async (userId) => {
    try {
      // Fetch transactions for the specified user ID
      const transactions = await Transaction.where({
        user_id: userId,
      }).fetchAll();
      return transactions.toJSON(); // Return the transactions
    } catch (error) {
      console.error("Error fetching transactions:", error);
      throw new Error("Database error while fetching transactions.");
    }
  };

  static confirmDeposit = async (transactionId) => {
    try {
      // Fetch the transaction by ID
      const transaction = await Transaction.where({ id: transactionId }).fetch();
  
      if (!transaction) {
        throw new Error("Transaction not found.");
      }
  
      // Update the status to 'confirmed'
      await transaction.save({ status: "confirmed" }, { patch: true });
  
      // Fetch the user_id from the transaction
      const userId = transaction.get('user_id'); // Use .get() to access the column
  
      // Dynamically create the UserAccount model
      const UserAccount = createBookshelfModel('user_accounts');
      
      // Fetch the user account using the dynamic model
      const userAccount = await new UserAccount({ id: userId }).fetch();
  
      if (!userAccount) {
        throw new Error("User not found.");
      }
  
      const { firstname, lastname } = userAccount.toJSON();
  
      // Send notification about the confirmed deposit
      await NotificationService.createNotification(userId, `Your deposit of $${transaction.get('amount')} has been confirmed.`);
  
      return { success: true, message: "Transaction confirmed.", firstname, lastname };
    } catch (error) {
      console.error("Error confirming transaction:", error);
      throw new Error("Database error while confirming transaction.");
    }
  };
  
  static getAllTransactions = async () => {
    try {
      const transactions = await Transaction.fetchAll(); // Fetch all transactions
      return transactions.toJSON();
    } catch (error) {
      console.error("Error fetching all transactions:", error);
      throw new Error("Database error while fetching all transactions.");
    }
  };

  static withdraw = async (data) => {
    const { user_id, method, accountName, accountNumber, walletKey, amount } = data;

    try {
      // Insert withdrawal data into transaction_withdraw using the model
      const newWithdraw = await new TransactionWithdraw({
        user_id,
        method,
        account_name: accountName,
        account_number: accountNumber,
        wallet_key: walletKey,
        amount,
        date: new Date(), // Set date to current timestamp
      }).save();

      // Fetch user's firstname and lastname from user_accounts table
      const user = createBookshelfModel("user_accounts");
      const userAccount = await new user({ id: user_id }).fetch();
      if (!userAccount) {
        throw new Error("User not found");
      }

      const { firstname, lastname } = userAccount.toJSON();

      // Send notification about the withdrawal
      await NotificationService.createNotification(user_id, `Your withdrawal of $${amount} has been processed.`);

      return { ...newWithdraw.toJSON(), firstname, lastname }; // Return with firstname and lastname
    } catch (error) {
      console.error("Error during withdrawal:", error);
      throw error;
    }
  };

  static confirmWithdrawal = async (transactionId) => {
    try {
      // Fetch the transaction by ID
      const transaction = await TransactionWithdraw.where({ id: transactionId }).fetch();
  
      if (!transaction) {
        throw new Error("Transaction not found.");
      }
  
      // Update the status to 'confirmed'
      await transaction.save({ status: "confirmed" }, { patch: true });
  
      // Fetch the user_id from the transaction
      const userId = transaction.get('user_id'); // Use .get() to access the column
  
      // Send notification about the confirmed withdrawal
      await NotificationService.createNotification(userId, `Your withdrawal of $${transaction.get('amount')} has been confirmed.`);
  
      return { success: true, message: "Transaction confirmed." };
    } catch (error) {
      console.error("Error confirming withdrawal:", error);
      throw new Error("Database error while confirming withdrawal.");
    }
  };

  static getAllWithdrawals = async () => {
    try {
      const withdrawals = await TransactionWithdraw.fetchAll(); // Fetch all withdrawals
      return withdrawals.toJSON();
    } catch (error) {
      console.error("Error fetching all withdrawals:", error);
      throw new Error("Database error while fetching all withdrawals.");
    }
  };

  static getWithdrawalTransactionsByUserId = async (userId) => {
    try {
      // Fetch transactions for the specified user ID
      const transactions = await TransactionWithdraw.where({
        user_id: userId,
      }).fetchAll();
      return transactions.toJSON(); // Return the transactions
    } catch (error) {
      console.error("Error fetching transactions:", error);
      throw new Error("Database error while fetching transactions.");
    }
  };
}

export { TransactionService };

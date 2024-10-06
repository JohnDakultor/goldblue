// import { TransactionService } from '../services/transactionService.js';
// import {NotificationService } from '../services/notificationService.js';

// class TransactionController {
//   static deposit = async (req, res) => {
//     console.log('Deposit request:', req.body);
//     try {
//       const result = await TransactionService.deposit(req);
//       res.status(200).json(result);
//     } catch (error) {
//       console.error('Error in deposit controller:', error);
//       res.status(500).json({ success: false, message: error.message });
//     }
//   };

//   static getTransactions = async (req, res) => {
//     const userId = req.userId; // Assume userId is set in the request from your JWT middleware

//     try {
//         const transactions = await TransactionService.getTransactionsByUserId(userId);
//         return res.status(200).json(transactions); // Return transactions as JSON
//     } catch (error) {
//         console.error("Error in getTransactions controller:", error);
//         return res.status(500).json({ message: error.message });
//     }
// };

// static confirmDeposit = async (req, res) => {
//   const { id } = req.params;

//   try {
//       const result = await TransactionService.confirmDeposit(id);

//       const transaction = await TransactionService.where({ id }).fetch();
//         const userId = transaction.user_id; // Get user ID from the transaction

//         // Create a notification for the user
//         await NotificationService.createNotification(userId, `Your deposit of $${transaction.amount} has been confirmed.`);


//       return res.status(200).json(result); // Return success message
//   } catch (error) {
//       console.error('Error in confirmDeposit controller:', error);
//       return res.status(500).json({ success: false, message: error.message });
//   }
// };

// static getAllTransactions = async (req, res) => {
//   try {
//       const transactions = await TransactionService.getAllTransactions();
//       return res.status(200).json(transactions);
//   } catch (error) {
//       console.error("Error in getAllTransactions controller:", error);
//       return res.status(500).json({ message: error.message });
//   }
// };

// static withdraw = async (req, res) => {
//   const userId = req.userId; // Assume userId is set in the request from your JWT middleware
//   const { method, amount, accountName, accountNumber, walletKey } = req.body;

//   try {
//       const user = req.userData; // Assuming you have userData middleware
//       const data = {
//           user_id: userId,
//           firstname: user.firstname,
//           lastname: user.lastname,
//           method,
//           accountName,
//           accountNumber,
//           walletKey,
//           amount
//       };

//       const result = await TransactionService.withdraw(data);
//       res.status(200).json({ success: true, withdrawal: result });
//   } catch (error) {
//       console.error('Error in withdrawal controller:', error);
//       res.status(500).json({ success: false, message: error.message });
//   }
// };


// }

// export { TransactionController };

import { TransactionService } from '../services/transactionService.js';
import { NotificationService } from '../services/notificationService.js';

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

  static confirmDeposit = async (req, res) => {
      const { id } = req.params;

      try {
          const result = await TransactionService.confirmDeposit(id);
          const transaction = await TransactionService.getTransactionsByUserId(id);

          // Check if transaction exists
          if (!transaction) {
              return res.status(404).json({ success: false, message: 'Transaction not found' });
          }

          const userId = transaction.user_id; // Get user ID from the transaction

          // Create a notification for the user
          await NotificationService.createNotification(userId, `Your deposit of $${transaction.amount} has been confirmed.`);

          return res.status(200).json(result); // Return success message
      } catch (error) {
          console.error('Error in confirmDeposit controller:', error);
          return res.status(500).json({ success: false, message: error.message });
      }
  };

  static getAllTransactions = async (req, res) => {
      try {
          const transactions = await TransactionService.getAllTransactions();
          return res.status(200).json(transactions);
      } catch (error) {
          console.error("Error in getAllTransactions controller:", error);
          return res.status(500).json({ message: error.message });
      }
  };

  static withdraw = async (req, res) => {
      const userId = req.userId; // Assume userId is set in the request from your JWT middleware
      const { method, amount, accountName, accountNumber, walletKey } = req.body;

      try {
          const user = req.userData; // Assuming you have userData middleware
          const data = {
              user_id: userId,
              firstname: user.firstname,
              lastname: user.lastname,
              method,
              accountName,
              accountNumber,
              walletKey,
              amount
          };

          const result = await TransactionService.withdraw(data);
          res.status(200).json({ success: true, withdrawal: result });
      } catch (error) {
          console.error('Error in withdrawal controller:', error);
          res.status(500).json({ success: false, message: error.message });
      }
  };

  static confirmWithdrawal = async (req, res) => {
      const { id } = req.params;

      try {
          const result = await TransactionService.confirmWithdrawal(id);
          const transaction = await TransactionService.getTransactionsByUserId(id);

          // Check if transaction exists
          if (!transaction) {
              return res.status(404).json({ success: false, message: 'Transaction not found' });
          }

          const userId = transaction.user_id; // Get user ID from the transaction

          // Create a notification for the user
          await NotificationService.createNotification(userId, `Your withdrawal of $${transaction.amount} has been confirmed.`);

          return res.status(200).json(result); // Return success message
      } catch (error) {
          console.error('Error in confirmWithdrawal controller:', error);
          return res.status(500).json({ success: false, message: error.message });
      }
  };

  static getAllWithdrawals = async (req, res) => {
      try {
          const withdrawals = await TransactionService.getAllWithdrawals();
          return res.status(200).json(withdrawals);
      } catch (error) {
          console.error("Error in getAllWithdrawals controller:", error);
          return res.status(500).json({ message: error.message });
      }
  };

  static getWithdrawalById = async (req, res) => {
      const userId = req.userId;

      try {
          const withdrawal = await TransactionService.getWithdrawalTransactionsByUserId(userId);
          return res.status(200).json(withdrawal);
      } catch (error) {
          console.error("Error in getWithdrawalById controller:", error);
          return res.status(500).json({ message: error.message });
      }
  };


}

export { TransactionController };

import  Balance  from '../models/balanceModel.js';
import { createBookshelfModel } from "../models/userModel.js";

class BalanceService {
    // Fetch balance for a specific user
    static getBalanceByUserId = async (userId) => {
        try {
              const user = createBookshelfModel("user_accounts");
            const userAccount = await new user({ id: userId }).fetch();
            return userAccount;
        } catch (error) {
            throw new Error('Error fetching balance for the user.');
        }
    };

    // Update balance and accumulation when deposits or withdrawals are made
    // In BalanceService.js

// Update balance (including accumulation)
static updateBalance = async (userId, deposits = [], withdrawals = []) => {
    try {
        const balanceRecord = await Balance.where({ user_id: userId }).fetch();
        const currentBalance = parseFloat(balanceRecord.get('balance'));
        const accumulation = parseFloat(balanceRecord.get('accumulation'));
        const lastUpdated = balanceRecord.get('last_updated');

        // Calculate the new accumulation
        const newAccumulation = this.calculateAccumulation(currentBalance, lastUpdated);

        // Update balance based on new deposits
        deposits.forEach(deposit => {
            currentBalance += parseFloat(deposit.amount);
        });

        // Update balance based on new withdrawals
        withdrawals.forEach(withdrawal => {
            currentBalance -= parseFloat(withdrawal.amount);
        });

        // Check if accumulation reaches the threshold to update the balance
        const accumulationThreshold = 5.00;
        let updatedAccumulation = accumulation + newAccumulation;

        if (updatedAccumulation >= accumulationThreshold) {
            currentBalance += updatedAccumulation; // Add accumulated value to the balance
            updatedAccumulation = 0; // Reset accumulation
        }

        // Save the updated balance and accumulation in the database
        await balanceRecord.save({
            balance: currentBalance,
            accumulation: updatedAccumulation,
            last_updated: knex.fn.now() // Update the last updated time
        });

        return { balance: currentBalance, accumulation: updatedAccumulation };
    } catch (error) {
        throw new Error('Error updating balance.');
    }
};


    // Calculate the accumulation based on the last update and current balance
    static calculateAccumulation = (balance, lastUpdated) => {
        const interestRatePerMinute = 0.015; 
        const minutesElapsed = (Date.now() - new Date(lastUpdated)) / (1000 * 60);
        return balance * Math.pow(1 + interestRatePerMinute, minutesElapsed) - balance;
    };

    // Initialize balance for a new user
    static createBalanceForUser = async (userId) => {
        try {
            return await Balance.forge({
                user_id: userId,
                balance: 0.00,
                accumulation: 0.00
            }).save();
        } catch (error) {
            throw new Error('Error creating balance for the user.');
        }
    };

    static calculateDailyAccumulation = async (userId) => {
        try {
            const balanceRecord = await Balance.where({ user_id: userId }).fetch();
            const currentBalance = parseFloat(balanceRecord.get('balance'));
            const lastUpdated = balanceRecord.get('last_updated');
    
            // Calculate the new accumulation
            const newAccumulation = this.calculateAccumulation(currentBalance, lastUpdated);
    
            // Update the balance with the new accumulation
            const updatedBalance = currentBalance + newAccumulation;
    
            // Save the updated balance and last updated time
            await balanceRecord.save({
                balance: updatedBalance,
                accumulation: newAccumulation,
                last_updated: knex.fn.now() // Update the last updated time
            });
    
            return { balance: updatedBalance, accumulation: newAccumulation };
        } catch (error) {
            throw new Error('Error calculating and persisting daily accumulation.');
        }
    };
    
    // Calculate the accumulation based on the last update and current balance
    static calculateAccumulation = (balance, lastUpdated) => {
        const interestRatePerDay = 0.015; // 1.5% per day
        const daysElapsed = (Date.now() - new Date(lastUpdated)) / (1000 * 60 * 60 * 24);
        return balance * interestRatePerDay * daysElapsed;
    };
}



export {BalanceService};
// services/accumulationService.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const accumulationFilePath = path.join(__dirname, '../accuData/accumulation.json');
const lastProcessedDeposits = {};

class AccumulationService {
    static async readAccumulations() {
        try {
            const data = fs.readFileSync(accumulationFilePath, 'utf8');
            return data ? JSON.parse(data) : {};
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.log("Accumulation file doesn't exist, creating a new one.");
                await this.writeAccumulationData({});
                return {};
            }
            throw error;
        }
    }

    static async writeAccumulationData(data) {
        fs.writeFileSync(accumulationFilePath, JSON.stringify(data, null, 2));
    }

    // static async incrementAccumulation() {
    //     const accumulationData = await this.readAccumulations();
    //     const userIds = Object.keys(accumulationData);

    //     userIds.forEach(userId => {
    //         let userAccumulation = accumulationData[userId];
    //         if (userAccumulation && userAccumulation.accumulation) {
    //             const currentAccumulation = userAccumulation.accumulation;
    //             const incrementedValue = currentAccumulation * 1.02; // Increment by 2%
    //             userAccumulation.accumulation = incrementedValue;
    //             userAccumulation.lastUpdated = new Date(); // Update last updated time
    //         }
    //     });

    //     await this.writeAccumulationData(accumulationData);
    //     console.log("Accumulation updated for all users.");
    // }

    // static async incrementAccumulation() {
    //     const accumulationData = await this.readAccumulations();         test for accumulation per minute
    //     const userIds = Object.keys(accumulationData);
    
    //     userIds.forEach(userId => {
    //         let userAccumulation = accumulationData[userId];
    //         if (userAccumulation && userAccumulation.accumulation) {
    //             const currentAccumulation = userAccumulation.accumulation;
    //             const incrementedValue = currentAccumulation * 0.02; // 2% of current accumulation
    //             userAccumulation.accumulation = currentAccumulation + incrementedValue; // Add 2%
    //             userAccumulation.lastUpdated = new Date(); // Update last updated time
    //         }
    //     });
    
    //     await this.writeAccumulationData(accumulationData);
    //     console.log("Accumulation updated for all users.");
    // }

    static async incrementAccumulation() {
        const accumulationData = await this.readAccumulations();
        const userIds = Object.keys(accumulationData);
        const now = new Date();
    
        userIds.forEach(userId => {
            let userAccumulation = accumulationData[userId];
    
            if (userAccumulation && userAccumulation.accumulation) {
                const lastUpdated = new Date(userAccumulation.lastUpdated);
    
                // Check if a full day has passed since the last update
                const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // One day
                if ((now - lastUpdated) >= oneDayInMilliseconds) {
                    const currentAccumulation = userAccumulation.accumulation;
                    const incrementedValue = currentAccumulation * 0.02; // 2% daily increment
                    userAccumulation.accumulation = currentAccumulation + incrementedValue;
                    userAccumulation.lastUpdated = now; // Update last updated time
                }
            }
        });
    
        await this.writeAccumulationData(accumulationData);
        console.log("Daily accumulation updated for all users.");
    }
    
    

    // static async incrementAccumulation() {
    //     const accumulationData = await this.readAccumulations();
    //     const userIds = Object.keys(accumulationData);
    
    //     userIds.forEach(userId => {
    //         let userAccumulation = accumulationData[userId];
    //         if (userAccumulation && userAccumulation.accumulation) {
    //             const currentAccumulation = userAccumulation.accumulation;
    //             const incrementedValue = currentAccumulation * 0.02; // Increment by 2%
    //             userAccumulation.accumulation = currentAccumulation + incrementedValue; // Add 2% increment
    //             userAccumulation.lastUpdated = new Date(); // Update last updated time
    //         }
    //     });
    
    //     await this.writeAccumulationData(accumulationData);
    //     console.log("Accumulation updated for all users.");
    // }
    

    // static startAccumulationInterval() {
    //     // Increment accumulation every minute
    //     setInterval(async () => {
    //         try {
    //             await this.incrementAccumulation();      accumulation interval per minute used for testing algorithm
    //         } catch (error) {
    //             console.error("Error updating accumulation:", error);
    //         }
    //     }, 60000); // 1 minute
    // }

    static startAccumulationInterval() {
        // Run the accumulation check once a day
        setInterval(async () => {
            try {
                await this.incrementAccumulation();
            } catch (error) {
                console.error("Error updating accumulation:", error);
            }
        }, 24 * 60 * 60 * 1000); // 24 hours
    }

    static async getAccumulationByUserId(userId) {
        const accumulationData = await this.readAccumulations();
        const userAccumulation = accumulationData[userId];

        if (!userAccumulation) {
            return { accumulation: 0, lastUpdated: new Date() };
        }

        return userAccumulation;
    }

    static async updateAccumulationByUserId(userId, newAccumulation) {
        const accumulationData = await this.readAccumulations();
        accumulationData[userId] = { accumulation: newAccumulation, lastUpdated: new Date() };

        await this.writeAccumulationData(accumulationData);
    }

    static async deductAccumulationByUserId(userId, amount) {
        const accumulationData = await this.readAccumulations();
        const userAccumulation = accumulationData[userId];
    
        if (!userAccumulation) {
            throw new Error("User accumulation not found");
        }
    
        // Deduct the amount from the user's accumulation
        const newAccumulation = userAccumulation.accumulation - amount;
        userAccumulation.accumulation = newAccumulation < 0 ? 0 : newAccumulation; // Prevent negative accumulation
        userAccumulation.lastUpdated = new Date(); // Update last updated time
    
        await this.writeAccumulationData(accumulationData);
        return newAccumulation;
    }

    static async getLastProcessedDeposit(userId) {
        const accumulationData = await this.readAccumulations();
        const userAccumulation = accumulationData[userId];

        if (!userAccumulation || !userAccumulation.lastProcessedDeposit) {
            return null; // No last processed deposit found
        }

        return userAccumulation.lastProcessedDeposit;
    }

    static async updateLastProcessedDeposit(userId, depositAmount) {
        const accumulationData = await this.readAccumulations();
        if (!accumulationData[userId]) {
            accumulationData[userId] = { accumulation: 0, lastUpdated: new Date() }; // Initialize if not present
        }

        accumulationData[userId].lastProcessedDeposit = depositAmount; // Update last processed deposit
        await this.writeAccumulationData(accumulationData);
    }
    
    static getLastProcessedDeposit(userId) {
        return lastProcessedDeposits[userId] || 0; // Return null if not found
    }

    static updateLastProcessedDeposit(userId, depositAmount) {
        lastProcessedDeposits[userId] = depositAmount; // Update in-memory store
    }

}

export { AccumulationService };

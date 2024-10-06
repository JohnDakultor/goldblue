import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { AccumulationService } from "./accumulationService.js";

// Get the __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const accumulationFilePath = path.join(
  __dirname,
  "../accuData/accumulation.json"
);

class AccumulationManager {
  static accumulationFile = accumulationFilePath;
  static intervalId = null; // To hold the interval ID




  static readAccumulationData = async () => {
    try {
      const rawData = fs.readFileSync(accumulationFilePath, "utf8");
      return JSON.parse(rawData);
    } catch (error) {
      console.error("Error reading accumulation data:", error);
      return {}; // Return an empty object if there's an error
    }
  }

  // Write updated accumulation data to the JSON file
  static writeAccumulationData = async (data) => {
    try {
      fs.writeFileSync(accumulationFilePath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Error writing accumulation data:", error);
    }
  }

  // Accumulation algorithm to update all users
  // Accumulation algorithm to update all users
  static accumulateAll = async () => {
    const data = this.readAccumulationData(); // Read existing data
    const currentTime = Date.now();
  
    // Iterate over the existing accumulation data
    for (const id in data) {
      const userData = data[id];
  
      // Ensure userData.accumulation is defined
      if (!userData.accumulation) {
        userData.accumulation = { accumulation: 0 }; // Initialize if it doesn't exist
      }
  
      // Update lastUpdate if it is not set
      if (!userData.lastUpdate) {
        userData.lastUpdate = currentTime; // Set current time if lastUpdate is undefined
      }
  
      // Check if accumulation exists
      const elapsedTime = (currentTime - userData.lastUpdate) / 60000; // Convert to minutes
  
      // Increment by 2% per minute
      const increment =
        userData.accumulation * 0.02 * elapsedTime;
      
      userData.accumulation += increment; // Update the accumulation value
  
      // Update the last update time for this user
      userData.lastUpdate = currentTime;
    }
  
    // Write the updated data back to the JSON file
    this.writeAccumulationData(data);
  };

  // Start the accumulation process
  static startAccumulation = async (interval = 60000) => {
    // Default to 1 minute
    if (this.intervalId) {
      console.log("Accumulation process is already running.");
      return;
    }

    // Ensure we are using the existing data (not resetting)
    this.accumulateAll();

    this.intervalId = setInterval(() => {
      this.accumulateAll(); // Increment accumulation every interval
      console.log("Accumulated all users.");
    }, interval);

    console.log("Accumulation process started.");
  };

  // Stop the accumulation process
  static stopAccumulation = async () => {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log("Accumulation process stopped.");
    } else {
      console.log("No accumulation process is running.");
    }
  };
}

export { AccumulationManager };

import Axios from "axios";
import { Navigate } from "react-router-dom";

const jwtToken = localStorage.getItem("jwt");
console.log("JWT Token:", jwtToken);

const port = 3001;


/**
 * Signup a user with the provided information.
 *
 * @param {string} firstName - User's first name.
 * @param {string} lastName - User's last name.
 * @param {string} email - User's email address.
 * @param {string} password - User's password.
 * @returns {Promise<Object>} - The response from the server after a successful signup.
 * @throws {Error} - Signup failed.
 */
export const signup = async (firstName, lastName, email, password) => {
  try {
    const response = await Axios.post(`http://localhost:${port}/api/signup`, {
      // Use the port variable
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    throw new Error("Signup failed"); // Handle signup failure
  }
};

/**
 * Login a user with the provided credentials.
 *
 * @param {string} email - User's email address.
 * @param {string} password - User's password.
 * @returns {Promise<Object>} - The response from the server after a successful login.
 * @throws {Error} - Login failed.
 */
export const login = async (email, password) => {
  try {
    const response = await Axios.post(`http://localhost:${port}/api/login`, {
      // Use the port variable
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error("Login failed"); // Handle login failure
  }
};

/**
 * Send a password reset link to the given email address.
 *
 * @param {string} email - User's email address.
 * @returns {Promise<Object>} - The response from the server after a successful password reset.
 * @throws {Error} - Password reset failed.
 */
export const forgotPassword = async (email) => {
  try {
    const response = await Axios.post(`http://localhost:${port}/api/forgotPassword`, {
      email,
    });
    return response.data; // This is correct, we just return data
  } catch (error) {
    if (error.response && error.response.data) {
      // Pass the error message from the server
      return error.response.data;
    }
    throw new Error("An unexpected error occurred"); // Generic error handling
  }
};

/**
 * Resets a user's password using a token sent to their email.
 *
 * @param {string} token - Token sent to the user's email.
 * @param {string} newPassword - User's new password.
 * @returns {Promise<Object>} - The response from the server after a successful password reset.
 * @throws {Error} - Password reset failed.
 */

export const resetPassword = async (token, newPassword) => {
  try {
    const response = await Axios.post(`http://localhost:${port}/api/resetPassword`, {
      // Use the port variable
      token,
      newPassword,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      // Pass the error message from the server
      return error.response.data;
    }
    throw new Error("Login failed"); // Handle login failure
  }
};

export const deposit = async (image, amount) => {
  try {
    const formData = new FormData();
    formData.append('image', image); // Append the image file
    formData.append('amount', amount); // Append the amount

    const response = await Axios.post(`http://localhost:${port}/api/deposit`, formData, {
      headers: {
        "x-access-token": localStorage.getItem("jwt"), // Replace `yourToken` with the actual token
      },
    });
    
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data; // Return the server error message
    }
    throw error; // Rethrow if there's no response
  }
};

export const getTransactions = async (userId) => {
  try {
      const token = localStorage.getItem("jwt");
      const response = await Axios.get(`http://localhost:3001/api/transactions`, {
          headers: { "x-access-token": token },
      });

      // Assuming the response.data is an array of transactions
      return response.data; // Ensure this returns an array
  } catch (error) {
      console.error("Error fetching transactions:", error);
      return []; // Return an empty array on error
  }
};

export const getWithdrawTransactions = async (userId) => {
  try {
      const token = localStorage.getItem("jwt");
      const response = await Axios.get(`http://localhost:3001/api/withDrawTransactions`, {
          headers: { "x-access-token": token },
      });

      // Assuming the response.data is an array of transactions 
      return response.data; // Ensure this returns an array
  } catch (error) {
      console.error("Error fetching transactions:", error);
      return []; // Return an empty array on error
  }
}

export const getWithdraw = async (amount) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await Axios.post(`http://localhost:${port}/api/withdraw`, {
      amount,
      headers: {
        "x-access-token": token,
      }
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data; // Return the server error message
    }
    throw error; // Rethrow if there's no response
  }
}



export default {
  signup,
  login,
  forgotPassword,
  resetPassword,
  deposit,
  getTransactions,
  getWithdraw,
  getWithdrawTransactions
};

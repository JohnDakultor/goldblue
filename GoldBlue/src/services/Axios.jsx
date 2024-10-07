import Axios from "axios";
import { Navigate } from "react-router-dom";

const baseURL = "https://goldblue-backend-z2sk.vercel.app/api"; // Use the Vercel URL

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
    const response = await Axios.post(`${baseURL}/signup`, {
      firstName,
      lastName,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error("Signup failed");
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
    const response = await Axios.post(`${baseURL}/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error("Login failed");
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
    const response = await Axios.post(`${baseURL}/forgotPassword`, {
      email,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    throw new Error("An unexpected error occurred");
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
    const response = await Axios.post(`${baseURL}/resetPassword`, {
      token,
      newPassword,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    throw new Error("Login failed");
  }
};

// export const deposit = async (image, amount) => {
//   try {
//     const formData = new FormData();
//     formData.append('image', image);
//     formData.append('amount', amount);

//     const response = await Axios.post(`${baseURL}/deposit`, formData, {
//       headers: {
//         "x-access-token": localStorage.getItem("jwt"),
//       },
//     });
    
//     return response.data;
//   } catch (error) {
//     if (error.response && error.response.data) {
//       return error.response.data;
//     }
//     throw error;
//   }
// };

export const deposit = async (imageUrl, amount) => {
  try {
    const response = await Axios.post(`${baseURL}/deposit`, { imageUrl, amount }, {
      headers: {
        "x-access-token": localStorage.getItem("jwt"),
        "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    throw error;
  }
};


export const getTransactions = async () => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await Axios.get(`${baseURL}/transactions`, {
      headers: { "x-access-token": token },
    });

    return response.data; // Return the data
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return []; // Return an empty array on error
  }
};

export const getWithdrawTransactions = async () => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await Axios.get(`${baseURL}/withDrawTransactions`, {
      headers: { "x-access-token": token },
    });

    return response.data; // Return the data
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return []; // Return an empty array on error
  }
}

export const getWithdraw = async (amount) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await Axios.post(`${baseURL}/withdraw`, {
      amount,
    }, {
      headers: {
        "x-access-token": token,
      }
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    throw error;
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

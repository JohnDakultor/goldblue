import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createBookshelfModel } from "../models/userModel.js";
import { insertInto } from "../config/dbConfig.js";
import nodemailer from "nodemailer";
import crypto from "crypto";
import {bookshelfInstance} from "../config/dbConfig.js";
import { supabase } from "../config/supaBaseClient.js";

class AuthService {
  // AuthService.js
  static signUp = async (userData) => {
    const { firstName, lastName, email, password } = userData;
    try {
      // Check for existing user in your local DB
      const User = createBookshelfModel("user_accounts");
      const existingUser = await new User({ email }).fetch({ require: false });
      if (existingUser) {
        throw new Error("Email already in use");
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user in your local database
      const newUser = {
        firstname: firstName,
        lastname: lastName,
        email: email,
        hash_password: hashedPassword,
      };
      await insertInto("user_accounts", [newUser]);

      // Now create the user in Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw new Error("Error signing up in Supabase: " + error.message);
      }

      return { newUser, supabaseUser: data.user };
    } catch (error) {
      console.error("Error during sign up:", error.message);
      throw error;
    }
  };

  static login = async (userData) => {
    const { email, password } = userData;
    try {
      const { user, error } = await supabase.auth.signIn({
        email: email,
        password: password,
      });

      if (error) {
        throw new Error(`Supabase login error: ${error.message}`);
      }

      const User = createBookshelfModel("user_accounts");
      const fetchedUser = await User.where({ email }).fetch();
      if (!fetchedUser) {
        throw new Error("Invalid email or password");
      }

      const isValidPassword = await bcrypt.compare(
        password,
        fetchedUser.get("hash_password")
      );
      if (!isValidPassword) {
        throw new Error("Invalid email or password");
      }

      const token = jwt.sign(
        { id: fetchedUser.id, email: fetchedUser.get("email") },
        process.env.JWT_KEY,
        { expiresIn: 300 }
      );

      return { user: fetchedUser.toJSON(), token };
    } catch (error) {
      throw error;
    }
  };

  static getUser = async (userId) => {
    try {
      console.log('Fetching user with ID:', userId);
      const User = createBookshelfModel("user_accounts");

      const user = await User.where({ id: userId }).fetch();
      if (!user) {
        throw new Error("User not found");
      }
      return user.toJSON();
    
    } catch (error) {
      throw error;
    }
  };

  static getUserData = async (token) => {
    try {
      const user = jwt.verify(token, process.env.JWT_KEY);
      const useremail = user.email;
      const User = createBookshelfModel("user_accounts");

      const userData = await User.where({ email: useremail }).fetch();
      return { status: "ok", data: userData.toJSON() };
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return { status: "error", data: "Token expired" };
      }
      return { status: "error", data: error.message };
    }
  };

  static forgotPassword = async (email) => {
    try {
      console.log('Looking for user with email:', email);
      
      const User = createBookshelfModel("user_accounts");
      const user = await User.where({ email }).fetch();
      
      console.log('Fetched user:', user);

      if (!user) {
        console.error('User not found for email:', email);
        throw new Error("User not found");
      }

      // Generate a reset token
      const resetToken = crypto.randomBytes(32).toString("hex");
      
      // Use a JavaScript Date object for token expiration
      const tokenExpiration = new Date(Date.now() + 3600000); // Token valid for 1 hour

      // Store resetToken and expiration in the database
      user.set("reset_token", resetToken);
      user.set("token_expiration", tokenExpiration); // Set as a Date object
      await user.save();

      // Create reset link
      const resetUrl = `https://goldblue.vercel.app/resetpassword?token=${resetToken}`;

      // Send the email
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.get("email"),
        subject: 'Password Reset',
        html: `<p>You requested a password reset. Click <a href="${resetUrl}">here</a> to reset your password.</p>`
      };

      await transporter.sendMail(mailOptions);

      return { success: true, message: "Password reset link sent to email." };
    } catch (error) {
      console.error('Error in forgotPassword:', error);
      throw error;
    }
  };

  static resetPassword = async (userData) => {
    const { token, newPassword } = userData; 
    try {
      const User = createBookshelfModel("user_accounts");
  
      // Log the token being used
      console.log("Resetting password with token:", token);
      console.log("Current Date:", new Date());
  
      // Log SQL queries
      bookshelfInstance.knex.on('query', (query) => {
        console.log('SQL Query:', query.sql);
      });
  
      // Query to find the user with the reset token
      const user = await User.query((qb) => {
        qb.where('reset_token', token);
      }).fetch();
  
      // Check if user was found
      if (!user || user.isNew()) { // Change this line
        console.log("No user found with the provided token.");
        throw new Error("Invalid or expired reset token");
      }
  
      // Check token expiration
      const tokenExpiration = user.get('token_expiration');
      if (!tokenExpiration || new Date(tokenExpiration) <= new Date()) {
        console.log("Token has expired.");
        throw new Error("Invalid or expired reset token");
      }
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.set("hash_password", hashedPassword);
      user.set("reset_token", null);
      user.set("token_expiration", null);
      await user.save();
  
      return { success: true, message: "Password has been reset successfully." };
    } catch (error) {
      console.error("Error resetting password:", error);
      throw error; // Re-throw the error after logging it
    }
  };

  
  
}

export { AuthService };

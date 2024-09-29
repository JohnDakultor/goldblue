import { AuthService } from "../services/authService.js";
import passport from "passport";
import jwt from "jsonwebtoken";


class AuthController {
  static signUp = async (req, res) => {
    try {
      const newUser = await AuthService.signUp(req.body);
      res.status(201).send({ message: "User created successfully", result: newUser });
    } catch (error) {
      console.error('Error during sign up:', error);
      res.status(500).send(error.message);
    }
  };

  static login = async (req, res, next) => {
    passport.authenticate("local", async (err, user, info) => {
      if (err) {
        console.error('Passport authentication error:', err);
        return res.status(500).json({ auth: false, message: "Internal server error" });
      }
      if (!user) {
        return res.status(401).json({ auth: false, message: "Invalid email or password" });
      }

      req.logIn(user, async (err) => {
        if (err) {
          console.error('Error during login:', err);
          return res.status(500).json({ auth: false, message: "Error logging in" });
        }

        try {
          const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_KEY, { expiresIn: 300 });
          const userData = { id: user.id, email: user.email };

          return res.status(200).json({ auth: true, token: token, result: userData });
        } catch (error) {
          console.error('Error creating token:', error);
          return res.status(500).json({ auth: false, message: "Error creating token" });
        }
      });
    })(req, res, next);
  };

  static async getUser(req, res) {
    try {
      const userId = req.userId;
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
      
      const user = await AuthService.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json({ result: user });
    } catch (error) {
      console.error('Error fetching user:', error);
      return res.status(500).json({ message: "Error fetching data" });
    }
  }

  static getUserData = async (req, res) => {
    const { token } = req.body;
    if (!token) {
        return res.status(400).json({ status: "error", data: "Token is required" });
    }
    try {
        const user = await AuthService.getUserData(token);
        if (user.status === "error") {
            return res.status(401).json(user); // Send 401 if the token expired
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ status: "error", data: error.message });
    }
};

  static forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await AuthService.forgotPassword(email);
        if (!user) {
            console.error(`User not found for email: ${email}`);
            return res.status(404).json({ message: "User not found" });
        }
        console.log(`Password reset email sent to: ${email}`);
        return res.status(200).json({ result: user, message: "Password reset link sent." });
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ message: "Error fetching data" });
    }
}


  static resetPassword = async (req, res) => {
    const { token, newPassword } = req.body; // Update this line
    try {
      const user = await AuthService.resetPassword({ token, newPassword }); // Update this line
      return res.status(200).json({ result: user, message: "Password reset successful." });
    } catch (error) {
      console.error('Error resetting password:', error);
      return res.status(500).json({ message: "Error resetting password" });
    }
  }
  

  
}



export { AuthController };

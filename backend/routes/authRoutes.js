import express from "express";
import { AuthController } from "../controllers/authController.js";
import verifyJWT from "../middlewares/verifyJWT.js";
import { TransactionController } from "../controllers/transactionController.js";
import { upload } from "../config/multerConfig.js";

const router = express.Router();

router.post("/login", AuthController.login);
router.post("/signup", AuthController.signUp);
router.get("/user",verifyJWT, AuthController.getUser);
router.post("/userData", AuthController.getUserData);
router.post("/forgotPassword", AuthController.forgotPassword);
router.post("/resetPassword", AuthController.resetPassword);
router.post("/deposit",verifyJWT, upload.single("image"), TransactionController.deposit);
router.get("/transactions",verifyJWT, TransactionController.getTransactions);

export default router;

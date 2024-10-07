import * as express from "express";
import { AuthController } from "../controllers/authController.js";
import verifyJWT from "../middlewares/verifyJWT.js";
import { TransactionController } from "../controllers/transactionController.js";
import { upload } from "../config/multerConfig.js";
import { NotificationController } from "../controllers/notificationController.js";
// import { balanceController } from "../controllers/balanceController.js";
import {AccumulationController} from "../controllers/accumulationController.js";
import {autoAccumulateControler} from "../controllers/autoAccuController.js";
import { AccumulationService } from "../services/accumulationService.js";

const router = express.Router();

router.post("/login", AuthController.login);
router.post("/signup", AuthController.signUp);
router.get("/user",verifyJWT, AuthController.getUser);
router.post("/userData", AuthController.getUserData);
router.post("/forgotPassword", AuthController.forgotPassword);
router.post("/resetPassword", AuthController.resetPassword);
router.post("/deposit",verifyJWT, upload.single("image"), TransactionController.deposit);
router.get("/transactions",verifyJWT, TransactionController.getTransactions);


router.get("/withDrawTransactions",verifyJWT, TransactionController.getWithdrawalById );


router.get("/AllTransactions", TransactionController.getAllTransactions);
router.post("/deposits/confirm/:id", TransactionController.confirmDeposit);
router.post("/withdraw",verifyJWT, TransactionController.withdraw);
router.post("/withdraw/confirm/:id", TransactionController.confirmWithdrawal);
router.get("/AllWithdrawals", TransactionController.getAllWithdrawals);

router.post("/notifications", NotificationController.createNotification);

// Route to get notifications for a user
router.get("/getNotifications", verifyJWT, NotificationController.getNotifications);

// router.get("/balance", verifyJWT, balanceController.getBalance);
// router.post("/balance/update", verifyJWT, balanceController.updateBalance);
// router.post("/balance/create", verifyJWT, balanceController.createBalance);

// router.post("/calculate", verifyJWT, balanceController.calculateDailyAccumulation);

router.get("/accumulation",verifyJWT,AccumulationController.getAccumulation);
router.post("/accumulation",verifyJWT, AccumulationController.updateAccumulation);

router.post("/autoAccumulation",verifyJWT, autoAccumulateControler.autoAccumulate);

router.post("/accumulation/withdraw", verifyJWT, AccumulationController.withdrawAccumulation);

router.get('/lastProcessedTotal', verifyJWT, AccumulationController.getLastProcessedTotal); 


AccumulationService.startAccumulationInterval();



// router.post("/compoundInterest",verifyJWT, AccumulationController.confirmDeposit);



export default router;

import express from "express";
import { createPayment, getPaymentsByLoan, getPaymentByTransactionId } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/", createPayment);
router.get("/:loanId", getPaymentsByLoan);
router.get("/transaction/:transactionId", getPaymentByTransactionId);
export default router;

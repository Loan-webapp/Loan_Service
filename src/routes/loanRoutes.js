import express from "express";
import { approveLoan, getLoansByCustomer } from "../controllers/loanController.js";

const router = express.Router();

router.post("/", approveLoan);
router.get("/customer/:customerId", getLoansByCustomer);

export default router;

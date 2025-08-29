import express from "express";
import { getDuesByLoan, getDuesByCustomer } from "../controllers/dueController.js";

const router = express.Router();
router.get("/loan/:loanId", getDuesByLoan);
router.get("/customer/:customerId", getDuesByCustomer);

export default router;

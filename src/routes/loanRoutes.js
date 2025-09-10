import express from "express";
import { approveLoan, getLoansByCustomer, getLoanById} from "../controllers/loanController.js";

const router = express.Router();

router.post("/", approveLoan);
router.get("/customer/:customerId", getLoansByCustomer);
router.get("/:loanId", getLoanById); 

export default router;

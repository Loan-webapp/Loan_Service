import express from "express";
import { getCustomers, getCustomerById, addCustomer } from "../controllers/customerController.js";

const router = express.Router();

router.get("/", getCustomers);
router.get("/:id", getCustomerById);   //  new route
router.post("/", addCustomer);

export default router;

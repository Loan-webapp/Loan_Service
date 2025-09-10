import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";

import customerRoutes from "./routes/customerRoutes.js";
import loanRoutes from "./routes/loanRoutes.js";
import dueRoutes from "./routes/dueRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/customers", customerRoutes);
app.use("/api/loans", loanRoutes);
app.use("/api/dues", dueRoutes);
app.use("/api/payments", paymentRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Loan Service API running 🚀" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));

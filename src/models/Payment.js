import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  loanId: { type: mongoose.Schema.Types.ObjectId, ref: "Loan", required: true },
  transactionId: { type: String, required: true },
  method: { type: String, enum: ["Cash", "UPI", "Card", "Bank"], required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ["single", "multiple", "settlement"], required: true },
  count: { type: Number, required: true },
  dues: [{ type: mongoose.Schema.Types.ObjectId, ref: "Due" }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Payment", paymentSchema);

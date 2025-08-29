import mongoose from "mongoose";

const loanSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
  principal: { type: Number, required: true },
  interest: { type: Number, required: true },
  duration: { type: Number, required: true }, // months
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Loan", loanSchema);

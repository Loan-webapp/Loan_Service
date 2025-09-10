import mongoose from "mongoose";

const dueSchema = new mongoose.Schema({
  loan: { type: mongoose.Schema.Types.ObjectId, ref: "Loan", required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
  dueDate: { type: String, required: true },
  dueAmount: { type: Number, required: true },
  status: { type: String, enum: ["Unpaid", "Paid"], default: "Unpaid" },
  paidDate: { type: Date }, 
});

export default mongoose.model("Due", dueSchema);

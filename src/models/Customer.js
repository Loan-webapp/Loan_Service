import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  contact: { type: String },       
  occupation: { type: String },    
  income: { type: Number },        
  dob: { type: Date },
}, { timestamps: true });

export default mongoose.model("Customer", customerSchema);

import Payment from "../models/Payment.js";
import Due from "../models/Due.js";

// Create Payment
export const createPayment = async (req, res) => {
  try {
    const { loanId, transactionId, method, amount, type, count, dues } = req.body;

    // Update selected dues → mark as paid with timestamp
    await Due.updateMany(
      { _id: { $in: dues } },
      { 
        $set: { 
          status: "Paid",
          paidDate: new Date()  // ✅ store when payment happened
        } 
      }
    );

    // Save Payment
    const payment = new Payment({
      loanId,
      transactionId,
      method,
      amount,
      type,
      count,
      dues,
    });
    await payment.save();

    res.status(201).json({ message: "Payment successful", payment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get payments for a loan
export const getPaymentsByLoan = async (req, res) => {
  try {
    const { loanId } = req.params;
    const payments = await Payment.find({ loanId }).sort({ createdAt: -1 });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ...existing code...

// Get payment by transactionId
export const getPaymentByTransactionId = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const payment = await Payment.findOne({ transactionId });
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.json(payment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ...existing code...

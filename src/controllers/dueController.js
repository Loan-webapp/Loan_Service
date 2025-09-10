import Due from "../models/Due.js";
import Payment from "../models/Payment.js";

// Get dues by Loan ID
export const getDuesByLoan = async (req, res) => {
  try {
    const { loanId } = req.params;

    // Get all dues for the loan
    const dues = await Due.find({ loan: loanId }).lean();

    // Get all payments for this loan
    const payments = await Payment.find({ loanId }).lean();

    // Build a map of dueId → transactionId
    const paymentMap = {};
    payments.forEach((p) => {
      p.dues.forEach((dueId) => {
        paymentMap[dueId.toString()] = p.transactionId;
      });
    });

    // Attach transactionId + late status
    const duesWithTxn = dues.map((d) => {
      let txnId = paymentMap[d._id.toString()] || null;

      let isLate = null;
      if (d.status === "Paid" && d.paidDate) {
        isLate = new Date(d.paidDate) > new Date(d.dueDate);
      }

      return {
        ...d,
        transactionId: txnId,
        isLate, // true = late, false = on time, null = unpaid
      };
    });

    res.json(duesWithTxn);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get dues by Customer ID
export const getDuesByCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;

    // Get all dues for this customer
    const dues = await Due.find({ customer: customerId }).lean();

    // Get all payments (optional: filter by customer if Payment has customerId)
    const payments = await Payment.find({}).lean();

    // Build a map of dueId → transactionId
    const paymentMap = {};
    payments.forEach((p) => {
      p.dues.forEach((dueId) => {
        paymentMap[dueId.toString()] = p.transactionId;
      });
    });

    // Attach transactionId + late status
    const duesWithTxn = dues.map((d) => {
      let txnId = paymentMap[d._id.toString()] || null;

      let isLate = null;
      if (d.status === "Paid" && d.paidDate) {
        isLate = new Date(d.paidDate) > new Date(d.dueDate);
      }

      return {
        ...d,
        transactionId: txnId,
        isLate, // true = late, false = on time, null = unpaid
      };
    });

    res.json(duesWithTxn);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

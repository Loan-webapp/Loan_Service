import Due from "../models/Due.js";

// Get dues by Loan ID
export const getDuesByLoan = async (req, res) => {
  try {
    const { loanId } = req.params;
    const dues = await Due.find({ loan: loanId });
    res.json(dues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get dues by Customer ID
export const getDuesByCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;
    const dues = await Due.find({ customer: customerId });
    res.json(dues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

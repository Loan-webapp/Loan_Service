import Loan from "../models/Loan.js";
import Due from "../models/Due.js";
// EMI formula
const calculateEMI = (principal, interest, duration) => {
  const monthlyRate = interest / 100 / 12;
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, duration)) /
    (Math.pow(1 + monthlyRate, duration) - 1);
  return parseFloat(emi.toFixed(2));
};

// Approve Loan & Generate Dues
export const approveLoan = async (req, res) => {
  try {
    const { customer, principal, interest, duration } = req.body;

    // Save loan
    const loan = new Loan({ customer, principal, interest, duration });
    await loan.save();

    // Calculate EMI
    const emi = calculateEMI(principal, interest, duration);

    // Generate dues per month
    const dues = [];
    for (let i = 0; i < duration; i++) {
      const dueDate = new Date();
      dueDate.setMonth(dueDate.getMonth() + (i + 1));

      dues.push({
        loan: loan._id,
        customer: customer,
        dueDate: dueDate.toISOString().split("T")[0],
        dueAmount: emi,
        status: "Unpaid",
      });
    }

    await Due.insertMany(dues);

    res.status(201).json({ loanId: loan._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// New: Get all loans for a customer
export const getLoansByCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;
    const loans = await Loan.find({ customer: customerId }).sort({ createdAt: -1 });
    res.json(loans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getLoanById = async (req, res) => {
  try {
    const { loanId } = req.params;

    const loan = await Loan.findById(loanId).lean();
    if (!loan) return res.status(404).json({ error: "Loan not found" });

    // Fetch dues for this loan
    const dues = await Due.find({ loan: loanId }).sort({ dueDate: 1 }).lean();

    res.json({ ...loan, dues });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

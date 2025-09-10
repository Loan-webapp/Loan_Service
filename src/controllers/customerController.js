import Customer from "../models/Customer.js";

// Get all customers
// Get all customers with optional search
export const getCustomers = async (req, res) => {
  try {
    const { search } = req.query;

    let query = {};
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: "i" } }, // case-insensitive
          { phone: { $regex: search, $options: "i" } },
        ],
      };
    }

    const customers = await Customer.find(query);
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single customer by ID 
export const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ message: "Customer not found" });
    res.json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add new customer
export const addCustomer = async (req, res) => {
  try {
    const { name, phone, contact, occupation, income, dob } = req.body;
    const customer = new Customer({ name, phone, contact, occupation, income, dob });
    await customer.save();
    res.status(201).json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

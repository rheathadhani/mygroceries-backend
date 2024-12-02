const Payments = require('../models/payments');

// Add or delete both BankAccounts and BankCards
exports.PaymentController = {
  // Get all bank accounts and cards for the logged-in user
  async getPayments(req, res) {
    const { userID } = req; // Assuming userID is correctly attached after authentication
    try {
      const [bankAccounts] = await Payments.getBankAccounts(userID);
      const [bankCards] = await Payments.getBankCards(userID);

      res.status(200).json({ bankAccounts, bankCards });
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve payment details', error: error.message });
    }
  },
  // Add a new bank account
  async addBankAccount(req, res) {
    const { userID } = req;
    const { bankName, bankAccountNumber, bankAccountHolderName } = req.body;

    // Log the values to ensure they're correctly passed
    console.log({ userID, bankName, bankAccountNumber, bankAccountHolderName });

    try {
      // Assuming Payments.addBankAccount returns the result object with insertId
      const [result] = await Payments.addBankAccount(userID, bankName, bankAccountNumber, bankAccountHolderName);
      const accountID = result.insertId;  // Get the auto-incremented accountID
      //console.log(userID, bankName, accountNumber, accountHolderName);
      res.status(201).json({ message: 'Bank account added successfully', accountID });
    } catch (error) {
      res.status(500).json({ message: 'Failed to add bank account', error: error.message });
    }
  },

  // Delete a bank account
  async deleteBankAccount(req, res) {
    const { accountID } = req.params;

    try {
      await Payments.deleteBankAccount(accountID);
      res.status(200).json({ message: 'Bank account deleted successfully' });
    } catch (error) {
      // Handle the case where the account cannot be deleted due to existing payments
      res.status(400).json({ message: error.message });
    }
  },

  // Add a new bank card
  async addBankCard(req, res) {
    const { userID } = req;
    const { cardType, cardNumber } = req.body;

    try {
      await Payments.addBankCard(userID, cardType, cardNumber);
      res.status(201).json({ message: 'Bank card added successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to add bank card', error: error.message });
    }
  },

  // Delete a bank card
  async deleteBankCard(req, res) {
    const { cardID } = req.params;

    try {
      await Payments.deleteBankCard(cardID);
      res.status(200).json({ message: 'Bank card deleted successfully' });
    } catch (error) {
      // Handle the case where the card cannot be deleted due to existing payments
      res.status(400).json({ message: error.message });
    }
  }
};

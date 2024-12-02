const db = require('../db.js');

class Payments {
  // Bank Account Methods

  // Add a new bank account
  // In your Payments model (e.g., paymentsModel.js)
  static async addBankAccount(userID, bankName, bankAccountNumber, bankAccountHolderName) {
    const query = `
    INSERT INTO BankAccounts (customerID, bankName, bankAccountNumber, bankAccountHolderName)
    VALUES (?, ?, ?, ?)
  `;
    return db.execute(query, [userID, bankName, bankAccountNumber, bankAccountHolderName]);
  }


  // Delete a bank account  
  static async deleteBankAccount(accountID) {
    // Check if there are any payments associated with this bank account
    const [payments] = await db.execute('SELECT * FROM Payments WHERE bankAccountID = ?', [accountID]);

    if (payments.length > 0) {
      throw new Error('Cannot delete bank account. It is associated with one or more payments.');
    }

    // Proceed with deletion if no payments are found
    const query = `DELETE FROM BankAccounts WHERE accountID = ?`;
    return db.execute(query, [accountID]);
  }

  static async getBankAccounts(customerID) {
    const query = `SELECT * FROM BankAccounts WHERE customerID = ?`;
    return db.execute(query, [customerID]);
  }

  static async getBankCards(customerID) {
    const query = `SELECT * FROM BankCards WHERE customerID = ?`;
    return db.execute(query, [customerID]);
  }

  // Add a new bank card
  static async addBankCard(userID, cardType, cardNumber) {
    const query = `INSERT INTO BankCards (customerID, cardType, cardNumber)
                   VALUES (?, ?, ?)`;
    return db.execute(query, [userID, cardType, cardNumber]);
  }

  // Delete a bank card
  static async deleteBankCard(cardID) {
    // Check if there are any payments associated with this bank card
    const [payments] = await db.execute('SELECT * FROM Payments WHERE cardID = ?', [cardID]);

    if (payments.length > 0) {
      throw new Error('Cannot delete bank card. It is associated with one or more payments.');
    }

    // Proceed with deletion if no payments are found
    const query = `DELETE FROM BankCards WHERE cardID = ?`;
    return db.execute(query, [cardID]);
  }

}

module.exports = Payments;

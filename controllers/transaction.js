const WalletTransaction = require('../models/walletTransaction.js');
const GoldTransaction = require('../models/goldTransaction.js');

exports.createWalletTransaction = async (req, res) => {
  try {
    const newWalletTransaction = new WalletTransaction(req.body);
    await newWalletTransaction.save();
    res.status(201).json({ message: 'Wallet transaction created successfully', data: newWalletTransaction });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createGoldTransaction = async (req, res) => {
  try {
    const newGoldTransaction = new GoldTransaction(req.body);
    await newGoldTransaction.save();
    res.status(201).json({ message: 'Gold transaction created successfully', data: newGoldTransaction });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

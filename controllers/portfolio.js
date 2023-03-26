const User = require('../models/user.js');
const WalletTransaction = require('../models/walletTransaction.js');
const GoldTransaction = require('../models/goldTransaction.js');

exports.calculatePortfolio = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch user's running balance
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const currentFund = user.runningBalance.wallet;
    const currentGold = user.runningBalance.gold;
    const currentGoldPrice = user.runningBalance.goldPrice;

    // Calculate the net funds added
    const walletTransactions = await WalletTransaction.find({ userId, type: 'CREDIT', status: 'SUCCESS' });
    const netFundAdded = walletTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);

    // Calculate the current value of gold holdings
    const currentGoldValue = currentGold * currentGoldPrice;

    // Calculate the net growth or loss
    const netGrowthOrLoss = currentFund + currentGoldValue - netFundAdded;

    // Calculate the gain or loss percentage
    const gainOrLossPercentage = ((netGrowthOrLoss / netFundAdded) * 100).toFixed(2);

    res.status(200).json({
      netFundAdded,
      currentFund,
      netGrowthOrLoss,
      gainOrLossPercentage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaction.js');

router.post('/wallet', transactionController.createWalletTransaction);
router.post('/gold', transactionController.createGoldTransaction);

module.exports = router;

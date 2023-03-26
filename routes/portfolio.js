const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolio.js');

router.get('/calculate/:userId', portfolioController.calculatePortfolio);

module.exports = router;
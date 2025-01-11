const express = require('express');
const router = express.Router();
const { getStats, getDeviation } = require('../controllers/crypto');

router.get('/stats', getStats);
router.get('/deviation', getDeviation);

module.exports = router;

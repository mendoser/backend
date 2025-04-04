const express = require('express');
const router = express.Router();
const { addProvider, getProviders } = require('../controllers/providerController'); // Ensure this path is correct

router.post('/add', addProvider);
router.get('/', getProviders);

module.exports = router;

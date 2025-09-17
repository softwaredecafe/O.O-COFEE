const express = require('express');
const router = express.Router();
const { createRegistration, getRegistrations } = require('../controllers/registrationController');
const upload = require('../middleware/upload');

router.post('/', upload.single('paymentProof'), createRegistration);
router.get('/', getRegistrations);

module.exports = router;
// backend\routes\api.js

const express = require('express');
const router = express.Router();
const { updateFineStatus } = require('../controllers/fine.controller'); // Import the relevant controller

// Add your other routes here...

// Update fine status route
router.put('/fine/:id', updateFineStatus);

module.exports = router;

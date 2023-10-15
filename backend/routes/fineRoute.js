const express = require('express');
const router = express.Router();
const finesController = require('../controllers/fine.controller');

// Route for getting all fines
router.get('/', finesController.getFinesAll);

// Route for creating a new fine
router.post('/', finesController.createFine);

// Route for getting a specific fine by ID
router.get('/:id', finesController.getFineById);

// Route for updating a specific fine by ID
router.put('/:id', finesController.updateFineById);

// Route for deleting a specific fine by ID
router.delete('/:id', finesController.deleteFineById);

module.exports = router;

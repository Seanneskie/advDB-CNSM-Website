const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event.controller');

// Route for getting all events
router.get('/', eventController.getEventsAll);

// Route for creating a new event
router.post('/', eventController.createEvent);

// Route for getting a specific event by ID
router.get('/', eventController.getEventById);

// Route for updating a specific event by ID
router.put('/:id', eventController.updateEventById);

// Route for deleting a specific event by ID
router.delete('/:id', eventController.deleteEventById);

module.exports = router;

const express = require('express');
const router = express.Router();
const { Events } = require('../models/eventsModel'); // Model Path
const { Organization } = require('../models/organizationModel'); // Import the Organization model
const { Student } = require('../models/studentModel'); // Import the Student model

// GET all events
const getEventsAll = async (req, res) => {
    try {
        const events = await Events.find({}).sort({ time_start: 1 });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// CREATE event
const createEvent = async (req, res) => {
    try {
        const { name, org, time_start, time_end, facilitator, description, location } = req.body;

        // Check if any of the required parameters are missing
        if (!name || !org || !time_start || !time_end || !facilitator) {
            return res.status(400).json({ error: 'Missing one or more required parameters (name, org, time_start, time_end, facilitator)' });
        }

        // Validate that organization and facilitator references exist
        const orgExists = await Organization.findById(org);
        const facilitatorExists = await Student.findById(facilitator);

        if (!orgExists || !facilitatorExists) {
            return res.status(400).json({ error: 'Invalid organization or facilitator reference' });
        }

        const event = new Events({
            name,
            org,
            time_start,
            time_end,
            facilitator,
            description,
            location,
        });

        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// GET one event
const getEventById = async (req, res) => {
    const id = req.params.id;
    try {
        const event = await Events.findById(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// UPDATE event
const updateEventById = async (req, res) => {
    const id = req.params.id;
    try {
        const { name, org, time_start, time_end, facilitator, description, location } = req.body;

        // Check if any of the required parameters are missing
        if (!name || !org || !time_start || !time_end || !facilitator) {
            return res.status(400).json({ error: 'Missing one or more required parameters (name, org, time_start, time_end, facilitator)' });
        }

        // Validate that organization and facilitator references exist
        const orgExists = await Organization.findById(org);
        const facilitatorExists = await Student.findById(facilitator);

        if (!orgExists || !facilitatorExists) {
            return res.status(400).json({ error: 'Invalid organization or facilitator reference' });
        }

        const event = await Events.findByIdAndUpdate(id, req.body, { new: true });
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE event
const deleteEventById = async (req, res) => {
    const id = req.params.id;
    try {
        const event = await Events.findByIdAndRemove(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getEventsAll,
    createEvent,
    getEventById,
    updateEventById,
    deleteEventById,
};

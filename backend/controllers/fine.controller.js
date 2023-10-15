const express = require('express');
const router = express.Router();
const { Fines } = require('../models/finesModel'); // Model Path
const { Organization } = require('../models/organizationModel'); // Import the Organization model
const { Events } = require('../models/eventsModel'); // Import the Events model

// GET all fines
const getFinesAll = async (req, res) => {
    try {
        const fines = await Fines.find({}).sort({ date_of_penalty: 1 });
        res.status(200).json(fines);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// CREATE fine
const createFine = async (req, res) => {
    try {
        const { name, organization, event, date_of_penalty, amount } = req.body;

        // Check if any of the required parameters are missing
        if (!name || !organization || !event || !date_of_penalty || !amount) {
            return res.status(400).json({ error: 'Missing one or more required parameters (name, organization, event, date_of_penalty, amount)' });
        }

        // Validate that organization and event references exist
        const organizationExists = await Organization.findById(organization);
        const eventExists = await Events.findById(event);

        if (!organizationExists || !eventExists) {
            return res.status(400).json({ error: 'Invalid organization or event reference' });
        }

        const fine = new Fines({
            name,
            organization,
            event,
            date_of_penalty,
            amount,
        });

        await fine.save();
        res.status(201).json(fine);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// GET one fine
const getFineById = async (req, res) => {
    const id = req.params.id;
    try {
        const fine = await Fines.findById(id);
        if (!fine) {
            return res.status(404).json({ message: 'Fine not found' });
        }
        res.status(200).json(fine);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// UPDATE fine
const updateFineById = async (req, res) => {
    const id = req.params.id;
    try {
        const { name, organization, event, date_of_penalty, amount } = req.body;

        // Check if any of the required parameters are missing
        if (!name || !organization || !event || !date_of_penalty || !amount) {
            return res.status(400).json({ error: 'Missing one or more required parameters (name, organization, event, date_of_penalty, amount)' });
        }

        // Validate that organization and event references exist
        const organizationExists = await Organization.findById(organization);
        const eventExists = await Events.findById(event);

        if (!organizationExists || !eventExists) {
            return res.status(400).json({ error: 'Invalid organization or event reference' });
        }

        const fine = await Fines.findByIdAndUpdate(id, req.body, { new: true });
        if (!fine) {
            return res.status(404).json({ message: 'Fine not found' });
        }
        res.status(200).json(fine);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE fine
const deleteFineById = async (req, res) => {
    const id = req.params.id;
    try {
        const fine = await Fines.findByIdAndRemove(id);
        if (!fine) {
            return res.status(404).json({ message: 'Fine not found' });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getFinesAll,
    createFine,
    getFineById,
    updateFineById,
    deleteFineById,
};

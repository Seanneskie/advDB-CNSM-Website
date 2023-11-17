const express = require('express');
const router = express.Router();
const { Fines } = require('../models/finesModel');
const { Organization } = require('../models/organizationModel');
const { Student } = require('../models/studentModel');
const { Events } = require('../models/eventsModel');

// GET all fines
// finesController.js

const getFinesAll = async (req, res) => {
    try {
        const fines = await Fines.find({}).populate('organization').sort({ date_of_penalty: 1 });
        res.status(200).json(fines);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// CREATE fine
const createFine = async (req, res) => {
    try {
        const { name, organization, date_of_penalty, amount, student, description, status, event } = req.body;

        // Check if any of the required parameters are missing
        if (!name) {
            return res.status(400).json({ error: 'Missing required parameter: name' });
        }
        
        if (!organization) {
            return res.status(400).json({ error: 'Missing required parameter: organization' });
        }
        
        if (!event) {
            return res.status(400).json({ error: 'Missing required parameter: event' });
        }
        
        if (!date_of_penalty) {
            return res.status(400).json({ error: 'Missing required parameter: date_of_penalty' });
        }
        
        if (!amount) {
            return res.status(400).json({ error: 'Missing required parameter: amount' });
        }
        
        if (!student) {
            return res.status(400).json({ error: 'Missing required parameter: student' });
        }
        
        if (!description) {
            return res.status(400).json({ error: 'Missing required parameter: description' });
        }
        
        const fineStatus = status !== null ? status : false

        // Validate that organization reference exists
        const organizationExists = await Organization.findById(organization);

        if (!organizationExists) {
            return res.status(400).json({ error: 'Invalid organization reference' });
        }

        // Validate that student reference exists
        const studentExists = await Student.findById(student);

        if (!studentExists) {
            return res.status(400).json({ error: 'Invalid student reference' });
        }

        const fine = new Fines({
            name,
            organization,
            date_of_penalty,
            amount,
            student,
            description,
            status: fineStatus, // Use the adjusted status
            event,
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
        const { name, organization, date_of_penalty, amount, student, description, status, event } = req.body;

        // Check if any of the required parameters are missing
        if (!name || !organization || !date_of_penalty || !amount || !student || !description || !status || !event) {
            return res.status(400).json({ error: 'Missing one or more required parameters (name, organization, date_of_penalty, amount, student, description, status, event)' });
        }

        // Validate that organization reference exists
        const organizationExists = await Organization.findById(organization);

        if (!organizationExists) {
            return res.status(400).json({ error: 'Invalid organization reference' });
        }

        // Validate that student reference exists
        const studentExists = await Student.findById(student);

        if (!studentExists) {
            return res.status(400).json({ error: 'Invalid student reference' });
        }

        const fine = await Fines.findByIdAndUpdate(id, {
            name,
            organization,
            date_of_penalty,
            amount,
            student,
            description,
            status,
            event,
        }, { new: true });

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

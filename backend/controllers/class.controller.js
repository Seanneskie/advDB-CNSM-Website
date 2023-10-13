const express = require('express');
const router = express.Router();
const { Classification } = require('../models/classModel'); // model Path
const { Organization } = require('../models/organizationModel');

// GET all classifications
const getClassificationsAll = async (req, res) => {
    try {
        const classifications = await Classification.find({}).sort({ description: 1 });
        res.status(200).json(classifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// CREATE classification
const createClassification = async (req, res) => {
    try {
        const { description, org } = req.body;

        // Check if the specified organization exists
        const existingOrganization = await Organization.findById(org);
        if (!existingOrganization) {
            return res.status(400).json({ error: 'Specified organization does not exist' });
        }

        // Check if any of the required parameters are missing
        if (!description || !org) {
            return res.status(400).json({ error: 'Missing one or more required parameters (description, org)' });
        }

        const classification = new Classification({
            description,
            org,
        });

        await classification.save();
        res.status(201).json(classification);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// GET one classification
const getClassificationById = async (req, res) => {
    const id = req.params.id;
    try {
        const classification = await Classification.findById(id);
        if (!classification) {
            return res.status(404).json({ message: 'Classification not found' });
        }
        res.status(200).json(classification);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// UPDATE classification
const updateClassificationById = async (req, res) => {
    const id = req.params.id;
    try {
        const { description, org } = req.body;

        // Check if any of the required parameters are missing
        if (!description || !org) {
            return res.status(400).json({ error: 'Missing one or more required parameters (description, org)' });
        }

        const classification = await Classification.findByIdAndUpdate(id, req.body, { new: true });
        if (!classification) {
            return res.status(404).json({ message: 'Classification not found' });
        }
        res.status(200).json(classification);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteClassificationById = async (req, res) => {
    const id = req.params.id;
    try {
        const classification = await Classification.findByIdAndRemove(id);
        if (!classification) {
            return res.status(404).json({ message: 'Classification not found' });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getClassificationsAll,
    createClassification,
    getClassificationById,
    updateClassificationById,
    deleteClassificationById,
};

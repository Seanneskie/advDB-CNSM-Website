const express = require('express');
const router = express.Router();
const { Organization } = require('../models/organizationModel'); // model Path
const { Student } =  require('../models/studentModel')

// GET all organizations
const getOrganizationsAll = async (req, res) => {
    try {
        const organizations = await Organization.find({}).sort({ name: 1 });
        res.status(200).json(organizations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// CREATE organization
const createOrganization = async (req, res) => {
    try {
        const { name, head, org_location } = req.body;

        // Check if any of the required parameters are missing
        if (!name || !org_location || !head) {
            return res.status(400).json({ error: 'Missing one or more required parameters (name, head, org_location)' });
        }

        // Check if the specified head exists in the student database
        const existingStudent = await Student.findOne({ _id: head });

        if (!existingStudent) {
            return res.status(400).json({ error: 'The specified head is not a valid student' });
        }

        const organization = new Organization({
            name,
            head,
            org_location,
        });

        await organization.save();
        res.status(201).json(organization);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// GET one organization
const getOrganizationById = async (req, res) => {
    const id = req.params.id;
    try {
        const organization = await Organization.findById(id);
        if (!organization) {
            return res.status(404).json({ message: 'Organization not found' });
        }
        res.status(200).json(organization);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// UPDATE organization
const updateOrganizationById = async (req, res) => {
    const id = req.params.id;
    try {
        const { name, head, org_location } = req.body;

        // Check if any of the required parameters are missing
        if (!name || !head || !org_location) {
            return res.status(400).json({ error: 'Missing one or more required parameters (name, head, org_location)' });
        }

        const organization = await Organization.findByIdAndUpdate(id, req.body, { new: true });
        if (!organization) {
            return res.status(404).json({ message: 'Organization not found' });
        }
        res.status(200).json(organization);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteOrganizationById = async (req, res) => {
    const id = req.params.id;
    try {
        const organization = await Organization.findByIdAndRemove(id);
        if (!organization) {
            return res.status(404).json({ message: 'Organization not found' });
        }
        res.status(204).json({ message: 'Department deleted successfully' }); // Add the success message here
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getOrganizationsAll,
    createOrganization,
    getOrganizationById,
    updateOrganizationById,
    deleteOrganizationById,
};

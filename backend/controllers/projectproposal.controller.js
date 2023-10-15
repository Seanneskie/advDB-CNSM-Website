const mongoose = require('mongoose');
const { ProjectProposal } = require('../models/projectproposalModel'); // Model Path
const { Student } = require('../models/studentModel'); // Import the Student model
const { Organization } = require('../models/organizationModel'); // Import the Organization model
const { Vote } = require('../models/votesModel'); // Import the Votes model

// Rest of your code remains the same


// GET all project proposals
const getProjectProposalsAll = async (req, res) => {
    try {
        const projectProposals = await ProjectProposal.find({}).sort({ start_date: 1 });
        res.status(200).json(projectProposals);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// CREATE project proposal
const createProjectProposal = async (req, res) => {
    try {
        const { proponent, start_date, end_date, project_name, ETA, organization, Votes } = req.body;

        // Check if any of the required parameters are missing
        if (!proponent || !start_date || !end_date || !project_name || !organization || !Votes) {
            return res.status(400).json({ error: 'Missing one or more required parameters (proponent, start_date, end_date, project_name, organization, Votes)' });
        }

        // Validate that proponent, organization, and Votes references exist
        const proponentExists = await Student.findById(proponent);
        const organizationExists = await Organization.findById(organization);
        const VotesExists = await Vote.findById(Votes);

        if (!proponentExists || !organizationExists || !VotesExists) {
            return res.status(400).json({ error: 'Invalid proponent, organization, or Votes reference' });
        }

        const projectProposal = new ProjectProposal({
            proponent,
            start_date,
            end_date,
            project_name,
            ETA,
            organization,
            Votes,
        });

        await projectProposal.save();
        res.status(201).json(projectProposal);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// GET one project proposal by ID
const getProjectProposalById = async (req, res) => {
    const id = req.params.id;
    try {
        const projectProposal = await ProjectProposal.findById(id);
        if (!projectProposal) {
            return res.status(404).json({ message: 'Project proposal not found' });
        }
        res.status(200).json(projectProposal);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// UPDATE project proposal by ID
const updateProjectProposalById = async (req, res) => {
    const id = req.params.id;
    try {
        const { proponent, start_date, end_date, project_name, ETA, organization, Votes } = req.body;

        // Check if any of the required parameters are missing
        if (!proponent || !start_date || !end_date || !project_name || !organization || !Votes) {
            return res.status(400).json({ error: 'Missing one or more required parameters (proponent, start_date, end_date, project_name, organization, Votes)' });
        }

        // Validate that proponent, organization, and Votes references exist
        const proponentExists = await Student.findById(proponent);
        const organizationExists = await Organization.findById(organization);
        const VotesExists = await Vote.findById(Votes);

        if (!proponentExists || !organizationExists || !VotesExists) {
            return res.status(400).json({ error: 'Invalid proponent, organization, or Votes reference' });
        }

        const projectProposal = await ProjectProposal.findByIdAndUpdate(id, req.body, { new: true });
        if (!projectProposal) {
            return res.status(404).json({ message: 'Project proposal not found' });
        }
        res.status(200).json(projectProposal);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE project proposal by ID
const deleteProjectProposalById = async (req, res) => {
    const id = req.params.id;
    try {
        const projectProposal = await ProjectProposal.findByIdAndRemove(id);
        if (!projectProposal) {
            return res.status(404).json({ message: 'Project proposal not found' });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getProjectProposalsAll,
    createProjectProposal,
    getProjectProposalById,
    updateProjectProposalById,
    deleteProjectProposalById,
};

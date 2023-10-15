const express = require('express');
const router = express.Router();
const {
    getProjectProposalsAll,
    createProjectProposal,
    getProjectProposalById,
    updateProjectProposalById,
    deleteProjectProposalById,
} = require('../controllers/projectproposal.controller'); // Import the ProjectProposal controller

// Routes for Project Proposals
router.get('/', getProjectProposalsAll); // Get all project proposals
router.post('/', createProjectProposal); // Create a project proposal
router.get('/:id', getProjectProposalById); // Get a project proposal by ID
router.put('/:id', updateProjectProposalById); // Update a project proposal by ID
router.delete('/:id', deleteProjectProposalById); // Delete a project proposal by ID

module.exports = router;

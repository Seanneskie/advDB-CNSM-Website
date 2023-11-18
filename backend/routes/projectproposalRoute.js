const express = require('express');
const router = express.Router();
const {
    getProjectProposalsAll,
    createProjectProposal,
    getProjectProposalById,
    updateProjectProposalById,
    deleteProjectProposalById,
    increaseAgreedVotes,
    increaseDisagreedVotes,
} = require('../controllers/projectproposal.controller'); // Import the ProjectProposal controller

// Routes for Project Proposals
router.get('/', getProjectProposalsAll); // Get all project proposals
router.post('/', createProjectProposal); // Create a project proposal
router.get('/:id', getProjectProposalById); // Get a project proposal by ID
router.put('/:id', updateProjectProposalById); // Update a project proposal by ID
router.delete('/:id', deleteProjectProposalById); // Delete a project proposal by ID

// Route to increase agreed votes
router.patch('/vote/agree/:id', increaseAgreedVotes);

// Route to increase disagreed votes
router.patch('/vote/disagree/:id', increaseDisagreedVotes);

module.exports = router;

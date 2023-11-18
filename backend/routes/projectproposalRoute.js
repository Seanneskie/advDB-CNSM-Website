const express = require('express');
const router = express.Router();
const {
    addProposal,
    deleteProposal,
    updateProposal,
    getProposalById,
    getAllProposals,
    increaseAgreedVotes,
    increaseDisagreedVotes,
} = require('../controllers/projectproposal.controller');

// ... other code ...

// Routes for Project Proposals
router.post('/', addProposal); // Create a project proposal
router.get('/', getAllProposals); // Get all project proposals
router.get('/:id', getProposalById); // Get a project proposal by ID
router.patch('/:id', updateProposal); // Update a project proposal by ID
router.delete('/:id', deleteProposal); // Delete a project proposal by ID

// Route to increase agreed votes
router.patch('/vote/agree/:id', increaseAgreedVotes);

// Route to increase disagreed votes
router.patch('/vote/disagree/:id', increaseDisagreedVotes);

// ... other code ...

module.exports = router;

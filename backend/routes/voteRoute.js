const express = require('express');
const router = express.Router();
const {
    getVotesAll,
    createVotes,
    getVotesById,
    updateVotesById,
    deleteVotesById,
} = require('../controllers/vote.controller'); // Import the Votes controller

// GET all votes
router.get('/', getVotesAll);

// CREATE a new vote
router.post('/', createVotes);

// GET a vote by ID
router.get('/:id', getVotesById);

// UPDATE a vote by ID
router.put('/:id', updateVotesById);

// DELETE a vote by ID
router.delete('/:id', deleteVotesById);

module.exports = router;

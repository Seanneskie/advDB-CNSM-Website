const express = require('express');
const router = express.Router();
const {
    getVotingsAll,
    createVoting,
    getVotingById,
    updateVotingById,
    deleteVotingById,
} = require('../controllers/voting.controller');

// Routes for voting
router.get('/', getVotingsAll);
router.post('/', createVoting);
router.get('/:id', getVotingById);
router.put('/:id', updateVotingById);
router.delete('/:id', deleteVotingById);

module.exports = router;

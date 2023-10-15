const mongoose = require('mongoose');
const {Votes} = require('../models/votesModel'); // Import the Votes model
const {Voting} = require('../models/votingModel'); // Import the Voting model

// GET all votes
const getVotesAll = async (req, res) => {
    try {
        const votes = await Votes.find({}).sort({ _id: 1 });
        res.status(200).json(votes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// CREATE votes record
const createVotes = async (req, res) => {
    try {
        const { Agree, Disagree, voting } = req.body;

        // Check if any of the required parameters are missing
        if (typeof Agree !== 'number' || typeof Disagree !== 'number' || !voting) {
            return res.status(400).json({ error: 'Missing one or more required parameters (Agree, Disagree, voting)' });
        }

        // Validate that voting reference exists
        const votingExists = await Voting.findById(voting);

        if (!votingExists) {
            return res.status(400).json({ error: 'Invalid voting reference' });
        }

        const votes = new Votes({
            Agree,
            Disagree,
            voting,
        });

        await votes.save();
        res.status(201).json(votes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// GET one votes record by ID
const getVotesById = async (req, res) => {
    const id = req.params.id;
    try {
        const votes = await Votes.findById(id);
        if (!votes) {
            return res.status(404).json({ message: 'Votes record not found' });
        }
        res.status(200).json(votes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// UPDATE votes record by ID
const updateVotesById = async (req, res) => {
    const id = req.params.id;
    try {
        const { Agree, Disagree, voting } = req.body;

        // Check if any of the required parameters are missing
        if (typeof Agree !== 'number' || typeof Disagree !== 'number' || !voting) {
            return res.status(400).json({ error: 'Missing one or more required parameters (Agree, Disagree, voting)' });
        }

        // Validate that voting reference exists
        const votingExists = await Voting.findById(voting);

        if (!votingExists) {
            return res.status(400).json({ error: 'Invalid voting reference' });
        }

        const votes = await Votes.findByIdAndUpdate(id, req.body, { new: true });
        if (!votes) {
            return res.status(404).json({ message: 'Votes record not found' });
        }
        res.status(200).json(votes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE votes record by ID
const deleteVotesById = async (req, res) => {
    const id = req.params.id;
    try {
        const votes = await Votes.findByIdAndRemove(id);
        if (!votes) {
            return res.status(404).json({ message: 'Votes record not found' });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getVotesAll,
    createVotes,
    getVotesById,
    updateVotesById,
    deleteVotesById,
};

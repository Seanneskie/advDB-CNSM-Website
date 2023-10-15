const { Voting } = require('../models/votingModel');
const { Student } = require('../models/studentModel');
const { ProjectProposal } = require('../models/projectproposalModel');

// GET all voting records
const getVotingsAll = async (req, res) => {
    try {
        const votings = await Voting.find({}).sort({ date: 1 });
        res.status(200).json(votings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// CREATE voting record
const createVoting = async (req, res) => {
    try {
        const { student, vote, date, project } = req.body;

        // Check if any of the required parameters are missing
        if (!student || typeof vote === 'undefined' || !date) {
            return res.status(400).json({ error: 'Missing one or more required parameters (student, vote, date)' });
        }

        // Validate that student reference exists
        const studentExists = await Student.findById(student);

        // Set project and vote to null if they don't exist or are invalid
        const projectExists = project ? await ProjectProposal.findById(project) : null;
        const voteExists = typeof vote === 'boolean' ? vote : null;

        const voting = new Voting({
            student,
            vote: voteExists,
            date,
            project: projectExists,
        });

        await voting.save();
        res.status(201).json(voting);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// GET one voting record by ID
const getVotingById = async (req, res) => {
    const id = req.params.id;
    try {
        const voting = await Voting.findById(id);
        if (!voting) {
            return res.status(404).json({ message: 'Voting record not found' });
        }
        res.status(200).json(voting);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// UPDATE voting record by ID
const updateVotingById = async (req, res) => {
    const id = req.params.id;
    try {
        const { student, vote, date, project } = req.body;

        // Check if any of the required parameters are missing
        if (!student || typeof vote === 'undefined' || !date || !project) {
            return res.status(400).json({ error: 'Missing one or more required parameters (student, vote, date, project)' });
        }

        // Validate that student and project references exist
        const studentExists = await Student.findById(student);
        const projectExists = await ProjectProposal.findById(project);

        if (!studentExists || !projectExists) {
            return res.status(400).json({ error: 'Invalid student or project reference' });
        }

        const voting = await Voting.findByIdAndUpdate(id, req.body, { new: true });
        if (!voting) {
            return res.status(404).json({ message: 'Voting record not found' });
        }
        res.status(200).json(voting);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE voting record by ID
const deleteVotingById = async (req, res) => {
    const id = req.params.id;
    try {
        const voting = await Voting.findByIdAndRemove(id);
        if (!voting) {
            return res.status(404).json({ message: 'Voting record not found' });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getVotingsAll,
    createVoting,
    getVotingById,
    updateVotingById,
    deleteVotingById,
};

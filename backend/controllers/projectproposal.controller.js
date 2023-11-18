const { ProjectProposal } = require('../models/projectproposalModel');

// Add Proposal
async function addProposal(req, res) {
    try {
        const proposal = new ProjectProposal(req.body);
        await proposal.save();
        res.status(201).json(proposal);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Delete Proposal
async function deleteProposal(req, res) {
    try {
        const proposal = await ProjectProposal.findByIdAndDelete(req.params.id);
        if (!proposal) {
            return res.status(404).json({ error: 'Proposal not found' });
        }
        res.json(proposal);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update Proposal
async function updateProposal(req, res) {
    try {
        const proposal = await ProjectProposal.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!proposal) {
            return res.status(404).json({ error: 'Proposal not found' });
        }
        res.json(proposal);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get Proposal by ID
async function getProposalById(req, res) {
    try {
        const proposal = await ProjectProposal.findById(req.params.id);
        if (!proposal) {
            return res.status(404).json({ error: 'Proposal not found' });
        }
        res.json(proposal);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get All Proposals
async function getAllProposals(req, res) {
    try {
        const proposals = await ProjectProposal.find();
        res.json(proposals);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Increase Agreed Votes
async function increaseAgreedVotes(req, res) {
    try {
        const proposal = await ProjectProposal.findByIdAndUpdate(
            req.params.id,
            { $inc: { agreedVotes: 1 } },
            { new: true }
        );
        if (!proposal) {
            return res.status(404).json({ error: 'Proposal not found' });
        }
        res.json(proposal);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Increase Disagreed Votes
async function increaseDisagreedVotes(req, res) {
    try {
        const proposal = await ProjectProposal.findByIdAndUpdate(
            req.params.id,
            { $inc: { disagreedVotes: 1 } },
            { new: true }
        );
        if (!proposal) {
            return res.status(404).json({ error: 'Proposal not found' });
        }
        res.json(proposal);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    addProposal,
    deleteProposal,
    updateProposal,
    getProposalById,
    getAllProposals,
    increaseAgreedVotes,
    increaseDisagreedVotes,
};

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// model imports for foreign keys
const Student = require('./studentModel');
const Proposal = require('./projectproposalModel');

const votingSchema = new Schema({
    student:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    vote: Boolean,
    date: Date,
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProjectProposal'
    }
})

const Voting = mongoose.model('Voting', votingSchema);

module.exports = {Voting}
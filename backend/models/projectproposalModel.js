const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// model imports for foreign keys
const Student = require('./studentModel');
const Organization = require('./organizationModel');

const projectproposalSchema = new Schema({
    proponent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    start_date: Date,
    project_name: String,
    ETA: String,
    status: String,
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization'
    },
    agreedVotes: {
        type: Number,
        default: 0
    },
    disagreedVotes: {
        type: Number,
        default: 0
    },
});

const ProjectProposal = mongoose.model('ProjectProposal', projectproposalSchema);

module.exports = { ProjectProposal };

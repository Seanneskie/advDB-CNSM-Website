const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// model imports for foreign keys
const Student = require('./studentModel');
const Organization = require('./organizationModel');
const Votes = require('./votesModel');

const projectproposalSchema = new Schema ({
    proponent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    start_date: Date,
    end_date: Date,
    project_name: String,
    ETA: String,
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization'
    },
    Votes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Votes'
    }

    
})

const ProjectProposal = mongoose.model('ProjectProposal', projectproposalSchema);

module.exports = {ProjectProposal}
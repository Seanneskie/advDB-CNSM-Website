const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// model imports for foreign keys
const Student = require('./studentModel');
const Organization = require('./organizationModel');

const eventSchema = new Schema({
    name: String,
    org: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization'
    },
    time_start: Date,
    time_end: Date,
    facilitator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    description: String,
    location: String
})


const Event = mongoose.model('Events', eventSchema);

module.exports = {Event}
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Model imports for foreign keys
const Organization = require('./organizationModel');
const Events = require('./eventsModel');
const Student = require('./studentModel');

const finesSchema = new Schema({
    name: String,
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization'
    },
    date_of_penalty: Date,
    amount: Number,
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }
});

const Fines = mongoose.model('Fines', finesSchema);

module.exports = { Fines };

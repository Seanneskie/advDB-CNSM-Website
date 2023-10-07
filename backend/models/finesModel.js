const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// model imports for foreign keys
const Organization = require('./organizationModel');
const Events = require('./eventsModel');

const finesSchema = new Schema({
    name: String,
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization'
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Events'
    },
    date_of_penalty: Date,
    amount: Number
})

const Fines = mongoose.model('Fines', finesSchema)

module.exports = {Fines}

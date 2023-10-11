const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// model imports for foreign keys
const Organization = require('./organizationModel');

const classSchema = new Schema({
    description: String,
    org: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization'
    }
});

const Classification = mongoose.model('Classification',  classSchema);

module.exports = {Classification}



const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// model imports for foreign keys
const Student = require('./studentModel');

const organizationSchema = new Schema({
    name: String,
    head: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    org_location: String
});


const Organization = mongoose.model('Organization', organizationSchema);

module.exports = {Organization}
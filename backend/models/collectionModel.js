const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// model imports for foreign keys
const Student = require('./studentModel');
const Attendance = require('./attendanceModel');

const collectionSchema = new Schema ({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    attendance:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    total: Number,
})

const Collection = mongoose.model('Collection', collectionSchema);

module.exports = {Collection}
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// model imports for foreign keys
const Student = require('./studentModel');
const Event = require('./eventsModel');
const Fines = require('./finesModel');


const attendanceSchema = new Schema ({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    },
    fines: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fines'
    },
    present: String,
    excused: Boolean,
    fines_amount: Number
})

const Attendance = mongoose.model('Attendance',  attendanceSchema);

module.exports = {Attendance}
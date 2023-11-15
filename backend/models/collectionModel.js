const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// model imports for foreign keys
const Student = require('./studentModel');
const Attendance = require('./attendanceModel');

const collectionSchema = new Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    attendance: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attendance'
    },
    total: Number,
});

// Add a pre-save hook to calculate and save the total fines
collectionSchema.pre('save', async function (next) {
    const studentId = this.student;
    const ObjectId = mongoose.Types.ObjectId;

    const totalFines = await this.constructor.aggregate([
        {
            $match: { student: new ObjectId(studentId) }
        },
        {
            $group: {
                _id: '$student',
                total: { $sum: '$attendance.fines_amount' }
            }
        }
    ]);

    this.total = totalFines.length > 0 ? totalFines[0].total : 0;
    next();
});

const Collection = mongoose.model('Collection', collectionSchema);

module.exports = { Collection };

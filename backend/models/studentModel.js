const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// model imports for foreign keys
const Department = require('./departmentModel');
const Classification = require('./classModel');
const Course = require('./courseModel');


const studentSchema = new Schema({
    first_name: String,
    last_name: String,
    middle_name: String,
    year_level: String,
    student_id: String,
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department'
    },
    classification: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classification'
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    house_no: String,
    street: String,
    baranggay: String,
    city: String,
    province: String,
    zip_code: String,
    contact:  String,
    blood_type: String,
    email: String,
});

const Student = mongoose.model('Student', studentSchema);


module.exports = {Student}
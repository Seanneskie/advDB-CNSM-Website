const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: String,
    track: String,
    curriculum_rv_date: String,
    description: String
});

const Course = mongoose.model('Course', courseSchema);

module.exports = {Course}
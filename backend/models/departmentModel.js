const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const departmentSchema = new Schema({
    name: String,
    dept_head: String,
    dept_bldg: String
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = {Department}
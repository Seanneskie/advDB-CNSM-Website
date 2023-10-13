const express = require('express');
const router = express.Router();
const { Student } = require('../models/studentModel'); // model Path
const { Department } = require('../models/departmentModel'); // Import the Department model
const { Classification } = require('../models/classModel'); // Import the Classification model
const { Course } = require('../models/courseModel'); // Import the Course model

// GET all students
const getStudentsAll = async (req, res) => {
    try {
        const students = await Student.find({}).sort({ last_name: 1, first_name: 1 });
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// CREATE student
const createStudent = async (req, res) => {
    try {
        const { first_name, last_name, middle_name, year_level, year_enrolled, department, classification, course, address, contact, blood_type, email } = req.body;

        // Check if any of the required parameters are missing
        if (!first_name || !last_name || !year_level || !year_enrolled || !department || !classification || !course) {
            return res.status(400).json({ error: 'Missing one or more required parameters (first_name, last_name, year_level, year_enrolled, department, classification, course)' });
        }

        // Validate that department, classification, and course references exist
        const departmentExists = await Department.findById(department);
        const classificationExists = await Classification.findById(classification);
        const courseExists = await Course.findById(course);

        if (!departmentExists || !classificationExists || !courseExists) {
            return res.status(400).json({ error: 'Invalid department, classification, or course reference' });
        }

        const student = new Student({
            first_name,
            last_name,
            middle_name,
            year_level,
            year_enrolled,
            department,
            classification,
            course,
            address,
            contact,
            blood_type,
            email,
        });

        await student.save();
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// GET one student
const getStudentById = async (req, res) => {
    const id = req.params.id;
    try {
        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// UPDATE student
const updateStudentById = async (req, res) => {
    const id = req.params.id;
    try {
        const { first_name, last_name, middle_name, year_level, year_enrolled, department, classification, course, address, contact, blood_type, email } = req.body;

        // Check if any of the required parameters are missing
        if (!first_name || !last_name || !year_level || !year_enrolled || !department || !classification || !course) {
            return res.status(400).json({ error: 'Missing one or more required parameters (first_name, last_name, year_level, year_enrolled, department, classification, course)' });
        }

        // Validate that department, classification, and course references exist
        const departmentExists = await Department.findById(department);
        const classificationExists = await Classification.findById(classification);
        const courseExists = await Course.findById(course);

        if (!departmentExists || !classificationExists || !courseExists) {
            return res.status(400).json({ error: 'Invalid department, classification, or course reference' });
        }

        const student = await Student.findByIdAndUpdate(id, req.body, { new: true });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE student
const deleteStudentById = async (req, res) => {
    const id = req.params.id;
    try {
        const student = await Student.findByIdAndRemove(id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getStudentsAll,
    createStudent,
    getStudentById,
    updateStudentById,
    deleteStudentById,
};

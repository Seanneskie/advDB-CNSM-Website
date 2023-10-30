const express = require('express');
const router = express.Router();
const multer = require('multer'); // Import multer for handling file uploads
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
        const {
            first_name,
            last_name,
            middle_name,
            year_level,
            student_id,
            department,
            classification,
            course,
            house_no,
            street,
            baranggay,
            city,
            province,
            zip_code,
            contact,
            blood_type,
            email,
        } = req.body;

        // Check if any of the required parameters are missing
        if (!first_name || !last_name || !year_level || !department || !classification || !course) {
            return res.status(400).json({ error: 'Missing one or more required parameters' });
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
            student_id,
            department,
            classification,
            course,
            house_no,
            street,
            baranggay,
            city,
            province,
            zip_code,
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
    try {
        // Check if the student ID is provided in the URL params
        const studentId = req.params.id;
        if (!studentId) {
            return res.status(400).json({ error: 'Student ID is missing from URL params' });
        }

        // Find the student by ID
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        // Update student properties based on the request
        student.first_name = req.body.first_name || student.first_name;
        student.last_name = req.body.last_name || student.last_name;
        student.middle_name = req.body.middle_name || student.middle_name;
        student.year_level = req.body.year_level || student.year_level;
        student.student_id = req.body.student_id || student.student_id;
        student.department = req.body.department || student.department;
        student.classification = req.body.classification || student.classification;
        student.course = req.body.course || student.course;
        student.house_no = req.body.house_no || student.house_no;
        student.street = req.body.street || student.street;
        student.baranggay = req.body.baranggay || student.baranggay;
        student.city = req.body.city || student.city;
        student.province = req.body.province || student.province;
        student.zip_code = req.body.zip_code || student.zip_code;
        student.contact = req.body.contact || student.contact;
        student.blood_type = req.body.blood_type || student.blood_type;
        student.email = req.body.email || student.email;

        await student.save();
        res.status(200).json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
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

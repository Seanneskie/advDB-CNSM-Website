const express = require('express');
const router = express.Router();
const {
    getStudentsAll,
    createStudent,
    getStudentById,
    updateStudentById,
    deleteStudentById,
} = require('../controllers/student.controller');

// Route for getting all students
router.get('/', getStudentsAll);

// Route for creating a new student
router.post('/', createStudent);

// Route for getting a specific student by ID
router.get('/:id', getStudentById);

// Route for updating a specific student by ID
router.patch('/:id', updateStudentById);

// Route for deleting a specific student by ID
router.delete('/:id', deleteStudentById);

module.exports = router;

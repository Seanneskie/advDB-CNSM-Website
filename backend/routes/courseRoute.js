const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller')

// Route for getting all courses
router.get('/', courseController.getCoursesAll);

// Route for creating a new course
router.post('/', courseController.createCourse);

// Route for getting a specific course by ID
router.get('/:id', courseController.getCourseById);

// Route for updating a specific course by ID
router.patch('/:id', courseController.updateCourseById);

// Route for deleting a specific course by ID
router.delete('/:id', courseController.deleteCourseById);

module.exports = router;

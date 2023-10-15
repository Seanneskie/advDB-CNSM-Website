const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendance.controller');

// Route for getting all attendance records
router.get('/', attendanceController.getAttendanceAll);

// Route for creating a new attendance record
router.post('/', attendanceController.createAttendance);

// Route for getting a specific attendance record by ID
router.get('/:id', attendanceController.getAttendanceById);

// Route for updating a specific attendance record by ID
router.put('/:id', attendanceController.updateAttendanceById);

// Route for deleting a specific attendance record by ID
router.delete('/:id', attendanceController.deleteAttendanceById);

module.exports = router;

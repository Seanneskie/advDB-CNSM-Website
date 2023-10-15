const { Attendance } = require('../models/attendanceModel'); // Import the Attendance model
const { Student } = require('../models/studentModel'); // Import the Student model
const { Event } = require('../models/eventsModel'); // Import the Event model
const { Fines } = require('../models/finesModel'); // Import the Fines model

// GET all attendance records
const getAttendanceAll = async (req, res) => {
    try {
        const attendance = await Attendance.find({}).sort({ _id: 1 });
        res.status(200).json(attendance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// CREATE attendance record
const createAttendance = async (req, res) => {
    try {
        const { student, event, fines, present, excused, fines_amount } = req.body;

        // Check if any of the required parameters are missing
        if (!student || !event || !present) {
            return res.status(400).json({ error: 'Missing one or more required parameters (student, event, present)' });
        }

        // Validate that student, event, and fines references exist
        const studentExists = await Student.findById(student);
        const eventExists = await Event.findById(event);
        const finesExists = fines ? await Fines.findById(fines) : null;

        if (!studentExists || !eventExists || (fines && !finesExists)) {
            return res.status(400).json({ error: 'Invalid student, event, or fines reference' });
        }

        const attendanceRecord = new Attendance({
            student,
            event,
            fines,
            present,
            excused,
            fines_amount,
        });

        await attendanceRecord.save();
        res.status(201).json(attendanceRecord);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// GET one attendance record by ID
const getAttendanceById = async (req, res) => {
    const id = req.params.id;
    try {
        const attendanceRecord = await Attendance.findById(id);
        if (!attendanceRecord) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }
        res.status(200).json(attendanceRecord);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// UPDATE attendance record by ID
const updateAttendanceById = async (req, res) => {
    const id = req.params.id;
    try {
        const { student, event, fines, present, excused, fines_amount } = req.body;

        // Check if any of the required parameters are missing
        if (!student || !event || !present) {
            return res.status(400).json({ error: 'Missing one or more required parameters (student, event, present)' });
        }

        // Validate that student, event, and fines references exist
        const studentExists = await Student.findById(student);
        const eventExists = await Event.findById(event);
        const finesExists = fines ? await Fines.findById(fines) : null;

        if (!studentExists || !eventExists || (fines && !finesExists)) {
            return res.status(400).json({ error: 'Invalid student, event, or fines reference' });
        }

        const attendanceRecord = await Attendance.findByIdAndUpdate(id, req.body, { new: true });
        if (!attendanceRecord) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }
        res.status(200).json(attendanceRecord);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE attendance record by ID
const deleteAttendanceById = async (req, res) => {
    const id = req.params.id;
    try {
        const attendanceRecord = await Attendance.findByIdAndRemove(id);
        if (!attendanceRecord) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAttendanceAll,
    createAttendance,
    getAttendanceById,
    updateAttendanceById,
    deleteAttendanceById,
};

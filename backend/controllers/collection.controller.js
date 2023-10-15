const { Collection } = require('../models/collectionModel'); // Import the Collection model
const { Student } = require('../models/studentModel'); // Import the Student model
const { Attendance } = require('../models/attendanceModel'); // Import the Attendance model

// GET all collections
const getCollectionsAll = async (req, res) => {
    try {
        const collections = await Collection.find({}).sort({ _id: 1 });
        res.status(200).json(collections);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// CREATE collection
const createCollection = async (req, res) => {
    try {
        const { student, attendance, total } = req.body;

        // Check if any of the required parameters are missing
        if (!student || !attendance || !total) {
            return res.status(400).json({ error: 'Missing one or more required parameters (student, attendance, total)' });
        }

        // Validate that student and attendance references exist
        const studentExists = await Student.findById(student);
        const attendanceExists = await Attendance.findById(attendance);

        if (!studentExists || !attendanceExists) {
            return res.status(400).json({ error: 'Invalid student or attendance reference' });
        }

        const collection = new Collection({
            student,
            attendance,
            total,
        });

        await collection.save();
        res.status(201).json(collection);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// GET one collection by ID
const getCollectionById = async (req, res) => {
    const id = req.params.id;
    try {
        const collection = await Collection.findById(id);
        if (!collection) {
            return res.status(404).json({ message: 'Collection not found' });
        }
        res.status(200).json(collection);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// UPDATE collection by ID
const updateCollectionById = async (req, res) => {
    const id = req.params.id;
    try {
        const { student, attendance, total } = req.body;

        // Check if any of the required parameters are missing
        if (!student || !attendance || !total) {
            return res.status(400).json({ error: 'Missing one or more required parameters (student, attendance, total)' });
        }

        // Validate that student and attendance references exist
        const studentExists = await Student.findById(student);
        const attendanceExists = await Attendance.findById(attendance);

        if (!studentExists || !attendanceExists) {
            return res.status(400).json({ error: 'Invalid student or attendance reference' });
        }

        const collection = await Collection.findByIdAndUpdate(id, req.body, { new: true });
        if (!collection) {
            return res.status(404).json({ message: 'Collection not found' });
        }
        res.status(200).json(collection);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE collection by ID
const deleteCollectionById = async (req, res) => {
    const id = req.params.id;
    try {
        const collection = await Collection.findByIdAndRemove(id);
        if (!collection) {
            return res.status(404).json({ message: 'Collection not found' });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getCollectionsAll,
    createCollection,
    getCollectionById,
    updateCollectionById,
    deleteCollectionById,
};

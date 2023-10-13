const express = require('express');
const router = express.Router();
const { Course } = require('../models/courseModel'); // model Path

// GET all courses
const getCoursesAll = async (req, res) => {
    try {
        const courses = await Course.find({}).sort({ name: 1 });
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// CREATE course
const createCourse = async (req, res) => {
    try {
        const { name, track, curriculum_rv_date, description } = req.body;

        // Check if any of the required parameters are missing
        if (!name || !track || !curriculum_rv_date || !description) {
            return res.status(400).json({ error: 'Missing one or more required parameters (name, track, curriculum_rv_date, description)' });
        }

        const course = new Course({
            name,
            track,
            curriculum_rv_date,
            description,
        });

        await course.save();
        res.status(201).json(course);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// GET one course
const getCourseById = async (req, res) => {
    const id = req.params.id;
    try {
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// UPDATE course
const updateCourseById = async (req, res) => {
    const id = req.params.id;
    try {
        const { name, track, curriculum_rv_date, description } = req.body;

        // Check if any of the required parameters are missing
        if (!name || !track || !curriculum_rv_date || !description) {
            return res.status(400).json({ error: 'Missing one or more required parameters (name, track, curriculum_rv_date, description)' });
        }

        const course = await Course.findByIdAndUpdate(id, req.body, { new: true });
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE course
const deleteCourseById = async (req, res) => {
    const id = req.params.id;
    try {
        const course = await Course.findByIdAndRemove(id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getCoursesAll,
    createCourse,
    getCourseById,
    updateCourseById,
    deleteCourseById,
};

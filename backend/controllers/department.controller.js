const express = require('express');
const router = express.Router();
const { Department } = require('../models/departmentModel'); // model Path

// GET all department
const getDepartmentsAll = async (req, res) => {
    try {
        const departments = await Department.find({}).sort({ name: 1 });
        res.status(200).json(departments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// CREATE department
const createDepartment = async (req, res) => {
    try {
        const { name, dept_head, dept_bldg } = req.body;

        // Check if any of the required parameters are missing
        if (!name || !dept_head || !dept_bldg) {
            return res.status(400).json({ error: 'Missing one or more required parameters (name, dept_head, dept_building)' });
        }

        const department = new Department({
            name,
            dept_head,
            dept_bldg,
        });

        await department.save();
        res.status(201).json(department);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// GET one department
const getDepartmentById = async (req, res) => {
    const id = req.params.id;
    try {
        const department = await Department.findById(id);
        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }
        res.status(200).json(department);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// UPDATE department
const updateDepartmentById = async (req, res) => {
    const id = req.params.id;
    try {
        const { name, dept_head, dept_bldg } = req.body;

        // Check if any of the required parameters are missing
        if (!name || !dept_head || !dept_bldg) {
            return res.status(400).json({ error: 'Missing one or more required parameters (name, dept_head, dept_building)' });
        }

        const department = await Department.findByIdAndUpdate(id, req.body, { new: true });
        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }
        res.status(200).json(department);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteDepartmentById = async (req, res) => {
    const id = req.params.id;
    try {
        const department = await Department.findByIdAndRemove(id);
        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }
        res.status(204).json({ message: 'Department deleted successfully' }); // Add the success message here
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    getDepartmentsAll,
    createDepartment,
    getDepartmentById,
    updateDepartmentById,
    deleteDepartmentById,
};

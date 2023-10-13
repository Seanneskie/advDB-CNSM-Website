const express =  require('express');
const router = express.Router();

// controllers
const {
    getDepartmentsAll,
    createDepartment,
    getDepartmentById,
    updateDepartmentById,
    deleteDepartmentById,
} = require('../controllers/department.controller')


// GET All Department
router.get('/', getDepartmentsAll);

// GET Single Department
router.get('/:id', getDepartmentById);

// POST Department
router.post('/', createDepartment);

// DELETE Department
router.delete('/:id',  deleteDepartmentById);

// Update Department
router.patch('/:id', updateDepartmentById);

module.exports = router;
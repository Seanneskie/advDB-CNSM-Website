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

router.get('/', getDepartmentsAll);

router.get('/:id', getDepartmentById);

router.post('/', createDepartment);

router.delete('/:id',  deleteDepartmentById);

router.patch('/id', updateDepartmentById);

module.exports = router;
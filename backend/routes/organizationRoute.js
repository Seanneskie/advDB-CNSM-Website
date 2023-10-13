const express =  require('express');
const router = express.Router();

// controllers
const {
    getOrganizationsAll,
    createOrganization,
    getOrganizationById,
    updateOrganizationById,
    deleteOrganizationById,
} = require('../controllers/organization.controller')


// GET All Department
router.get('/', getOrganizationsAll);

// GET Single Department
router.get('/:id', getOrganizationById);

// POST Department
router.post('/', createOrganization);

// DELETE Department
router.delete('/:id',  deleteOrganizationById);

// Update Department
router.patch('/:id', updateOrganizationById);

module.exports = router;

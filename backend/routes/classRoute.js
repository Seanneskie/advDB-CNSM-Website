const express =  require('express');
const router = express.Router();

const {
    getClassificationsAll,
    createClassification,
    getClassificationById,
    updateClassificationById,
    deleteClassificationById,
} = require('../controllers/class.controller')


// GET All Classification
router.get('/', getClassificationsAll);

// GET Single Classification
router.get('/:id', getClassificationById);

// POST Classification
router.post('/', createClassification);

// DELETE Classification
router.delete('/:id',  deleteClassificationById);

// Update Classification
router.patch('/:id', updateClassificationById);

module.exports = router;
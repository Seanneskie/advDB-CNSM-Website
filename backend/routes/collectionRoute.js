const express = require('express');
const router = express.Router();
const {
    getCollectionsAll,
    createCollection,
    getCollectionById,
    updateCollectionById,
    deleteCollectionById,
} = require('../controllers/collection.controller');

// Routes for collections
router.get('/', getCollectionsAll);
router.post('/', createCollection);
router.get('/:id', getCollectionById);
router.put('/:id', updateCollectionById);
router.delete('/:id', deleteCollectionById);

module.exports = router;

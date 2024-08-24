const express = require('express');
const router = express.Router();
const hexController = require('../controllers/hexController');

router.get('/', hexController.getAllValues);
//router.get('/:id', notesController.getNote);
router.post('/', hexController.createValue);
router.put('/:category', hexController.updateValue);
//router.delete('/:id', habitsController.deleteHabit);

module.exports = router;
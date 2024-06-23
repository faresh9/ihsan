const express = require('express');
const router = express.Router();
const habitsController = require('../controllers/habitsController');

router.get('/', habitsController.getAllHabits);
//router.get('/:id', notesController.getNote);
router.post('/', habitsController.createHabit);
router.put('/:id', habitsController.updateHabit);
router.delete('/:id', habitsController.deleteHabit);

module.exports = router;
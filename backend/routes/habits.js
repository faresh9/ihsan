const express = require('express');
const router = express.Router();
const habitsController = require('../controllers/habitsController');

router.get('/', habitsController.getAllHabits);
//router.get('/:id', notesController.getNote);
router.post('/', habitsController.createHabit);
//router.put('/:id', notesController.updateNote);
//router.delete('/:id', notesController.deleteNote);

module.exports = router;
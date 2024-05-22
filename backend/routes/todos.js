const express = require('express');
const router = express.Router();
const todosController = require('../controllers/todosController');

router.get('/', todosController.getAllTodos);
router.get('/:_id', todosController.getTodo);
router.post('/', todosController.createTodo);
router.put('/:_id', todosController.updateTodo);
router.delete('/:_id', todosController.deleteTodo);

module.exports = router;
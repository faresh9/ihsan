const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

router.get('/', eventController.getAllEvents);
router.get('/:_id', eventController.getEvent);
router.post('/', eventController.createEvent);
router.put('/:_id', eventController.updateEvent);
router.delete('/:_id', eventController.deleteEvent);

module.exports = router;
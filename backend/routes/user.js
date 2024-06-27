const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUserInfo);
router.post('/', userController.createUserInfo);
router.get('/:id', userController.getUserInfo);
router.put('/:id', userController.updateUserInfo);

module.exports = router;
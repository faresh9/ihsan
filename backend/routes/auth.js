const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


router.post('/register', authController.addNewUser);
router.post('/login', authController.userLogin);



module.exports = router;
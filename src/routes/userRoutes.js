const express = require('express');
const userController = require('../controllers/userController');
const { verifyToken } = require('../util/auth');

const router = express.Router();

router.post('/register', userController.userRegister);
router.post('/login',userController.userLogin);

module.exports = router;

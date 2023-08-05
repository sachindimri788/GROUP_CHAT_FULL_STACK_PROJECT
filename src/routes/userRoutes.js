const express = require('express');
const userController = require('../controllers/userController');
const { verifyToken } = require('../util/auth');

const router = express.Router();

router.post('/register', userController.userRegister);
router.post('/login',userController.userLogin);

// router.post('/chats',verifyToken,userController.userChats);
// router.get('/chats',verifyToken,userController.getChats)


// router.post('/createGroup',verifyToken,userController.createGroup)
// router.get('/showGroup',verifyToken,userController.showGroup)

// router.get('/deleteGroup',verifyToken,userController.deleteGroup);
// router.post('/addMember',verifyToken,userController.addMember)
// router.post('/deleteMember',verifyToken,userController.deleteMember);
// router.post('/makeAdmin',verifyToken,userController.makeAdmin);

// router.get('/showUserInGroup',verifyToken,userController.showUserInGroup);

module.exports = router;

const express = require('express');
const groupController = require('../controllers/groupController');
const { verifyToken } = require('../util/auth');

const router = express.Router();

router.post('/chats',verifyToken,groupController.userChats);
//router.get('/chats',verifyToken,groupController.getChats)


router.post('/createGroup',verifyToken,groupController.createGroup)
router.get('/showGroup',verifyToken,groupController.showGroup)

router.get('/deleteGroup',verifyToken,groupController.deleteGroup);
router.post('/addMember',verifyToken,groupController.addMember);
router.post('/deleteMember',verifyToken,groupController.deleteMember);
router.post('/makeAdmin',verifyToken,groupController.makeAdmin);

router.get('/showUserInGroup',verifyToken,groupController.showUserInGroup);

module.exports = router;

var express = require('express');
var router = express.Router();

var chatController = require('../../controllers/chat.controller');

router.post('/post', chatController.postchat);
router.post('/login', chatController.postuser);
router.post('/postchat', chatController.postnewchat);
module.exports = router;
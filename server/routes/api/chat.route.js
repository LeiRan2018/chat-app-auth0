var express = require('express');
var router = express.Router();

var chatController = require('../../controllers/chat.controller');

router.get('/:id', chatController.getchat);
// router.post('/:id/post', chatController.postchat);
router.post('/post', chatController.postchat);
router.post('/login', chatController.postuser);
module.exports = router;
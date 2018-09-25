var express = require('express');
var router = express.Router();

var chatController = require('../../controllers/chat.controller');

router.get('/:id', chatController.getchat);
router.post('/:id/post', chatController.postchat);
module.exports = router;
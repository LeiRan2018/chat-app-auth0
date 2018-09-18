var express = require('express');
var router = express.Router();

var chatController = require('../../controllers/chat.controller');

router.get('/:id', chatController.getchat);

module.exports = router;
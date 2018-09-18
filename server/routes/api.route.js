var express = require('express')

var router = express.Router()
var chat = require('./api/chat.route');

router.use('/chat', chat);

module.exports = router;
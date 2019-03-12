var express = require('express')

var router = express.Router()
var chat = require('./api/chat.route');
var login = require('./api/login.route');
var sign = require('./api/sign.route');
var room = require('./api/room.route');

router.use('/chat', chat);
router.use('/login', login);
router.use('/sign', sign);
router.use('/room', room);

module.exports = router;
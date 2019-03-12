var express = require('express');
var router = express.Router();

var roomController = require('../../controllers/room.controller');

router.post('/', roomController.postroom);
module.exports = router;
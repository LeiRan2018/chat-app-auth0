var express = require('express');
var router = express.Router();

var oneController = require('../../controllers/one.controller');

router.post('/', oneController.postone);
module.exports = router;
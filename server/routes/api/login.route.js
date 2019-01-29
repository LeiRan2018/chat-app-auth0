var express = require('express');
var router = express.Router();

var loginController = require('../../controllers/login.controller');

router.post('/', loginController.postlogin);
router.post('/out', loginController.postlogout);

module.exports = router;
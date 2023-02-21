var express = require('express');
var router = express.Router();

const controller = require('./controller');

router.route('/').get(controller.getCounters);

module.exports = router;

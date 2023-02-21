var express = require('express');
var router = express.Router();
const controller = require('./controller');
router.post('/signup', controller.createAdmin);
router.post(`/change`, controller.ChangePasswordLink);
router.post('/login', controller.login);
router.post('/logOut', controller.logOut);
router.post('/change/:token', controller.Changepassword);

module.exports = router;

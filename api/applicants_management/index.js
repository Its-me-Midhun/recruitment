var express = require('express');
const { imageUpload } = require('../../middlewares/multer.js');
var router = express.Router();

const controller = require('./controller');

router
  .route('/')
  .get(controller.applicantsList)
  .post(imageUpload, controller.postApplicants);
router.get('/download', controller.downloadApplicant);

module.exports = router;

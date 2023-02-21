var express = require('express');
var router = express.Router();

const controller = require('./controller');
const jobsValidation = require('./validator');

router
  .route('/')
  .get(controller.Jobslist)
  .post(jobsValidation, controller.postJobs)
  .patch(controller.patchJobsposted)
  .delete(controller.deleteJobsposted);
module.exports = router;

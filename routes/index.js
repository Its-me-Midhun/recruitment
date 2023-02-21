var express = require('express');
var router = express.Router();

var jobsRouter = require('../api/jobs_management/index');
var applicantsRouter = require('../api/applicants_management/index');
var adminRouter = require('../api/admin_management/index');
var dashboardRouter = require('../api/Dashboard/index');

router.use('/jobs', jobsRouter);
router.use('/applicants', applicantsRouter);
router.use('/admin', adminRouter);
router.use('/dashboard', dashboardRouter);

module.exports = router;

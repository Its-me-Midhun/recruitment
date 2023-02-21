const {
  jobPosting,
  jobPatching,
  jobListing,
  deleteJobs,
} = require('../../helpers/jobs');

// get all the jobs
const Jobslist = async (req, res) => {
  let { id, job, Company_Name, Technologies, p, offset } = req.query;
  jobListing(req.body, id, job, Company_Name, Technologies, p, offset, res);
};

// post the jobs
const postJobs = async (req, res) => {
  jobPosting(req.body, res);
};
const patchJobsposted = (req, res) => {
  const { id } = req.query;
  jobPatching(req.body, id, res);
};

const deleteJobsposted = (req, res) => {
  const { id } = req.query;
  deleteJobs(req, id, res);
};

module.exports = { Jobslist, postJobs, patchJobsposted, deleteJobsposted };

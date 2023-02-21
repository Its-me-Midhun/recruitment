const Applicants = require('../../models/applicants_collection');
const Jobs = require('../../models/jobs_collection');

exports.getCounters = async (req, res) => {
  try {
    const applicantsCounter = await Applicants.find({});
    const jobsCounter = await Jobs.find({});
    res.json({
      success: true,
      Applicants: applicantsCounter.length,
      Jobs: jobsCounter.length,
    });
  } catch (e) {
    res.status(500).json({ success: false, msg: 'Unable To Display Count' });
  }
};

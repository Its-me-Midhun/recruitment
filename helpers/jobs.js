const Jobs = require('../models/jobs_collection');

const jobListing = async (
  req,
  id,
  job,
  Company_Name,
  Technologies,
  p,
  offset,
  res
) => {
  const page = +p || 0;
  const perPage = +offset || 10;
  try {
    const data = id
      ? await Jobs.findById(id)
      : job
      ? await Jobs.find({ Title: job })
      : Company_Name
      ? await Jobs.find({ Company_Name: Company_Name })
      : Technologies
      ? await Jobs.find({ Technologies: Technologies })
      : await Jobs.aggregate([
          {
            $project: {
              _id: 0,
            },
          },
          { $sort: { createdAt: -1 } },
          {
            $skip: page * perPage,
          },
          {
            $limit: perPage,
          },
        ]);
    res.json({
      success: true,
      msg: 'Data Retrieval Success',
      data: data,
    });
  } catch (e) {
    res.json({
      success: false,
      msg: e.message,
      data: data,
    });
  }
};
const jobPosting = async (req, res) => {
  const Jobs_available = new Jobs(req);
  Jobs_available.save((err) => {
    if (err) {
      res.json({
        success: false,
        msg: 'Error Occured while trying to add jobs',
        err: err.message,
      });
      res.status(400).json({
        success: false,
        msg: err.message,
      });
    }
    res.json({
      success: true,
      msg: 'Datas Added Succesfully',
    });
  });
};
const jobPatching = async (req, id, res) => {
  Jobs.findByIdAndUpdate(id, req, (err) => {
    if (err) {
      res.json({
        success: false,
        msg: 'Unable To Edit Datas',
        err: err.message,
      });
    }
    res.json({
      success: true,
      msg: 'Datas Edited Succesfully',
    });
  });
};
const deleteJobs = async (req, id, res) => {
  Jobs.findByIdAndDelete(id, (err) => {
    if (err) {
      res.json({
        success: false,
        msg: 'Unable To Delete Job',
        err: err.message,
      });
    }
    res.json({
      success: true,
      msg: 'Job Deleted Succesfully',
    });
  });
};
module.exports = { jobPosting, jobPatching, jobListing, deleteJobs };

const Applicants = require('../models/applicants_collection');

exports.applicantsListing = async (req, id, p, offset, res) => {
  const page = +p || 0;
  const perPage = +offset || 10;
  try {
    const data = id
      ? await Applicants.findById(id)
      : await Applicants.aggregate([
          {
            $project: {
              _id: 0,
            },
          },
          { $sort: { createdAt: -1 } },
          {
            $lookup: {
              from: 'jobs',
              localField: 'job_id',
              foreignField: '_id',
              as: 'Job_applied',
            },
          },
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
    res.json({ success: false, msg: 'Data Retrieval Failed', data: data });
  }
};
exports.Postingapplicants = async (req, applicants_Available, res) => {
  try {
    applicants_Available.save((err) => {
      if (err) {
        res.json({
          success: false,
          msg: 'Error Occured While trying to add applicants',
          err: err.message,
        });
        return res.status(500).json({
          success: false,
          msg: err.message,
        });
      }
      res.json({
        success: true,
        msg: 'Datas Added Succesfully',
      });
    });
  } catch (e) {
    res.json({
      success: false,
      msg: 'Unable To Add Data',
    });
  }
};
exports.patchingApplicants = async (req, id, res) => {
  Applicants.findByIdAndUpdate(id, req, (err) => {
    if (err) {
      res.json({
        success: false,
        msg: 'Unable To Edit Datas',
        err: err.message,
      });
    }
    res.json({
      success: true,
      msg: 'Edited Succesfully',
    });
  });
};

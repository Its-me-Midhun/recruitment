const {
  applicantsListing,
  Postingapplicants,
} = require('../../helpers/applicants');
const Applicants = require('../../models/applicants_collection');
const ExcelJS = require('exceljs');

// get all the applicants
const applicantsList = async (req, res) => {
  let { id, p, offset } = req.query;
  applicantsListing(req.body, id, p, offset, res);
};

// post the applicants
const postApplicants = async (req, res) => {
  const applicantspresent = await Applicants.find({ Email: req.body.Email });
  const applicants_Available = new Applicants({
    Name: req.body.Name,
    Phone_Number: req.body.Phone_Number,
    Email: req.body.Email,
    job_id: req.body.job_id,
    Resume: { data: req.file.path },
  });
  if (applicantspresent.length != 0) {
    res.json({
      success: false,
      msg: 'Applicant Present Already',
    });
  } else {
    Postingapplicants(req, applicants_Available, res);
  }
};

// download the applicants
const downloadApplicant = async (req, res) => {
  const myFieldData = await Applicants.find(
    {},
    { _id: 0, Name: 1, Phone_Number: 1, Resume: 1 }
  ).lean();
  // Convert the data to CSV format
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('My Field Data');

  // Add the data to the worksheet
  worksheet.columns = [
    { header: 'Name', key: 'Name' },
    { header: 'Phone_Number', key: 'Phone_Number' },
    { header: 'Resume', key: 'Resume' },
  ];
  worksheet.addRows(myFieldData);

  // Send the Excel file to the client as a download
  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  );
  res.setHeader(
    'Content-Disposition',
    'attachment; filename="myFieldData.xlsx"'
  );
  await workbook.xlsx.write(res);
};

module.exports = { applicantsList, postApplicants, downloadApplicant };

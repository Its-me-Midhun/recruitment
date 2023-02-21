const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const jobs = new Schema(
  {
    Title: {
      type: String,
      required: true,
    },
    Company_Name: {
      type: String,
      required: true,
    },
    Technologies: [
      {
        type: String,
        required: true,
      },
    ],
    Skills: [
      {
        type: String,
        required: true,
      },
    ],
    Benefits: [
      {
        type: String,
        required: true,
      },
    ],
    Experience: {
      type: String,
      required: true,
    },
    Salary: {
      type: Number,
      required: true,
    },
    Mode_of_work: {
      type: String,
      enum: ['OFFICE', 'WORK_FROM_HOME'],
      default: 'OFFICE',
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('jobs', jobs);

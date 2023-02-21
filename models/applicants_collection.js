const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const applicants = new Schema(
  {
    Name: {
      type: String,
      required: true,
      validate: {
        validator: function (name) {
          const regex = /^[a-zA-Z ]{2,30}$/;
          return regex.test(name);
        },
        message: (props) => `${props.value} is not a valid name.`,
      },
    },
    Phone_Number: {
      type: Number,
      required: true,
      validate: {
        validator: function (phone) {
          const regex = /^\d{10}$/;
          return regex.test(phone);
        },
        message: (props) => `${props.value} is not a valid phone number.`,
      },
    },
    Email: {
      type: String,
      required: true,
      lowercase: true,
      validate: {
        validator: function (email) {
          const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return regex.test(email);
        },
        message: (props) => `${props.value} is not a valid email address.`,
      },
    },
    Resume: {
      data: String,
    },
    job_id: {
      type: ObjectId,
      ref: 'jobs',
      index: true,
      required: true,
      validate: {
        validator: function (id) {
          const regex = /^[0-9a-fA-F]{24}$/;
          return regex.test(id);
        },
        message: (props) => `${props.value}is not a valid ID.`,
      },
    },
  },
  {
    timestamps: true,
  }
);
applicants.index({ job_id: 1 }, { unique: true });

module.exports = mongoose.model('applicants', applicants);

const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const admin = new Schema(
  {
    Name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    accessToken: {
      type: String,
      require: false,
    },
    salt: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

admin.statics.validatePassword = function (pass) {
  return /^(?=.*\d).{8,}$/.test(pass);
};

admin.statics.generateSalt = async function () {
  return await bcrypt.genSalt();
};

admin.statics.hashPassword = async function (pass, salt) {
  return await bcrypt.hash(pass, salt);
};

admin.statics.verifyPassword = async function (pass, hash, salt) {
  const hashPassword = await bcrypt.hash(pass, salt);
  if (hashPassword == hash) return true;
  else return false;
};

admin.statics.generateAuthToken = function (data) {
  let expiresIn = expireIn(10); //

  if (data.rememberMe) {
    console.log('entered----');
    expiresIn = expireIn(720);
  }

  return jwt.sign(
    {
      id: data._id,
      email: data.email,
      validity: data.password.concat(data._id).concat(data.email),
    },
    process.env.JWT_SECRET,
    { expiresIn }
  );
};

const expireIn = (numDays) => {
  const dateobj = new Date();
  return dateobj.setMinutes(dateobj.getMinutes() + numDays);
};

admin.statics.generateNewToken = function (data) {
  let expiresIn = expireIn(10); //

  if (data.rememberMe) {
    console.log('entered----');
    expiresIn = expireIn(60 * 60);
  }

  return jwt.sign(
    {
      id: data._id,
    },
    process.env.JWT_SECRET,
    { expiresIn }
  );
};
module.exports = mongoose.model('admin', admin);

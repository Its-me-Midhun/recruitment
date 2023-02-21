const jwt = require('jsonwebtoken');
const admin = require('../models/admin_login');

// Admin SignUp functionality
exports.CreateAdmins = async (req, res) => {
  try {
    const AdminCheck = await admin.findOne({ email: req.email });
    if (!AdminCheck) {
      const salt = await admin.generateSalt();
      req.password = await admin.hashPassword(req.password, salt);
      req.salt = salt;

      await admin.create(req);

      return res.json({
        success: true,
        message: 'Created successfully',
      });
    } else {
      res.json({
        msg: 'Admin Already Exist',
      });
    }
  } catch (e) {
    return res.json({
      success: false,
      msg: 'Admin Creation Failed',
      err: e.message,
    });
  }
};

// Admin Login Finctionality
exports.Adminlogin = async (req, email, password, res) => {
  try {
    const Admin = await admin.findOne({ email });

    if (!Admin)
      return res.json({
        success: false,
        message: 'Invalid email or password',
      });
    if (!(await admin.verifyPassword(password, Admin.password, Admin.salt)))
      return res.json({
        success: false,
        message: 'Invalid email or  password',
      });

    const accessToken = admin.generateAuthToken(Admin);
    const refreshToken = admin.generateAuthToken(Admin);
    Admin.accessToken = accessToken;
    const newLogin = new admin(Admin);
    let newData = await newLogin.save();
    admin.updateOne({ accessToken: accessToken });
    return res.json({
      success: true,
      msg: 'Logined',
    });
  } catch (e) {
    return res.json({
      success: false,
      msg: 'Login Failed',
      err: e.message,
    });
  }
};

exports.AdminchangePasswordlink = async (req, email, res) => {
  try {
    const Admin = await admin.findOne({ email });
    let newToken = jwt.sign(
      {
        id: Admin._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1m' }
    );
    let link = 'http://' + 'localhost:3000' + '/admin/change/' + newToken;
    res.send(link);
  } catch (e) {
    res.json({
      msg: 'Admin Not Found',
    });
  }
};

exports.AdminchangePassword = async (req, token, res) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const Admin = await admin.findById(decoded.id);
    newsalt = await admin.generateSalt();
    Admin.salt = newsalt;
    Admin.password = await admin.hashPassword(req.password, Admin.salt);
    const newAdmin = new admin(Admin);
    const data = await newAdmin.save();
    res.json({
      success: true,
      msg: 'password Changed Succesfully',
      data: data,
    });
  } catch (e) {
    return res.json({
      success: false,
      msg: 'Unable To Change password',
      err: e.message,
    });
  }
};

exports.Adminlogout = async (req, res) => {
  try {
    const deleteToken = await admin.find({
      email: req.email,
    });
    newaccessToken = null;
    await admin.findOneAndUpdate(
      { email: req.email },
      { accessToken: newaccessToken }
    );
    res.json({
      success: true,
      msg: 'LogOut Succesful',
    });
  } catch (e) {
    res.json({
      success: false,
      msg: 'LogOut Unsuccesful',
    });
  }
};

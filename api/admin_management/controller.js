const {
  CreateAdmins,
  Adminlogin,
  AdminchangePasswordlink,
  AdminchangePassword,
  Adminlogout,
} = require('../../helpers/admin');

// Admin Signup Functionality If needed
exports.createAdmin = async (req, res) => {
  CreateAdmins(req.body, res);
};
// admin Login functionality
exports.login = async (req, res) => {
  const { email, password } = req.body;
  Adminlogin(req.body, email, password, res);
};

// Change password Link generate functionality
exports.ChangePasswordLink = async (req, res) => {
  const { email } = req.body;
  AdminchangePasswordlink(req.body, email, res);
};

// Change Password Functionality of admin
exports.Changepassword = async (req, res) => {
  const { token } = req.params;
  AdminchangePassword(req.body, token, res);
};

// Logout functionality
exports.logOut = async (req, res) => {
  Adminlogout(req.body, res);
};

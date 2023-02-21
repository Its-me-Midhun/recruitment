const jwt = require('jsonwebtoken');
const admin = require('../models/admin_login');
module.exports = async (req, res, next) => {
  try {
    if (req.originalUrl.startsWith('/admin')) return next();
    const token = req.header('Authorization')
      ? req.header('Authorization').replace('Bearer ', '')
      : null;

    if (!token) {
      return res.json({
        success: false,
        msg: 'Unauthorized Access',
      });
    }
    const access_Token = await admin.findOne({ accessToken: token });
    if (!access_Token) {
      return res.json({
        success: false,
        msg: 'Invalid or Expired Token',
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log('decoded ---> \n', decoded);
    if (!decoded) {
      return res.json({
        success: false,
        msg: 'Invalid Token',
      });
    }
    if (decoded.exp < Date.now()) {
      return res.json({ success: false, msg: 'Token Expired' });
    }

    const isUserExists = await admin.findById(decoded.id);
    if (!isUserExists) {
      return res.json({ success: false, msg: 'Access Denied' });
    }
    let matchvalidity = isUserExists.password
      .concat(isUserExists._id)
      .concat(isUserExists.email);
    if (matchvalidity != decoded.validity) {
      return res.json({ success: false, msg: 'Access Denied' });
    }
    req.user = decoded;
    return next();
  } catch (ex) {
    res.json({
      success: false,
      msg: 'Error Occured',
      err: ex.message,
    });
    return res.json({ success: false, msg: 'Invalid Token' });
  }
};

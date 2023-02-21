const multer = require('multer');

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 10000000, //10 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(pdf|doc)$/)) {
      const err = new Error('Only pdf and doc format allowed!');
      err.name = 'ExtensionError';
      return cb(err, false);
    }

    cb(undefined, true);
  },
});
const errorHandler = (err, req, res, next) => {
  if (err.name === 'ExtensionError') return res.json({ err: err.message });
  next(err);
};
module.exports = { imageUpload: imageUpload.single('Resume'), errorHandler };

const multer = require('multer');


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './audio/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + "-" + req.query.startTime + "-" + req.query.endTime)
  }
});

module.exports = multer({ storage: storage }).single('recording');


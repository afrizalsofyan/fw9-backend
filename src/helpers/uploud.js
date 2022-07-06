const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(global.__basepath, 'assets', 'uploud'));
  },
  filename: (req, file, cb) => {
    const timeStamp = new Date().getTime();
    const ext = file.mimetype.split('/')[1];
    cb(null, `${timeStamp}.${ext}`);
  }
});

const uploud = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowExt = ['image/png', 'image/jpeg', 'image/hpg'];
    if(allowExt.includes(file.mimetype)){
      cb(null, true);
    } else {
      const err = new Error('Invalid extension');
      cb(err, false);
    }
  },
  limits:{
    fileSize: 1 * 1000 * 1000
  }
});

module.exports = uploud;
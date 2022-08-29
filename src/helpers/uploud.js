const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const path = require('path');
const cloudinaryConfig =  require('./cloudinaryConfig');

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(global.__basepath, 'assets', 'uploud'));
//   },
//   filename: (req, file, cb) => {
//     const timeStamp = new Date().getTime();
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `${timeStamp}.${ext}`);
//   }
// });

const storage = new CloudinaryStorage({
  cloudinary: cloudinaryConfig,
  params: {
    folder: 'ourpocket/users',
    format: async (req, file) => {
      const ext = await file.mimetype.split('/')[1];
      return ext;
    },
    public_id: () => {
      const filename = new Date().getTime();
      return filename;
    }
  }
});

const uploud = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowExt = ['image/png', 'image/jpeg', 'image/jpg'];
    if(allowExt.includes(file.mimetype)){
      cb(null, true);
    } else {
      const err = new Error('Invalid extension');
      cb(err, false);
    }
  },
  limits:{
    fileSize: 4 * 1000 * 1000
  }
});

module.exports = uploud;
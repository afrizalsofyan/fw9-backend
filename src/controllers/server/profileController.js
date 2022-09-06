const errorResponse = require('../../helpers/errorResponse');
const response = require('../../helpers/standartResponse');
const profileModel = require('../../models/profiles');
const cloudinary = require('cloudinary').v2;

exports.getProfile = (req, res) => {
  const data = req.authUser;
  profileModel.getProfileByUserId(data.id, (err, result)=>{
    if(err){
      return errorResponse(err, res);
    }
    return response(res, 'This is your profile', result[0]);
  });
};

exports.updateProfile = (req, res) => {
  const user = req.authUser;
  const idUser = user.id;
  profileModel.getProfileByUserId(idUser, (err, result)=>{
    const idProfile = result[0].id;
    if(result[0].photo_url != null){
      const photo = (result[0].photo_url.split('/')[result[0].photo_url.split('/').length-1])
      const finalPhoto = photo.split('.')[0];
      cloudinary.uploader.destroy(`ourpocket/users/${finalPhoto}`, (err, result) => {
        if(err){
          console.log(err);
        } else {
          let picture = null;
          if(req.file) {
            picture = req.file.path;
          }
          profileModel.updateProfile(idProfile, req.body, picture, (err, result) =>{
            if(err){
              return response(res, 'Update failed', null, null, 400);
            } else {
              return response(res, 'Update profile is successfully', result[0]);
            }
          });
        }
      });
    } else {
      let picture = null;
      if(req.file) {
        picture = req.file.path;
      }
      profileModel.updateProfile(idProfile, req.body, picture, (err, result) =>{
        if(err){
          return response(res, 'Update failed', null, null, 400);
        } else {
          return response(res, 'Update profile is successfully', result[0]);
        }
      });
    }
  });
};

exports.deletedPhoto = (req, res) => {
  const user = req.authUser;
  const idUser = user.id;
  profileModel.getProfileByUserId(idUser, (err, result)=>{
    //delete photo
    const photo = (result[0].photo_url.split('/')[result[0].photo_url.split('/').length-1])
    const finalPhoto = photo.split('.')[0];
    cloudinary.uploader.destroy(`ourpocket/users/${finalPhoto}`, (err, result) => {
      if(err){
        console.log(err);
      } else {
        profileModel.updatePhotoDelete(idUser, (err, result) => {
          console.log(err)
          if(err){
            return response(res, 'Update failed', null, null, 400);
          } else {
            // return response(res, 'Update profile is successfully', result[0]);
            return response(res, 'Your photo is deleted');
          }
        });
      }
    });
  });
};


exports.addPhoneNumber = (req, res) => {
  const data = req.authUser;
  profileModel.getProfileByUserId(data.id, (err, result)=>{
    profileModel.updateProfile(result[0].id, req.body, null, (err, resultUpdate)=>{
      if(err){
        return response(res, 'Failed to create phone', null, null, 400);
      } else {
        return response(res, 'Create phone success', resultUpdate[0], null, 200);
      }
    });
  });
};

exports.updatePhoneNumber = (req, res) => {
  const data = req.authUser;
  profileModel.getProfileByUserId(data.id, (err, result)=>{
    profileModel.updateProfile(result[0].id, req.body, null, (err, resultUpdate)=>{
      if(err){
        return response(res, 'Failed to create phone', null, null, 400);
      } else {
        return response(res, 'Create phone success', resultUpdate[0], null, 200);
      }
    });
  });
};
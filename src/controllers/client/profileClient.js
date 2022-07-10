const errorResponse = require('../../helpers/errorResponse');
const response = require('../../helpers/standartResponse');
const profileModel = require('../../models/profiles');

exports.getProfile = (req, res) => {
  const data = req.authUser;
  console.log(data.id);
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
    let picture = null;
    if(req.file) {
      picture = req.file.filename;
    }
    profileModel.updateProfile(idProfile, req.body, picture, (err, result) =>{
      console.log(result);
      if(result.length < 1){
        return response(res, 'Update failed', null, null, 400);
      }
      return response(res, 'Update profile is successfully', result[0]);
    });
  });
};


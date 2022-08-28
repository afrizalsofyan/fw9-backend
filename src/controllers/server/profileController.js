const errorResponse = require('../../helpers/errorResponse');
const response = require('../../helpers/standartResponse');
const profileModel = require('../../models/profiles');
// const cloudinary = require('cloudinary').v2;

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
    let picture = null;
    if(req.file) {
      picture = req.file.path;
    }
    profileModel.updateProfile(idProfile, req.body, picture, (err, result) =>{
      if(result.length < 1){
        return response(res, 'Update failed', null, null, 400);
      }
      return response(res, 'Update profile is successfully', result[0]);
    });
  });
};

//delete photo
// const photo = (result[0].photo_url.split('/')[result[0].photo_url.split('/').length-1])
//     const finalPhoto = photo.split('.')[0];
//     cloudinary.uploader.destroy(`ourpocket/users/${finalPhoto}`, (err, result) => console.log(result));

exports.addPhoneNumber = (req, res) => {
  const data = req.authUser;
  const newPhone = req.body.phoneNumber;
  profileModel.getProfileByUserId(data.id, (err, result)=>{
    const arrPhone = result[0].phone_number == null ? [newPhone] : [result[0].phone_number, newPhone];
    const phoneStr =  result[0].phone_number == null ? arrPhone : arrPhone[0].join('').split(',');
    const profileData = result[0];
    if(phoneStr.length < 2){
      profileModel.updateProfile(profileData.id, {phoneNumber: arrPhone}, null, (err, resultUpdate)=>{
        return response(res, 'Create phone successfully.', resultUpdate[0]);
      });
    } else {
      return response(res, 'Error!!! max save is 2 phone number.', null, null, 400);
    }
  });
};

exports.updatePhoneNumber = (req, res) => {
  const data = req.authUser;
  const newPhone = req.body.phoneNumber;
  profileModel.getProfileByUserId(data.id, (err, result)=>{
    const arrPhone = result[0].phone_number;
    const phoneArr = arrPhone[0].split(',');
    let phoneNumber = [];
    for(let x in phoneArr){
      if(x==req.body.indexPhone){ 
        phoneNumber.push(newPhone);
      } else {
        phoneNumber.push(phoneArr[x]);
      }
    }
    const phoneParam = phoneNumber.join(',');
    const profileData = result[0];
    profileModel.updateProfile(profileData.id, {phoneNumber: phoneParam}, null, (err, resultUpdate)=>{
      return response(res, 'Update phone number successfully.', resultUpdate[0]);
    });
  });
};
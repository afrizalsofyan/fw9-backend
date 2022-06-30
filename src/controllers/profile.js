const response = require('../helpers/standartResponse');
const profileModel = require('../models/profiles');

exports.createNewProfile = (req, res) => {
  profileModel.addProfile(req.body, (result)=>{
    return response(res, 'Profile has been created!!', result[0]);
  });
};

exports.getAllProfile = (req, res) => {
  profileModel.getAllProfiles((result)=>{
    return response(res, 'This is all prfile data', result);
  });
};

exports.getProfile = (req, res) => {
  const {id} = req.params;
  profileModel.getProfile(id, (result)=>{
    return response(res, 'This is selected data.', result[0]);
  });
};

exports.updateProfile = (req, res) => {
  const {id} = req.params;
  profileModel.updateProfile(id, req.body, (result)=>{
    return response(res, 'Update user data is success!!', result[0]);
  });
};

exports.hardDeleteProfile = (req, res)=>{
  const {id} = req.params;
  profileModel.hardDelateProfile(id,(result)=>{
    return response(res, 'Success delete data', result[0]);
  });
};
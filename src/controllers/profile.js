const errorResponse = require('../helpers/errorResponse');
const response = require('../helpers/standartResponse');
const profileModel = require('../models/profiles');

const { body, validationResult } = require('express-validator');

const validator = [
  body('balance').isInt().withMessage('balance must be Number'),
  body('phoneNumber').isMobilePhone('id-ID').withMessage('Format phone is not support')
];

exports.createNewProfile = 
[
  ...validator,
  (req, res) => {
    let pict;
    const validation = validationResult(req);
    if(!validation.isEmpty()){
      return response(res, 'Error input', validation.array(), 400);
    }
    if(!req.file){
      pict = null;
    } else {
      pict = req.file.filename;
    }
    profileModel.addProfile(req.body, pict, (err, result)=>{
      if(err){
        return errorResponse(err, res);
      } else {
        return response(res, 'Profile has been created!!', result[0]);
      }
    });
  },
];

exports.getAllProfile = (req, res) => {
  profileModel.getAllProfiles((result)=>{
    return response(res, 'This is all prfile data', result);
  });
};

exports.getProfile = (req, res) => {
  const {id} = req.params;
  profileModel.getProfile(id, (result)=>{
    if(result.length < 1){
      return res.redirect('/404');
    }
    return response(res, 'This is selected data.', result[0]);
  });
};

exports.updateProfile = 
[
  validator,
  (req, res) => {
    const {id} = req.params;
    let pict;
    const validation = validationResult(req);
    if(!validation.isEmpty()){
      return response(res, 'Error input', validation.array(), 400);
    }
    if(!req.file){
      pict = null;
    } else {
      pict = req.file.filename;
    }
    profileModel.updateProfile(id, req.body, pict, (err, result)=>{
      if(result.length < 1){
        return response(res, 'Failed to update, data not found!!', null, null, 400);
      }
      return response(res, 'Update success!!', result[0]);
    });
  }
];

exports.hardDeleteProfile = (req, res)=>{
  const {id} = req.params;
  profileModel.hardDelateProfile(id,(result)=>{
    if(result.length < 1){
      return res.redirect('/404');
    }
    return response(res, 'Success delete data', result[0]);
  });
};
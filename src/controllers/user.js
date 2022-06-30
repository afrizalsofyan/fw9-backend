const response = require('../helpers/standartResponse');
const userModel = require('../models/users');

const { validationResult } = require('express-validator');

const errorResponse = require('../helpers/errorResponse');

exports.getAllUser = (req, res) => {
  userModel.getAllUsers((result)=>{
    return response(res, 'This is user dataaaa.', result,200);
  });
};

exports.getUser = (req, res) => {
  const {id} = req.params;
  userModel.getUser(id, (result)=>{
    return response(res, 'This your selected data.', result[0]);
  });
  
};

exports.createUser = (req, res) => {
  const validation = validationResult(req);
  if(!validation.isEmpty()){
    return response(res, 'Error input', validation.array(), 400);
  }
  userModel.createUser(req.body, (err, result)=>{
    if(err) {
      if(err.code === '23505' && err.detail.includes('username')){
        const errData = errorResponse('Username Invalid', 'Username');
        return response(res, 'Error username', errData, 400);
      } else if(err.code === '23505' && err.detail.includes('email')){
        const errData = errorResponse('Email invalid', 'Email');
        return response(res, 'Error email', errData, 400);
      }
      return response(res, 'Error', null, 400);
    } else {
      return response(res, 'Create user successully!!', result[0]);
    }
  });
};

exports.updateUser = (req, res) => {
  const {id} = req.params;
  userModel.updateUsers(id, req.body, (result)=>{
    return response(res, 'Update user data is success!!', result[0]);
  });
};

exports.hardDeleteUser = (req, res) => {
  const {id} = req.params;
  userModel.hardDeleteUser(id, (result)=>{
    return response(res, 'Delete user is success!!', result);
  });
};

exports.softDeleteUser = (req, res) => {
  const {id} = req.params;
  userModel.softDeleteUser(id, (result)=>{
    return response(res, 'Delete data is success!!', result[0]);
  });
};
const response = require('../helpers/standartResponse');
const userModel = require('../models/users');

// const db = require('../helpers/db');

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
  userModel.createUser(req.body, (result)=>{
    return response(res, 'Create user successully!!', result[0]);
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
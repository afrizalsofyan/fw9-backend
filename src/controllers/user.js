const response = require('../helpers/standartResponse');
const userModel = require('../models/users');

const { validationResult } = require('express-validator');

const errorResponse = require('../helpers/errorResponse');

const {LIMIT_DATA} = process.env;

exports.getAllUser = (req, res) => {
  const {search='', limit=parseInt(LIMIT_DATA), page=1} = req.query;
  const offset = (page-1) * limit;
  userModel.getAllUsers(search, limit, offset, (result)=>{
    if(result.length < 1){
      return res.redirect('/404');
    }
    const pageInfo = {};

    userModel.countAllUsers(search, (err, infoData)=>{
      pageInfo.infoData = infoData.totalData;
      console.log(infoData);
      return response(res, 'List all users', result, infoData);
    });

    // return response(res, 'This is user dataaaa.', result,200);
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
    console.log(err);
    if(err) {
      return errorResponse(err, res);
    } else {
      return response(res, 'Create user successully!!', result[0]);
    }
  });
};

exports.updateUser = (req, res) => {
  const {id} = req.params;
  const validation = validationResult(req);
  if(!validation.isEmpty()){
    return response(res, 'Error input', validation.array(), 400);
  }
  userModel.updateUsers(id, req.body, (err, result)=>{
    if(err) {
      return errorResponse(err, result);
    } else {
      return response(res, 'Update user data is success!!', result[0]);
    }
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

// exports.findUser = (req, res) => {
//   const {search=''} = req.query;
//   console.log(search);
//   userModel.getAllUsers((result)=>{
//     return response(res, 'This is user dataaaa.', result,200);
//   });
//   // userModel.findUser((result)=>{
//   // const q = req.body.query;
//   // const data = result.map(element => element.username);
//   // const searchResult = data.filter(words => words.includes(q.toLowerCase()));
//   // return response(res, 'Data username', searchResult);
//   // });
// };

exports.sortUser = (req, res) => {
  userModel.sortUser(req.body, (err, result)=>{
    if(err){
      return errorResponse(err, res);
    } else {
      return response(res, 'This sort data', result);
    }
  });
};
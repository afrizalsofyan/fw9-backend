const response = require('../helpers/standartResponse');
const userModel = require('../models/users');

const { validationResult } = require('express-validator');

const errorResponse = require('../helpers/errorResponse');

const {LIMIT_DATA} = process.env;

exports.getAllUser = (req, res) => {
  const {search='', limit=parseInt(LIMIT_DATA), page=1, sortBy='id', sortType=0} = req.query;
  const offset = (page-1) * limit;
  userModel.getAllUsers(search, sortBy, parseInt(sortType), limit, offset, (result)=>{
    if(result.length < 1){
      return res.redirect('/404');
    }
    const pageInfo = {};

    userModel.countAllUsers(search, (err, data)=>{
      pageInfo.infoData = data;
      pageInfo.totalPage = Math.ceil(data/limit);
      pageInfo.currentPage = parseInt(page);
      pageInfo.prevPage = pageInfo.currentPage > 1 ? pageInfo.currentPage - 1 : null;
      pageInfo.nextPage = pageInfo.currentPage < pageInfo.totalPage ? pageInfo.currentPage + 1 : null;
      return response(res, 'List all users', result, pageInfo);
    });
  });
};

exports.getUser = (req, res) => {
  const {id} = req.params;
  userModel.getUser(id, (err, result)=>{
    if(result.length<1) {
      return res.redirect('/404');
    }
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
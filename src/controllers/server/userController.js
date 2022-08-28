const userModel = require('../../models/users');
const bcrypt   = require('bcrypt');
const response = require('../../helpers/standartResponse');
const errorResponse = require('../../helpers/errorResponse');
const {LIMIT_DATA} = process.env;
exports.getCurrentUser = (req, res) => {
  const data = req.authUser;
  userModel.getUserWithProfile(data.id, (err, result)=>{
    // console.log(err);
    if(result.rows.length < 1) {
      return response(res, 'Failed to get user data', null, null, 400);
    } else {
      return response(res, 'Succes to get user data', result.rows[0]);
    }
  });
};

exports.changePassword = (req, res) => {
  const data = req.authUser;
  const {currentPassword} = req.body;
  userModel.getUserByEmail(data.email, (err, result) => {
    const user = result.rows[0];
    bcrypt.compare(currentPassword, user.password)
      .then((checkPass) => {
        if(checkPass){
          userModel.updateUsers(user.id, {password: req.body.newPassword}, (err, result)=>{
            if(result.length < 1){
              return response(res, 'Data not found!!!', null, null, 400);
            }
            return response(res, 'Password has been updated.');
          });
        } else {
          return response(res, 'Password does\'nt match with your current password', null, null, 400);
        }
      })
      .catch(e=>response(res, e.message, null, null, 400));
  });
};

exports.getPin = (req, res) => {
  const data = req.authUser;
  userModel.getUserByEmail(data.email, (err, result)=>{
    if(result.length<1){
      return response(res, 'User not found', null, null, 400);
    } else {
      const pinUser = result.rows[0].pin_number;
      return response(res, 'This is your pin.', {pinUser}, null);
    }
  });
};

exports.changePin = (req, res) => {
  const data = req.authUser;
  userModel.getUserByEmail(data.email, (err, result)=>{
    const user = result.rows[0];
    if(user.length < 1) {
      return response(res, 'User not found.', null, null, 400);
    } else if(user.pin_number !== parseInt(req.body.currentPin)){
      return response(res, 'Current pin not match with your pin now.', null, null, 400);
    } else {
      userModel.updateUsers(user.id, {pin: req.body.newPin}, (err)=>{
        if(err) {
          return errorResponse(err, res);
        } 
        return response(res, 'Your pin has been updated');
      });
    }
  });
};

exports.allUser = (req, res) => {
  const {search='', limit=parseInt(LIMIT_DATA), page=1, sortBy='id', sortType=0} = req.query;
  const offset = (page-1) * limit;
  userModel.getAllUserWithName(search, sortBy, parseInt(sortType), limit, offset, (err, result)=>{
    if(err) {
      return errorResponse('Data cant selected', res);
    } else {
      if(result.rows < 1) {
        return response(res, 'There no data of users', null, null, 400);
      } else {
        const pageInfo = {};

        userModel.countAllUsers(search, (err, data)=>{
          pageInfo.infoData = data;
          pageInfo.totalPage = Math.ceil(data/limit);
          pageInfo.currentPage = parseInt(page);
          pageInfo.prevPage = pageInfo.currentPage > 1 ? pageInfo.currentPage - 1 : null;
          pageInfo.nextPage = pageInfo.currentPage < pageInfo.totalPage ? pageInfo.currentPage + 1 : null;
          return response(res, 'List all users', result.rows, pageInfo);
        });
        // return response(res, 'This is all users', result.rows);
      }
    }
  });
};

exports.getUserById = (req, res) => {
  const {id} = req.params;
  userModel.getUserWithProfile(id, (err, result)=>{
    if(result.rows.length < 1){
      return response(res, 'user not found', null, null, 400);
    } else {
      return response(res, 'Succes get users', result.rows[0]);
    }
  });
};
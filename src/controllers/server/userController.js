const userModel = require('../../models/users');
const bcrypt   = require('bcrypt');
const response = require('../../helpers/standartResponse');
const errorResponse = require('../../helpers/errorResponse');

exports.getCurrentUser = (req, res) => {
  const data = req.authUser;
  userModel.getUserWithProfile(data.id, (err, result)=>{
    if(result.rows.length < 1) {
      return response(res, 'Failed to get user data', null, null, 400);
    } else {
      return response(res, 'Succes to get user data', result.rows);
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
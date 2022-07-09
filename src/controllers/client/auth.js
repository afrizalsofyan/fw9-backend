const errorResponse = require('../../helpers/errorResponse');
const response = require('../../helpers/standartResponse');
const userModel = require('../../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
  req.body.pin = null;
  userModel.createUserWithProfile(req.body, (err)=>{
    if(err){
      return errorResponse(err, res);
    } 
    return response(res, 'Register successfully');
  });
};

exports.createPin = (req, res) => {
  const {email} = req.body;
  userModel.getUserByEmail(email, (err, result)=>{
    if (result.rows.length < 1) {
      return response(res, 'Email not found!!', null, null, 400);
    } else {
      const data = result.rows[0];
      const id = data.id;
      if(data.pin_number === null){
        userModel.updateUsers(id, {pin: req.body.pin}, (err, result)=>{
          return response(res, 'Success to create pin.', result);  
        });
      } else {
        return response(res, 'Failed to create pin. Pin has been filled.', null, null, 400);
      }
    }
  });
};

exports.login = (req, res) => {
  const {email, password} = req.body;
  userModel.getUserByEmail(email, (err, result) => {
    if(result.rows.length < 1){
      return response(res, 'Email not found');
    }
    const user = result.rows[0];
    bcrypt.compare(password, user.password)
      .then((checkPass) => {
        if(checkPass){
          const token = jwt.sign({id: user.id, email: user.email, username: user.username}, process.env.APP_SECRET || 'secretKey');
          return response(res, 'Login success', {token});
        } else {
          return response(res, 'Login Failed', null, null, 401);
        }
      }).catch((e)=>{
        return response(res, `Error: ${e.message}`, null, null, 404);
      });
  });
};

exports.sendEmailForgetPassword = (req, res) => {
  const {email} = req.body;
  userModel.getUserByEmail(email, (err, result)=>{
    if(result.rows.length<1){
      return response(res, 'Email not found');
    }
    const data = result.rows[0];
    const token = jwt.sign({id: data.id, email: data.email, username: data.username}, process.env.APP_SECRET || 'newSecretKey');
    const queryParams = `${process.env.BASE_PATH}auth/forgetPassword?email=${data.email}&token=${token}`;
    return response(res, 'This is link for change password.', queryParams, null);
  });
};

exports.forgetPassword = (req, res) => {
  const {email, token} = req.query;
  if(email !== null && token !== null){
    const {email, newPassword} = req.body;
    userModel.getUserByEmail(email, (err, result)=>{
      if(result.rows.length < 1){
        return response(res, 'Email not found', null, null, 401);
      }
      const data = result.rows[0];
      userModel.updateUsers(data.id, {password: newPassword}, ()=>{
        return response(res, 'Password has been updated.');
      });
    });
  } else {
    return response(res, 'Error!!! email or token invalid', null, null, 403);
  }
};
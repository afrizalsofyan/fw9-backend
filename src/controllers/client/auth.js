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
        }
      }).catch((e)=>{
        return response(res, 'Email or Password not match', null, null, 404);
      });
  });
};
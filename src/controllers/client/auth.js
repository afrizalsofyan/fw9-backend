const errorResponse = require('../../helpers/errorResponse');
const response = require('../../helpers/standartResponse');
const userModel = require('../../models/users');

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
    const id = result.rows[0].id;
    userModel.updateUsers(id, {pin: req.body.pin}, (err, result)=>{
      console.log(err);
      return response(res, 'Success', result);  
    });
  });
};
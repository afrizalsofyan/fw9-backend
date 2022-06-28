const response = require('../helpers/standartResponse');
const userModel = require('../models/users');
exports.getUser = (req, res) => {
  userModel.getAllUsers((result)=>{
    return response(res, 'This is user dataaaa.', result,200);
  });
};
const userModel = require('../../models/users');
const bcrypt   = require('bcrypt');
const response = require('../../helpers/standartResponse');

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
  // userModel.updateUsers(data.id)
};
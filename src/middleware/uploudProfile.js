const response = require('../helpers/standartResponse');
const uploud = require('../helpers/uploud').single('picture');

const uploudProfile = (req, res, next) => {
  uploud(req, res, function (err) {
    if(err){
      return response(res, `Error: ${err.message}`, null, null, 400);
    }
    next();
  });
};

module.exports = uploudProfile;
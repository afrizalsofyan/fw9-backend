const jwt = require('jsonwebtoken');
const response = require('../helpers/standartResponse');

const auth = (req, res, next) => {
  if(req.headers.authorization){
    const authToken = req.headers.authorization;
    const prefix = 'Bearer';
    if(authToken.startsWith(prefix)){
      const token = authToken.slice(prefix.length+1, authToken.length);
      try {
        const results = jwt.verify(token, process.env.APP_SECRET || 'secretKey');
        req.authUser = results;
        next();
      } catch (error) {
        return response(res, 'Token Expired', null, null, 401);
      }
    }
  } else {
    return response(res, 'Unauthorized', null, null, 401);
  }
  
};

module.exports = auth;
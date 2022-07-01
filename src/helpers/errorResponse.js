const response = require('./standartResponse');

const errorHandling = (msg, param, location='body') => [
  {
    msg,
    param,
    location
  }
];

const errorResponse = (err, res) => {
  if(err.code === '23505' && err.detail.includes('username')){
    const errData = errorHandling('Username already axists!!', 'Username');
    return response(res, 'Error username', errData, 400);
  } else if(err.code === '23505' && err.detail.includes('email')){
    const errData = errorHandling('Email already axists!!', 'Email');
    return response(res, 'Error email', errData, 400);
  }
  return response(res, 'Error', null, 400);
};

module.exports = errorResponse;
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
    return response(res, 'Error username', errData, null, 400);
  } else if(err.code === '23505' && err.detail.includes('email')){
    const errData = errorHandling('Email already axists!!', 'Email');
    return response(res, 'Error email', errData, null, 400);
  } else if (err.code === '23505' && err.detail.includes('already exists')){
    const errData = errorHandling('User id already axists!!', 'User id');
    return response(res, 'Error user id', errData, null, 400);
  } else if (err.code === '23503' && err.detail.includes('not present')){
    const errData = errorHandling('User id not found!!!', 'User id');
    return response(res, 'Wrong user id', errData, null, 400);
  }
  return response(res, 'Error', null, null, 400);
};

module.exports = errorResponse;
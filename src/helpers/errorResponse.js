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
  } else if (err.code === '23505' && err.detail.includes('already exists') && err.detail.includes('user_id')){
    const errData = errorHandling('User id already axists!!', 'User id');
    return response(res, 'Error user id', errData, null, 400);
  } else if (err.code === '23503' && err.detail.includes('not present') && err.detail.includes('user_id')){
    const errData = errorHandling('User id is not present!!!', 'User id');
    return response(res, 'Wrong user id', errData, null, 400);
  } else if (err.code === '23503' && err.detail.includes('not present') && err.detail.includes('sender_id')){
    const errData = errorHandling('Sender id is not present!!!', 'Sender id');
    return response(res, 'Wrong user id', errData, null, 400);
  } else if (err.code === '23503' && err.detail.includes('not present') && err.detail.includes('recipient_id')){
    const errData = errorHandling('Recipient id is not present!!!', 'Recipient id');
    return response(res, 'Wrong user id', errData, null, 400);
  } else if (err.code === '23503' && err.detail.includes('not present') && err.detail.includes('type_id')){
    const errData = errorHandling('Type id is not present!!!', 'Type id');
    return response(res, 'Wrong type id', errData, null, 400);
  } else if (err.code === '23505' && err.detail.includes('already exists') && err.detail.includes('type_name')){
    const errData = errorHandling('Type name already exists!!', 'Type name');
    return response(res, 'Error Type Name', errData, null, 400);
  } 
  return response(res, 'Error', null, null, 400);
};

module.exports = errorResponse;
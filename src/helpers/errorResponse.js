const errData = (msg, param, location='body') => [
  {
    msg,
    param,
    location
  }
];

module.exports = errData;
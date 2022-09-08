const db = require('../helpers/db');

exports.createAuthTokenUser = (data, cb) => {
  const q = 'INSERT INTO token_auth_user (user_id, token, refresh_token) VALUES ($1, $2, $3)';
  const val = [data.user_id, data.token, data.refresh_token];
  db.query(q, val, (err, result) => {
    cb(err, result);
  });
};

exports.getTokenUser = (user_id, cb) => {
  const q = 'SELECT * FROM token_auth_user WHERE user_id=$1';
  const val = [user_id];
  db.query(q, val, (err, result) => {
    cb(err, result);
  });
};

exports.updateTokenUser = (token_id, cb) => {
  const q = 'UPDATE token_auth_user SET user_id=null WHERE id=$1';
  const val = [token_id];
  db.query(q, val, (err, result) => {
    cb(err, result);
  });
};
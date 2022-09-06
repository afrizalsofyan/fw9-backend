const db = require('../helpers/db');

exports.getAllNotificationsReading = (userId, cb) => {
  const q = 'SELECT n.id, u.username recipient, t.amount transfer_amount, p.photo_url, p.phone_number recipient_phone, t.time_transaction time_transaction FROM notification n FULL OUTER JOIN "transaction" t on t.id = n.transaction_id FULL OUTER JOIN users u on u.id = t.recipient_id FULL OUTER JOIN profile p on p.user_id = u.id WHERE n.user_id=$1 AND n.is_read=false';
  const val = [userId];
  db.query(q, val, (err, result) => {
    cb(err, result);
  });
};

exports.getAllNotifications = (userId, limit, offset, cb) => {
  const q = 'SELECT n.id, u.username recipient, t.amount transfer_amount, p.photo_url, p.phone_number recipient_phone, t.time_transaction time_transaction FROM notification n FULL OUTER JOIN "transaction" t on t.id = n.transaction_id FULL OUTER JOIN users u on u.id = t.recipient_id FULL OUTER JOIN profile p on p.user_id = u.id WHERE n.user_id=$1 LIMIT $2 OFFSET $3';
  const val = [userId, limit, offset];
  db.query(q, val, (err, result) => {
    cb(err, result);
  });
};

exports.countNotifications = (userId, cb) => {
  const q = 'SELECT * FROM notification WHERE user_id=$1';
  const val = [userId];
  db.query(q, val, (err, result) => {
    cb(err, result.rowCount);
  });
};

exports.idReadingNotification = (idNotification, cb) => {
  const q = 'UPDATE notification SET is_read=true WHERE id=$1';
  const val = [idNotification];
  db.query(q, val, (err, result)=>{
    cb(err, result);
  });
};

exports.createFCMToken = (token, cb) => {
  const q = 'INSERT INTO fcm_token(token) VALUES($1)';
  const val = [token];
  db.query(q, val, (err, result)=>{
    cb(err, result);
  });
};

exports.updateFCMTokenUserLogin = (userId, token, cb) => {
  console.log(token)
  const q = 'UPDATE fcm_token SET user_id=$1 WHERE token=$2 RETURNING *';
  const val = [userId, token];
  db.query(q, val, (err, result) => {
    cb(err, result);
  });
};

exports.getFCMToken = (userId, cb) => {
  const q = 'SELECT * FROM fcm_token WHERE user_id=$1';
  const val = [userId];
  db.query(q, val, (err, result) => {
    cb(err, result);
  });
};

exports.checkToken = (token, cb) => {
  const q = 'SELECT * FROM fcm_token WHERE token=$1';
  const val = [token];
  db.query(q, val, (err, result) => {
    cb(err, result);
  });
};
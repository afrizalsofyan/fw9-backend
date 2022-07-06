const db = require('../helpers/db');

exports.getAllUsers = (keyword, sortBy, sortType, limit, offset= 0, cb) => {
  let type = '';
  if(sortType === 0) {
    type = 'ASC';
  } else {
    type = 'DESC';
  }
  db.query(`SELECT * FROM users WHERE is_deleted=false AND (username LIKE '%${keyword}%' 
  OR email LIKE '%${keyword}%') ORDER BY ${sortBy} ${type} LIMIT $1 OFFSET $2`, [limit, offset], (err, res) => {
    if(err) {
      throw err;
    }
    cb(res.rows);
  });
};

exports.countAllUsers = (keyword, cb) =>{
  db.query(`SELECT * FROM users WHERE email LIKE '%${keyword}%'`, (err, result)=>{
    cb(err, result.rowCount);
  });
};

exports.getUser = (id, cb) => {
  const q = 'SELECT username, email, password, pin_number FROM users WHERE id=$1 AND is_deleted=false';
  const val = [id];
  db.query(q, val, (err, res)=>{
    if(err) {
      cb(err);
    } else {
      cb(err, res.rows);
    }
  });
};

exports.createUser = (data, cb) => {
  const q = 'INSERT INTO users (username, email, password, pin_number) VALUES ($1, $2, $3, $4) RETURNING *';
  const val = [data.username, data.email, data.password, data.pin];
  db.query(q, val, (err, result)=>{
    if(result){
      cb(err, result.rows);
    } else {
      cb(err);
    }
  });
};

exports.updateUsers = (id, data, cb) => {
  const q = 'UPDATE users SET username=$1, email=$2, password=$3, pin_number=$4 WHERE id=$5 RETURNING *';
  const val = [data.username, data.email, data.password, data.pin, id];
  db.query(q, val, (err, result)=>{
    if(result){
      cb(err, result.rows);
    } else {
      cb(err);
    }
  });
};

exports.hardDeleteUser = (id, cb) => {
  const q = 'DELETE FROM users WHERE id=$1 RETURNING *';
  const val = [id];
  db.query(q, val, (err, result)=>{
    cb(result.rows);
  });
};

exports.softDeleteUser = (id, cb) => {
  const softDelete = true;
  const q = 'UPDATE users SET is_deleted=$1 WHERE id=$2 RETURNING *';
  const val = [softDelete, id];
  db.query(q, val, (err, result)=>{
    cb(result.rows);
  });
};

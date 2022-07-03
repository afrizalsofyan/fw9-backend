const db = require('../helpers/db');

exports.getAllUsers = (cb) => {
  db.query('SELECT * FROM users WHERE is_active=true ORDER BY id ASC OFFSET 5 LIMIT 100000', (err, res) => {
    if(err) {
      throw err;
    }
    cb(res.rows);
  });
};

exports.getUser = (id, cb) => {
  const q = 'SELECT username, email, password, pin_number FROM users WHERE id=$1 AND is_active=true';
  const val = [id];
  db.query(q, val, (err, res)=>{
    cb(res.rows);
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
  const softDelete = false;
  const q = 'UPDATE users SET is_active=$1 WHERE id=$2 RETURNING *';
  const val = [softDelete, id];
  db.query(q, val, (err, result)=>{
    cb(result.rows);
  });
};

exports.findUser = (cb) => {
  const q = 'SELECT username FROM users';
  db.query(q, (err, result)=>{
    cb(result.rows);
  });
};

exports.sortUser = (data, cb) => {
  let arg = data.by.toLowerCase();
  let sort = data.sort.toLowerCase();
  // const q = `SELECT ${arg} FROM users ORDER BY username ${sort}`;
  const q = `SELECT ${arg} FROM users ORDER BY username ${sort} OFFSET 5 LIMIT 100000`;
  const queryDB = db.query(q, (err, result)=>{
    if(err){
      cb(err);
    } else {
      cb(err, result.rows);
    }
  });
  if(data.by === 'username'){
    queryDB;
  } else if(data.by === 'email') {
    queryDB;
  } else {
    console.log('invalid sort');
  }
};
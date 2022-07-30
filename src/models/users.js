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
      cb(err);
    }
    cb(err, res.rows);
  });
};

exports.countAllUsers = (keyword, cb) =>{
  db.query(`SELECT * FROM users WHERE email LIKE '%${keyword}%'`, (err, result)=>{
    cb(err, result.rowCount);
  });
};

exports.getUser = (id, cb) => {
  const q = 'SELECT * FROM users WHERE id=$1 AND is_deleted=false';
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
  const fieldTable = {
    'username': data.username,
    'email': data.email,
    'password': data.password,
    'pin_number': data.pin
  };
  
  let val = [id];
  let arg = [];
  const argObj = Object.keys(fieldTable);
  const valObj = Object.values(fieldTable);
  for(let x in valObj) {
    if(valObj[x]!=null){
      arg.push(argObj[x]);
      val.push(valObj[x]);
    }
  }
  const finalArg = arg.map((el, idx)=> `${el}=$${idx+2}`);

  const q = `UPDATE users SET ${finalArg} WHERE id=$1 RETURNING *`;
  // const val = [data.username, data.email, data.password, data.pin, id];
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

exports.createUserWithProfile = (data, cb) => {
  db.query('BEGIN', err => {
    if(err){
      cb(err);
    }
    const q = 'INSERT INTO users (username, email, password, pin_number) VALUES ($1, $2, $3, $4) RETURNING id';
    const val = [data.username, data.email, data.password, data.pin];
    db.query(q, val, (err, result)=>{
      if(err){
        cb(err);
      } else {
        if(result.length < 1){
          cb(err);
        } else {
          const idUser = result.rows;
          const insertIdUserToProfile = 'INSERT INTO profile(user_id) VALUES ($1)';
          const insertIdUserToProfileValues = [idUser[0].id];
          db.query(insertIdUserToProfile, insertIdUserToProfileValues, (err, result)=>{
            if(err){
              cb(err);
            }
            else {
              db.query('COMMIT', err => {
                if(err){
                  cb(err);
                } else {
                  cb(err, result);
                }
              });
            }
          });
        }
      }
    });
  });
};

exports.getUserByEmail = (email, cb) => {
  const q = `SELECT * FROM users WHERE email='${email}'`;
  db.query(q, (err, result)=>{
    cb(err, result);
  });
};

exports.getUserWithProfile = (id, cb) => {
  const q = 'SELECT users.email, users.username, profile.id, profile.first_name, profile.last_name, profile.phone_number, profile.photo_url, profile.balance FROM users JOIN profile ON users.id = profile.user_id WHERE users.id = $1';
  const val = [id];
  db.query(q, val, (err, result)=>{
    cb(err, result);
  });
};
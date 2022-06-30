const db = require('../helpers/db');

exports.addProfile = (data, cb) => {
  const q = 'INSERT INTO profile(first_name, last_name, phone_number, personal_inf, photo_url, balance) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
  const val = [data.firstName, data.lastName, data.phoneNumber, data.personalInformation, data.photoUrl, data.balance];

  db.query(q, val, (err, result)=>{
    if(err){
      throw err;
    }
    cb(result.rows);
  });
};

exports.getAllProfiles = (cb) => {
  const q = 'SELECT * FROM profile ORDER BY id ASC';
  db.query(q, (err, result)=>{
    cb(result.rows);
  });
};

exports.getProfile = (id, cb) => {
  const q = 'SELECT * FROM profile WHERE id=$1';
  const val= [id];
  db.query(q, val, (err, res)=>{
    cb(res.rows);
  });
};

exports.updateProfile = (id, data, cb) => {
  const q = 'UPDATE profile SET first_name=$1, last_name=$2, phone_number=$3, personal_inf=$4, photo_url=$5, balance=$6 WHERE id=$7 RETURNING *';
  const val = [data.firstName, data.lastName, data.phoneNumber, data.personalInformation, data.photoUrl, data.balance, id];

  db.query(q, val, (err, result) => {
    if(err){
      throw err;
    }
    cb(result.rows);
  });
};
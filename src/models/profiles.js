const db = require('../helpers/db');
const {PATH_ASSETS_IMAGE: imgUrl} = process.env;

exports.addProfile = (data, picture, cb) => {
  const fieldTable = {
    'first_name': data.firstName,
    'last_name': data.lastName,
    'phone_number': data.phoneNumber,
    'balance': data.balance,
    'photo_url': picture==null? picture : `${imgUrl}/${picture}`,
    'user_id': data.user_id
  };

  let val = [];
  let arg = [];
  const argObj = Object.keys(fieldTable);
  const valObj = Object.values(fieldTable);
  for(let x in valObj){
    if(valObj[x]!=null){
      arg.push(argObj[x]);
      val.push(valObj[x]);
    }
  }
  const argPosition = arg.map((el, idx)=> `$${idx+1}`);
  
  const q = `INSERT INTO profile(${arg}) VALUES(${argPosition}) RETURNING *`;
  db.query(q, val, (err, result)=>{
    if(err){
      cb(err);
    } else {
      cb(err, result.rows);
    }
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

exports.updateProfile = (id, data, picture, cb) => {
  const fieldTable = {
    'first_name': data.firstName,
    'last_name': data.lastName,
    'phone_number': data.phoneNumber,
    'balance': data.balance,
    'photo_url': picture == null ? picture : `${imgUrl}/${picture}`
  };

  let val = [id];
  let arg = [];
  const argObj = Object.keys(fieldTable);
  const valObj = Object.values(fieldTable);
  for(let x in valObj){
    if(valObj[x]!=null){
      arg.push(argObj[x]);
      val.push(valObj[x]);
    }
  }
  const finalArg = arg.map((el, idx)=> `${el}=$${idx+2}`);
  
  const q = `UPDATE profile SET ${finalArg} WHERE id=$1 RETURNING *`;
  db.query(q, val, (err, result)=>{
    if(err){
      cb(err);
    } else {
      cb(err, result.rows);
    }
  });
};

exports.hardDelateProfile = (id, cb) => {
  const q = 'DELETE FROM profile WHERE id=$1 RETURNING *';
  const val = [id];
  db.query(q, val, (err, result)=>{
    cb(result.rows);
  });
};

exports.getProfileByUserId = (userId, cb) => {
  const q = 'SELECT * FROM profile WHERE user_id=$1';
  const val = [userId];
  db.query(q, val, (err, result)=>{
    cb(err, result.rows);
  });
};
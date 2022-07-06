const db = require('../helpers/db');

exports.addNewType = (data, cb) => {
  const q = 'INSERT INTO transaction_type (type_name, type_desc) VALUES ($1, $2) RETURNING id, type_name, type_desc';
  const val = [data.name, data.description];

  db.query(q, val, (err, result)=>{
    if(err){
      cb(err);
    } else{
      cb(err, result.rows);
    }
  });
};

exports.getTypes = (cb) => {
  const q = 'SELECT id, type_name, type_desc FROM transaction_type WHERE is_deleted=false ORDER BY id ASC';
  db.query(q, (err, result)=>{
    if(err) {
      cb(err);
    } else {
      cb(err, result.rows);
    }
  });
};

exports.getType = (id, cb) => {
  const q = 'SELECT id, type_name, type_desc FROM transaction_type WHERE id=$1 AND is_deleted=false';
  const val = [id];
  db.query(q, val, (err, result)=>{
    if(err) {
      cb(err);
    } else {
      cb(err, result.rows);
    }
  });
};

exports.updateType = (id, data, cb)=>{
  const q = 'UPDATE transaction_type SET type_name=$1, type_desc=$2 WHERE id=$3 RETURNING *';
  const val = [data.name, data.description, id];
  db.query(q, val, (err, result)=>{
    if(err){
      cb(err);
    } else {
      cb(err, result.rows);
    }
  });
};

exports.deleteType = (id, cb) =>{
  const q = 'DELETE FROM transaction_type WHERE id=$1 RETURNING *';
  const val = [id];

  db.query(q, val, (err, result)=>{
    if(err){
      cb(err);
    } else {
      cb(err, result.rows);
    }
  });
};

exports.softDelete = (id, cb) => {
  const deleted = true;
  const q = 'UPDATE transaction_type SET is_deleted=$1 WHERE id=$2 RETURNING *';
  const val = [deleted, id];
  
  db.query(q, val, (err, result) => {
    if(err) {
      cb(err);
    } else {
      cb(err, result.rows);
    }
  });
};
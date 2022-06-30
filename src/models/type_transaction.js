const db = require('../helpers/db');

exports.addNewType = (data, cb) => {
  const q = 'INSERT INTO transaction_type (type_name, type_desc) VALUES ($1, $2) RETURNING *';
  const val = [data.name, data.description];

  db.query(q, val, (err, result)=>{
    cb(result.rows);
  });
};

exports.getTypes = (cb) => {
  const q = 'SELECT * FROM transaction_type ORDER BY id ASC';
  db.query(q, (err, result)=>{
    cb(result.rows);
  });
};

exports.getType = (id, cb) => {
  const q = 'SELECT * FROM transaction_type WHERE id=$1';
  const val = [id];
  db.query(q, val, (err, result)=>{
    cb(result.rows);
  });
};

exports.updateType = (id, data, cb)=>{
  const q = 'UPDATE transaction_type SET type_name=$1, type_desc=$2 WHERE id=$3 RETURNING *';
  const val = [data.name, data.description, id];
  db.query(q, val, (err, result)=>{
    cb(result.rows);
  });
};

exports.deleteType = (id, cb) =>{
  const q = 'DELETE FROM transaction_type WHERE id=$1 RETURNING *';
  const val = [id];

  db.query(q, val, (err, result)=>{
    cb(result.rows);
  });
};
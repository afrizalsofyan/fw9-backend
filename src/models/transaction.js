const db = require('../helpers/db');

exports.createNewTransaction = (data, cb) => {
  const q = 'INSERT INTO transaction(time_transaction, notes, amount, type_id, recipient_id, sender_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
  const val = [data.time, data.notes, data.amount, data.type_id, data.recipient_id, data.sender_id];
  db.query(q, val, (err, result)=>{
    if(err){
      cb(err);
    } else {
      cb(err, result.rows);
    }
  });
};

exports.getAllTransaction = (keyword, searchBy, sortBy, sortType, limit, offset, cb) => {
  const q = `SELECT * FROM transaction ${!searchBy ? 'ORDER BY id ASC' : `WHERE 
  ${searchBy == 'amount' ? 'amount::text' : searchBy} 
  LIKE '%${keyword}%' ORDER BY ${sortBy == 'amount' ? sortBy : 'id'} ${sortType}`} LIMIT $1 OFFSET $2 `;
  const val = [limit, offset];
  // const q = 'SELECT id, amount, notes, sender_id, recipient_id, time_transaction::timestamp AT time zone \'GMT+0\' AS time_transaction FROM transaction';
  db.query(q, val, (err, result)=>{
    cb(err, result.rows);
  });
};

exports.countTransactionData = (keyword, cb) => {
  const q = 'SELECT * FROM transaction';
  db.query(q, (err, result)=>{
    cb(err, result.rowCount);
  });
};

exports.getTransaction = (id, cb) => {
  const q = 'SELECT * FROM transaction WHERE id=$1';
  const val = [id];
  db.query(q, val, (err, result)=>{
    cb(result.rows);
  });
};

exports.getTransactionByTime = (cb) => {
  const q = 'SELECT * FROM transaction ORDER BY time_transaction DESC';
  db.query(q, (err, result)=>{
    cb(result.rows);
  });
};

exports.updateTransaction = (id, data, cb) => {
  let type_id = 1;
  let recipient_id = 1;
  let sender_id = 2;
  const q = 'UPDATE transaction SET time_transaction=$1, notes=$2, amount=$3, type_id=$4, recipient_id=$5, sender_id=$6 WHERE id=$7 RETURNING *';
  const val = [data.time, data.notes, data.amount, type_id, recipient_id, sender_id, id];

  db.query(q, val, (err, result)=>{
    if(err){
      cb(err);
    } else {
      cb(err, result.rows);
    }
  });
};

exports.deleteTransaction = (id, cb) => {
  const q = 'DELETE FROM transaction WHERE id=$1 RETURNING *';
  const val = [id];
  db.query(q, val, (err, result)=>{
    cb(result.rows);
  });
};
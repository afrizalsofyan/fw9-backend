const db = require('../helpers/db');

exports.createNewTransaction = (data, cb) => {
  console.log(data);
  const q = 'INSERT INTO transaction(date_transaction, time_transaction, notes, amount, type_id, reciepent_id, sender_id) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *';
  const val = [data.date, data.time, data.notes, data.amount, data.type_id, data.reciepent_id, data.sender_id];
  db.query(q, val, (err, result)=>{
    if(err){
      throw err;
    }
    cb(result.rows);
  });
};

exports.getAllTransaction = (cb) => {
  const q = 'SELECT * FROM transaction ORDER BY id ASC';
  db.query(q, (err, result)=>{
    cb(result.rows);
  });
};

exports.getTransaction = (id, cb) => {
  const q = 'SELECT * FROM transaction WHERE id=$1';
  const val = [id];
  db.query(q, val, (err, result)=>{
    cb(result.rows);
  });
};

exports.updateTransaction = (id, data, cb) => {
  let type_id = 1;
  let reciepent_id = 1;
  let sender_id = 2;
  const q = 'UPDATE transaction SET date_transaction=$1, time_transaction=$2, notes=$3, amount=$4, type_id=$5, reciepent_id=$6, sender_id=$7 WHERE id=$8 RETURNING *';
  const val = [data.date, data.time, data.notes, data.amount, type_id, reciepent_id, sender_id, id];

  db.query(q, val, (err, result)=>{
    if(err) {
      throw err;
    }
    cb(result.rows);
  });
};

exports.deleteTransaction = (id, cb) => {
  const q = 'DELETE FROM transaction WHERE id=$1 RETURNING *';
  const val = [id];
  db.query(q, val, (err, result)=>{
    cb(result.rows);
  });
};
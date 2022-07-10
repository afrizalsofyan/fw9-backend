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

exports.getAllTransaction = (keyword, searchBy, sortBy, sortType, limit, offset, id, cb) => {
  if(sortBy=='time'){
    sortBy='time_transaction';
  }
  const q = `SELECT * FROM transaction WHERE sender_id=$1 
  ${searchBy != null ? 'AND' `(${searchBy} LIKE '%${keyword}%')`: ''} 
  ORDER BY ${sortBy==null? 'time_transaction DESC' : `${sortBy} ${sortType}`}
  LIMIT $2 OFFSET $3`;
  const val = [id, limit, offset];
  db.query(q, val, (err, result)=>{
    console.log(err);
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
  const q = 'UPDATE transaction SET time_transaction=$1, notes=$2, amount=$3, type_id=$4, recipient_id=$5, sender_id=$6 WHERE id=$7 RETURNING *';
  const val = [data.time, data.notes, data.amount, data.type_id, data.recipient_id, data.sender_id, id];

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

exports.softDelete = (id, cb) => {
  const q = 'UPDATE transaction SET is_deleted=true WHERE id=$1 RETURNING *';
  const val = [id];
  db.query(q, val, (err, result) => {
    if(err) {
      cb(err);
    } else {
      cb(err, result.rows);
    }
  });
};

exports.createTransaction = (time, data, id, cb) => {
  const q = 'INSERT INTO transaction(time_transaction, notes, amount, type_id, recipient_id, sender_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
  const val = [time, data.notes, data.amount, data.type_id, data.recipient_id, id];
  db.query(q, val, (err, result)=>{
    if(err) {
      cb(err);
    } else {
      cb(err, result.rows);
    }
  });
};

// exports.amountCalculate = (senderId, recipientId, amountSender, amountRecipient, cb) => {
//   db.query('BEGIN', err => {
//     if (err) {
//       cb(err);
//     }
//     const q = 'UPDATE transaction SET amount=$1, type_id=$4, recipient_id=$5, sender_id=$6 WHERE id=$7 RETURNING *';
//   const val = [data.time, data.notes, data.amount, data.type_id, data.recipient_id, data.sender_id, id];
//   })
// }
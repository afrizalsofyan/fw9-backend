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
  const q = `SELECT * FROM transaction WHERE ${searchBy != null ? `${searchBy=='amount' ? 'amount::text' : searchBy} LIKE '%${keyword}%' AND `: ''} 
  recipient_id=$1 OR sender_id=$1 ORDER BY ${sortBy==null ? 'time_transaction DESC' : `${sortBy} ${sortType}`}
  LIMIT $2 OFFSET $3`;
  const val = [id, limit, offset];
  
  db.query(q, val, (err, result)=>{
    cb(err, result.rows);
  });
};

exports.countTransactionData = (keyword, searchBy, userId, cb) => {
  const q = `SELECT * FROM transaction WHERE ${searchBy != null ? `${searchBy=='amount' ? 'amount::text' : searchBy} LIKE '%${keyword}%' AND `: ''} 
  recipient_id=${userId} OR sender_id=${userId}`;
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

exports.createTransaction = (time, senderId, data, cb) => {
  db.query('BEGIN', err => {
    if (err) {
      cb(err);
    }
    const insTrans = 'INSERT INTO transaction(time_transaction, notes, amount, type_id, recipient_id, sender_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING time_transaction, notes, amount, recipient_id';
    const valIns = [time, data.notes, data.amount, data.type_id, data.recipient_id, senderId];
    db.query(insTrans, valIns, (err, resultIns)=>{
      if(err){
        cb(err);
      } else {
        cb(err, resultIns.rows);
        const updUser1 = 'UPDATE profile SET balance=balance-$1 WHERE user_id=$2';
        const valUpd1 = [Number(data.amount), senderId];
        db.query(updUser1, valUpd1, err=>{
          if(err){
            cb(err);
          } else {
            const updUser2 = 'UPDATE profile SET balance=balance+$1 WHERE user_id=$2';
            const valUpd2 = [parseInt(data.amount), parseInt(data.recipient_id)];
            db.query(updUser2, valUpd2, err => {
              if(err) {
                cb(err);
              } else {
                db.query('COMMIT', err => {
                  if(err) {
                    console.log('Error commit transaction', err.stack);
                  } 
                });
              }
            });
          }
        });
      }
    });
  });
};

exports.topUpBalance = (time, userId, data, cb) => {
  db.query('BEGIN', err=> {
    if(err){
      cb(err);
    } else {
      const insTopup = 'INSERT INTO transaction(time_transaction, amount, type_id, recipient_id) VALUES($1, $2, $3, $4) RETURNING time_transaction, amount, type_id, recipient_id';
      const valTopup = [time, data.amount, data.type_id, userId];
      db.query(insTopup, valTopup, (err, result)=>{
        if(err) {
          cb(err);
        } else {
          cb(err, result.rows);
          const updBalance = 'UPDATE profile SET balance=balance+$1 WHERE user_id=$2';
          const valBalance = [parseInt(data.amount), userId];
          db.query(updBalance, valBalance, (err)=>{
            if(err) {
              cb(err);
            } else {
              db.query('COMMIT', err => {
                if (err) { {
                  cb(err);
                }
                  
                }
              });
            }
          });
        }
      });
    }
  });
};
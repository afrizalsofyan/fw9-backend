const db = require('../helpers/db');

exports.createNewTransaction = (data, cb) => {
  const q =
    'INSERT INTO transaction(time_transaction, notes, amount, type_id, recipient_id, sender_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
  const val = [
    data.time,
    data.notes,
    data.amount,
    data.type_id,
    data.recipient_id,
    data.sender_id,
  ];
  db.query(q, val, (err, result) => {
    if (err) {
      cb(err);
    } else {
      cb(err, result.rows);
    }
  });
};

exports.getAllTransaction = (
  keyword,
  searchBy,
  sortBy,
  sortType,
  limit,
  offset,
  id,
  cb
) => {
  if (sortBy == 'time') {
    sortBy = 'time_transaction';
  }
  const q = `SELECT * FROM transaction WHERE ${
    searchBy != null
      ? `${
        searchBy == 'amount' ? 'amount::text' : searchBy
      } LIKE '%${keyword}%' AND `
      : ''
  } 
  recipient_id=$1 OR sender_id=$1 ORDER BY ${
  sortBy == null ? 'time_transaction DESC' : `${sortBy} ${sortType}`
}
  LIMIT $2 OFFSET $3`;
  const val = [id, limit, offset];

  db.query(q, val, (err, result) => {
    cb(err, result.rows);
  });
};

exports.countTransactionData = (keyword, searchBy, userId, cb) => {
  const q = `SELECT * FROM transaction WHERE ${
    searchBy != null
      ? `${
        searchBy == 'amount' ? 'amount::text' : searchBy
      } LIKE '%${keyword}%' AND `
      : ''
  } 
  recipient_id=${userId} OR sender_id=${userId}`;
  db.query(q, (err, result) => {
    cb(err, result.rowCount);
  });
};

exports.getTransaction = (id, cb) => {
  const q =
    'SELECT t.id, t.time_transaction, t.notes,transaction_type.type_name type, u1.username recipient, p1.photo_url image_recipient, u2.username sender, t.amount FROM "transaction" t FULL OUTER JOIN users u1 ON u1.id = t.recipient_id FULL OUTER JOIN profile p1 ON p1.user_id = u1.id FULL OUTER JOIN users u2 ON u2.id = t.sender_id  FULL OUTER JOIN transaction_type ON transaction_type.id = t.type_id WHERE t.id=$1';
  const val = [id];
  db.query(q, val, (err, result) => {
    cb(err, result);
  });
};

exports.getTransactionByTime = (cb) => {
  const q = 'SELECT * FROM transaction ORDER BY time_transaction DESC';
  db.query(q, (err, result) => {
    cb(result.rows);
  });
};

exports.updateTransaction = (id, data, cb) => {
  const q =
    'UPDATE transaction SET time_transaction=$1, notes=$2, amount=$3, type_id=$4, recipient_id=$5, sender_id=$6 WHERE id=$7 RETURNING *';
  const val = [
    data.time,
    data.notes,
    data.amount,
    data.type_id,
    data.recipient_id,
    data.sender_id,
    id,
  ];

  db.query(q, val, (err, result) => {
    if (err) {
      cb(err);
    } else {
      cb(err, result.rows);
    }
  });
};

exports.deleteTransaction = (id, cb) => {
  const q = 'DELETE FROM transaction WHERE id=$1 RETURNING *';
  const val = [id];
  db.query(q, val, (err, result) => {
    cb(result.rows);
  });
};

exports.softDelete = (id, cb) => {
  const q = 'UPDATE transaction SET is_deleted=true WHERE id=$1 RETURNING *';
  const val = [id];
  db.query(q, val, (err, result) => {
    if (err) {
      cb(err);
    } else {
      cb(err, result.rows);
    }
  });
};

exports.createTransaction = (time, senderId, data, cb) => {
  db.query('BEGIN', (err) => {
    if (err) {
      cb(err);
    }
    const insTrans =
      'INSERT INTO transaction(time_transaction, notes, amount, type_id, recipient_id, sender_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
    const valIns = [
      time,
      data.notes,
      data.amount,
      data.type_id,
      data.recipient_id,
      senderId,
    ];
    db.query(insTrans, valIns, (err, resultIns) => {
      if (err) {
        cb(err);
      } else {
        cb(err, resultIns.rows);
        const updUser1 =
          'UPDATE profile SET balance=balance-$1 WHERE user_id=$2';
        const valUpd1 = [Number(data.amount), senderId];
        db.query(updUser1, valUpd1, (err) => {
          if (err) {
            cb(err);
          } else {
            const updUser2 =
              'UPDATE profile SET balance=balance+$1 WHERE user_id=$2';
            const valUpd2 = [
              parseInt(data.amount),
              parseInt(data.recipient_id),
            ];
            db.query(updUser2, valUpd2, (err) => {
              if (err) {
                cb(err);
              } else {
                const transaction_id = resultIns.rows[0].id;
                const createNotifQuery =
                  'INSERT INTO notification(user_id, transaction_id) VALUES($1, $2)';
                const valNotification = [senderId, transaction_id];
                db.query(createNotifQuery, valNotification, (err) => {
                  if (err) {
                    cb(err);
                  } else {
                    db.query('COMMIT', (err) => {
                      if (err) {
                        console.log('Error commit transaction', err.stack);
                      }
                    });
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
  const id_topup = 110;
  db.query('BEGIN', (err) => {
    if (err) {
      cb(err);
    } else {
      const insTopup =
        'INSERT INTO transaction(time_transaction, amount, type_id, sender_id, recipient_id) VALUES($1, $2, $3, $4, $5) RETURNING id, time_transaction, amount, type_id, recipient_id';
      const valTopup = [time, data.amount, data.type_id, id_topup, userId];
      db.query(insTopup, valTopup, (err, result) => {
        if (err) {
          cb(err);
        } else {
          console.log(err);
          cb(err, result.rows);
          const updBalance =
            'UPDATE profile SET balance=balance+$1 WHERE user_id=$2';
          const valBalance = [parseInt(data.amount), userId];
          db.query(updBalance, valBalance, (err) => {
            if (err) {
              cb(err);
            } else {
              const topupId = result.rows[0].id;
              const createNotificationQuery = 'INSERT INTO notification(user_id, transaction_id) VALUES ($1, $2)';
              const valNotification = [userId, topupId];
              db.query(createNotificationQuery, valNotification, err => {
                if(err){
                  cb(err);
                } else {
                  db.query('COMMIT', (err) => {
                    if (err) {
                      {
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
    }
  });
};

exports.historyTransaction = (
  keyword,
  searchBy,
  sortBy,
  sortType,
  limit,
  offset,
  currentUserId,
  cb
) => {
  if (sortBy == 'time') {
    sortBy = 'time_transaction';
  }
  // const q = 'SELECT * FROM transaction WHERE recipient_id=$1 OR sender_id=$2 ORDER BY amount DESC, id DESC LIMIT $3 OFFSET $4';
  const q = `SELECT t.id, t.time_transaction, t.notes,transaction_type.type_name type, u1.username recipient, p1.photo_url image_recipient, u2.username sender, t.amount FROM "transaction" t FULL OUTER JOIN users u1 ON u1.id = t.recipient_id FULL OUTER JOIN profile p1 ON p1.user_id = u1.id FULL OUTER JOIN users u2 ON u2.id = t.sender_id  FULL OUTER JOIN transaction_type ON transaction_type.id = t.type_id WHERE 
  ${
  searchBy != null
    ? `${
      searchBy === 'amount'
        ? 't.amount::text'
        : `${
          searchBy === 'recipient'
            ? 'u1.username'
            : `${searchBy === 'sender' ? 'u2.username' : ''}`
        }`
    } LIKE '%${keyword}%' AND`
    : ''
} 

    (t.recipient_id = $1 OR t.sender_id = $2) ORDER BY ${
  sortBy == null
    ? 't.time_transaction DESC'
    : `${sortBy} ${sortType}, id ${sortType}`
} LIMIT $3 OFFSET $4`;
  const val = [currentUserId, currentUserId, limit, offset];
  db.query(q, val, (err, result) => {
    // console.log(err)
    cb(err, result);
  });
};

exports.countHistoryTransaction = (keyword, searchBy, currentUserId, cb) => {
  // const q = 'SELECT * FROM transaction WHERE recipient_id=$1 OR sender_id=$2';
  const q = `SELECT t.id, t.time_transaction, t.notes,transaction_type.type_name, u1.username recipient, u2.username sender, t.amount FROM "transaction" t  FULL OUTER JOIN users u1 ON u1.id = t.recipient_id  FULL OUTER JOIN users u2 ON u2.id = t.sender_id  FULL OUTER JOIN transaction_type ON transaction_type.id = t.type_id WHERE 
  ${
  searchBy != null
    ? `${
      searchBy === 'amount'
        ? 't.amount::text'
        : `${
          searchBy === 'recipient'
            ? 'u1.username'
            : `${searchBy === 'sender' ? 'u2.username' : ''}`
        }`
    } LIKE '%${keyword}%' AND`
    : ''
} 

    (t.recipient_id = $1 OR t.sender_id = $2)`;
  const val = [currentUserId, currentUserId];
  db.query(q, val, (err, result) => {
    cb(err, result.rowCount);
  });
};

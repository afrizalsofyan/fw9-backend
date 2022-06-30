const db = require('../helpers/db');

exports.addNewType = (data, cb) => {
  const q = 'INSERT INTO transaction_type (type_name, type_desc) VALUES ($1, $2) RETURNING *';
  const val = [data.name, data.description];

  db.query(q, val, (err, result)=>{
    cb(result.rows);
  });
};
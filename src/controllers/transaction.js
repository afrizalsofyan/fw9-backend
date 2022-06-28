const dataDummy = require('../../dummy_data');
const response = require('../helpers/standartResponse');

exports.getTransaction = (req, res) => {
  const data = dataDummy['transaction'];
  let date = data.map(el=> el['date_transaction']);
  console.log(date);
  return response(res, 'this is transaction data.', 200, date);
};
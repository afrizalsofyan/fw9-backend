const response = require('../helpers/standartResponse');
const typeTransModel = require('../models/type_transaction');

exports.addNewType = (req, res) => {
  typeTransModel.addNewType(req.body, (result)=>{
    return response(res, 'Type transaction has been added.', result[0]);
  });
};
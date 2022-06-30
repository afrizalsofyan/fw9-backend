const response = require('../helpers/standartResponse');
const typeTransModel = require('../models/type_transaction');

exports.addNewType = (req, res) => {
  typeTransModel.addNewType(req.body, (result)=>{
    return response(res, 'Type transaction has been added.', result[0]);
  });
};

exports.getTypes = (req, res) => {
  typeTransModel.getTypes((result)=>{
    return response(res, 'All types selected', result);
  });
};

exports.getType = (req, res) => {
  const {id} = req.params;
  typeTransModel.getType(id, (result)=>{
    return response(res, 'This is your data selected', result[0]);
  });
};

exports.updateType = (req, res) => {
  const {id} = req.params;
  typeTransModel.updateType(id, req.body, (result)=>{
    return response(res, 'Data update successfully', result[0]);
  });
};

exports.hardDeleteType = (req, res) => {
  const {id} = req.params;
  typeTransModel.deleteType(id, (result)=>{
    return response(res, 'Deleted data success', result[0]);
  });
};
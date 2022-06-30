const response = require('../helpers/standartResponse');

const transactionModel = require('../models/transaction');


exports.createTransaction = (req, res) => {
  transactionModel.createNewTransaction(req.body, (result)=>{
    return response(res, 'Data created', result);
  });
};

exports.getAllTransaction = (req, res) => {
  transactionModel.getAllTransaction((result)=>{
    return response(res, 'This is all transaction', result);
  });
};

exports.getTransaction = (req, res) => {
  const {id} = req.params;
  transactionModel.getTransaction(id, (result)=>{
    return response(res, 'This is data selected', result[0]);
  });
};

exports.updateTransaction = (req, res) => {
  const {id} = req.params;
  transactionModel.updateTransaction(id, req.body, (result)=>{
    return response(res, 'Data updated', result[0]);
  });
};

exports.hardDeletedTransaction = (req, res) => {
  const {id} = req.params;
  transactionModel.deleteTransaction(id, (result)=>{
    return response(res, 'Data deleted', result[0]);
  });
};
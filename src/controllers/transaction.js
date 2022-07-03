const response = require('../helpers/standartResponse');

const transactionModel = require('../models/transaction');

const { body, validationResult } = require('express-validator');
const errorResponse = require('../helpers/errorResponse');
const validator = [
  body('time').isISO8601().withMessage('Date time format invalid (ISO8601)'),
  body('amount').isInt().withMessage('Please input number format'),
];

exports.createTransaction = [
  ...validator,
  (req, res) => {
    const validation = validationResult(req);
    if (!validation.isEmpty()) {
      return response(res, 'Error input', validation.array(), 400);
    }
    transactionModel.createNewTransaction(req.body, (err, result) => {
      if (err) {
        return errorResponse(err, res);
      } else {
        return response(res, 'Data created', result);
      }
    });
  },
];

exports.getAllTransaction = (req, res) => {
  transactionModel.getAllTransaction((result) => {
    return response(res, 'This is all transaction', result);
  });
};

exports.getTransaction = (req, res) => {
  const { id } = req.params;
  transactionModel.getTransaction(id, (result) => {
    return response(res, 'This is data selected', result[0]);
  });
};

exports.getTransactionByTime = (req, res) => {
  transactionModel.getTransactionByTime((result) => {
    return response(res, 'This sort by time', result);
  });
};

exports.updateTransaction = [
  ...validator,
  (req, res) => {
    const { id } = req.params;
    transactionModel.updateTransaction(id, req.body, (err, result) => {
      if (err) {
        return errorResponse(err, result);
      } else {
        return response(res, 'Data updated', result[0]);
      }
    });
  },
];

exports.hardDeletedTransaction = (req, res) => {
  const { id } = req.params;
  transactionModel.deleteTransaction(id, (result) => {
    return response(res, 'Data deleted', result[0]);
  });
};

exports.findTransaction = (req, res) => {
  const { param } = req.params;
  // const parseParam = parseInt(param);
  transactionModel.findTransaction((err, result) => {
    if (err) {
      return errorResponse(err, res);
    } else {
      const notesFind = result
        .map((el) => el.notes.toLowerCase())
        .filter((word) => word.includes(param.toLowerCase()));
      return response(res, 'This find transaction', notesFind);
    }
  });
};

// const timeNow = new Date(Date.now());
// const getMonth = timeNow.getMonth() + 1;
// const dat = result.map(el=>el.time_transaction);
// const time = new Date(dat).toString();
// console.log(time);

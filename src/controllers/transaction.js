const response = require('../helpers/standartResponse');

const transactionModel = require('../models/transaction');

const { body, validationResult } = require('express-validator');
const errorResponse = require('../helpers/errorResponse');
const validator = [
  body('time').isISO8601().withMessage('Date time format invalid (ISO8601)'),
  body('amount').isInt().withMessage('Please input number format'),
];

const {LIMIT_DATA} = process.env;

exports.createTransaction = [
  ...validator,
  (req, res) => {
    const validation = validationResult(req);
    if (!validation.isEmpty()) {
      return response(res, 'Error input', validation.array(), 400);
    }
    transactionModel.createNewTransaction(req.body, (err, result) => {
      console.log(err);
      if (err) {
        return errorResponse(err, res);
      } else {
        return response(res, 'Data created', result);
      }
    });
  },
];

exports.getAllTransaction = (req, res) => {
  const {search='',searchBy, sortBy, sortType, limit=parseInt(LIMIT_DATA), page=1} = req.query;
  const type = parseInt(sortType);
  const offset = (page-1) * limit;
  let typeSort='';
  if(type == 0){
    typeSort = 'ASC';
  } else {
    typeSort = 'DESC';
  }
  if(!type){
    typeSort = 'ASC';
  }
  const pageInfo = {};

  transactionModel.getAllTransaction(search, searchBy, sortBy, typeSort,limit, offset, (err, result) => {
    if(result.length < 1){
      return res.redirect('/404');
    }
    transactionModel.countTransactionData(search, (err, infoData)=>{
      pageInfo.totalDatas = infoData;
      pageInfo.pages = Math.ceil(infoData/limit);
      pageInfo.currentPage = parseInt(page);
      pageInfo.prevPage = pageInfo.currentPage > 1 ? pageInfo.currentPage - 1 : null;
      pageInfo.nextPage = pageInfo.currentPage < pageInfo.pages ? pageInfo.currentPage + 1 : null;
      return response(res, 'This is all transaction', result, pageInfo);
    });
  });
};

exports.getTransaction = (req, res) => {
  const { id } = req.params;
  transactionModel.getTransaction(id, (result) => {
    if(result < 1) {
      return res.redirect('/404');
    }
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

// // const timeNow = new Date(Date.now());
// // const getMonth = timeNow.getMonth() + 1;
// // const dat = result.map(el=>el.time_transaction);
// // const time = new Date(dat).toString();
// // console.log(time);

const transactionModel = require('../../models/transaction');
const response = require('../../helpers/standartResponse');
const profileModel = require('../../models/profiles');

exports.createTransaction = (req, res) => {
  const currentUser = req.authUser;
  const tm = new Date();
  req.body.time = new Date(tm.toLocaleString('en-US', {timeZone: 'Asia/Jakarta'}));
  const dateStr = req.body.time.toLocaleDateString();
  const timeStr = req.body.time.toLocaleTimeString();
  let dateTime = dateStr+'T'+timeStr;
  const minTransfer = 10000;
  const maxTransfer = 50000000;
  
  if(req.body.amount == '') {
    req.body.amount = 0;
  }
  if(req.body.amount < minTransfer){
    return response(res, 'Minimum transfer is 10.000', null, null, 400);
  } else if(req.body.amount > maxTransfer) {
    return response(res, 'Maximum trasfer is 50.000.000', null, null, 400);
  } else {
    profileModel.getProfileByUserId(currentUser.id, (err, rslt) => {
      if(rslt[0].balance < 1) {
        return response(res, 'Your have\'nt more balance, please top up first!!!', null, null, 400);
      } else if (rslt[0].balance < req.body.amount ) {
        return response(res, 'Balance is low then amount, change amount or top up first!!!', null, null, 400);
      } else {
        transactionModel.createTransaction(dateTime, currentUser.id, req.body, (err, result)=>{
          if(result.length < 1){
            return response(res, 'Transaction failed.', null, null, 400);
          } 
          return response(res, 'Transaction success.', result[0]);
        });
      }
    });
  }
};

exports.historyTransaction = (req, res) => {
  const currentUser = req.authUser;
  const {search='',searchBy, sortBy, sortType, limit=parseInt(process.env.LIMIT_DATA), page=1} = req.query;
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

  transactionModel.getAllTransaction(search, searchBy, sortBy, typeSort, limit, offset, currentUser.id, (err, result) => {
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
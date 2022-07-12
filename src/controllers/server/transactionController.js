const transactionModel = require('../../models/transaction');
const response = require('../../helpers/standartResponse');
const profileModel = require('../../models/profiles');
const errorResponse = require('../../helpers/errorResponse');
const userModel = require('../../models/users');

exports.transfer = (req, res) => {
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
    userModel.getUserByEmail(currentUser.email, (err, resultUser)=>{
      if(err){
        return errorResponse(err, res);
      } else if(resultUser.rows[0].pin_number !== parseInt(req.body.pin)){
        return response(res, 'Transaction failed. Pin is not correct.', null, null, 400);
      } else {
        profileModel.getProfileByUserId(currentUser.id, (err, rslt) => {
          if(rslt[0].balance < 1) {
            return response(res, 'Your have\'nt more balance, please top up first!!!', null, null, 400);
          } else if (rslt[0].balance < req.body.amount ) {
            return response(res, 'Balance is low then amount, change amount or top up first!!!', null, null, 400);
          } else {
            transactionModel.createTransaction(dateTime, currentUser.id, req.body, (err, result)=>{
              if(err){
                return errorResponse(err, res);
              } else {
                if(result.length < 1){
                  return response(res, 'Transaction failed.', null, null, 400);
                }
                //update response if has been create join query
                profileModel.getProfileByUserId(result[0].recipient_id, (err, resultRecipient)=>{
                  const finalResult = {
                    'time_transaction' : result[0].time_transaction, 
                    'notes': result[0].notes, 
                    'amount': result[0].amount,
                    'sender_name': `${rslt[0].first_name} ${rslt[0].last_name}`,
                    'recipient_name': `${resultRecipient[0].first_name} ${resultRecipient[0].last_name}`, 
                    'balance': rslt[0].balance
                  };
                  return response(res, 'Transaction success.', finalResult);
                });
              }
            });
          }
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
    transactionModel.countTransactionData(search, searchBy, currentUser.id, (err, infoData)=>{
      pageInfo.totalDatas = infoData;
      pageInfo.pages = Math.ceil(infoData/limit);
      pageInfo.currentPage = parseInt(page);
      pageInfo.prevPage = pageInfo.currentPage > 1 ? pageInfo.currentPage - 1 : null;
      pageInfo.nextPage = pageInfo.currentPage < pageInfo.pages ? pageInfo.currentPage + 1 : null;
      return response(res, 'This is all transaction', result, pageInfo);
    });
  });
};

exports.topUpBalance = (req, res) => {
  const user = req.authUser;
  const tm = new Date();
  req.body.time = new Date(tm.toLocaleString('en-US', {timeZone: 'Asia/Jakarta'}));
  const dateStr = req.body.time.toLocaleDateString();
  const timeStr = req.body.time.toLocaleTimeString();
  let dateTime = dateStr+'T'+timeStr;
  const minTopup = 50000;
  const maxTopup = 100000000;
  const maxBalance = 1000000000;
  if(req.body.amount < minTopup) {
    return response(res, 'Minimum topup 50.000', null, null, 400);
  }else if(req.body.amount > maxTopup) {
    return response(res, 'Maximum topup 100.000.000', null, null, 400);
  } else {
    profileModel.getProfileByUserId(user.id, (err, result)=>{
      const balance = result[0].balance;
      const limitBalance = balance + req.body.amount;
      if(err) {
        return errorResponse(err, res);
      } else {
        if(limitBalance > maxBalance){
          return response(res, 'Your balance is maximum');
        } else {
          transactionModel.topUpBalance(dateTime, user.id, req.body, (err, resultTrans)=>{
            if(err){
              return errorResponse(err, res);
            } else {
              if(resultTrans[0].length < 1) {
                return response(res, 'Topup failed.', null, null, 400);
              } else {
                return response(res, 'Topup success', resultTrans[0]);
              }
            }
            
          });
        }
      }
    });
  }
};
const transactionModel = require('../../models/transaction');
const response = require('../../helpers/standartResponse');
const profileModel = require('../../models/profiles');
const errorResponse = require('../../helpers/errorResponse');
const userModel = require('../../models/users');
const firebaseAdmin = require('../../helpers/firebaseConfig');
const notificationModel = require('../../models/notification');

const convertMoney = (number) => new Intl.NumberFormat('ID-Id', {
  style: 'currency',
  currency: 'IDR',
}).format(number);

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
      const senderName = resultUser.rows[0].username;
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
            notificationModel.getFCMToken(currentUser.id, (err, resultToken) => {
              if(err){
                console.log(err);
              } else {
                notificationModel.getFCMToken(req.body.recipient_id, (err, resultTokenRecipient) => {
                  // if(resultTokenRecipient.rows.length >= 1) {}
                  userModel.getUser(req.body.recipient_id, (errRecipient, resultRecipient) => {
                    if(err){
                      return response(res, 'Transfer Failed. Cannot find recipient.', null, null, 400);
                    } else {
                      transactionModel.createTransaction(dateTime, currentUser.id, req.body, (err, result)=>{
                        if(err){
                          return errorResponse(err, res);
                        } else {
                        // fcmTokenData.map(e=>{
                        //   const message = {
                        //     notification: {
                        //       title: 'Transfer Success',
                        //       body: `you just transferred to ${resultProfile.rows[0].username}`
                        //     }
                        //   };
                        //   firebaseAdmin.messaging().sendToDevice(e.token, message , {
                        //     priority: 'high',
                        //     timeToLive: 60 * 60 * 24
                        //   });
                        // })
                        // FIREBASE REMOTE SENDER
                          if(resultTokenRecipient.rows.length < 1) {
                            firebaseAdmin.sendFirebase(resultToken.rows[0].token, 'Transfer Success', `You transfer to ${resultRecipient[0].username}`);
                          } else {
                            firebaseAdmin.sendFirebase(resultToken.rows[0].token, 'Transfer Success', `You transfer to ${resultRecipient[0].username}`);
                            firebaseAdmin.sendFirebase(resultTokenRecipient.rows[0].token, 'Transfer Recivied', `You recieve amount ${convertMoney(result[0].amount)} from ${senderName}`);
                          }
                          return response(res, 'Transaction success.', result);
                        }
                      });
                    }
                  });
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
  const maxBalance = 100000000000;
  if(req.body.amount < minTopup) {
    return response(res, 'Minimum topup 50.000', null, null, 400);
  }else if(req.body.amount > maxTopup) {
    return response(res, 'Maximum topup 100.000.000', null, null, 400);
  } else {
    profileModel.getProfileByUserId(user.id, (err, result)=>{
      const balance = result[0].balance;
      const limitBalance = balance + parseInt(req.body.amount, 10);
      if(err) {
        return errorResponse(err, res);
      } else {
        if(limitBalance > maxBalance){
          return response(res, 'Your balance is maximum');
        } else {
          notificationModel.getFCMToken(user.id, (err, resultToken) => {
            if(err){
              console.log(err);
            } else {
              transactionModel.topUpBalance(dateTime, user.id, req.body, (err, resultTrans)=>{
                if(err){
                  return errorResponse(err, res);
                } else {
                  if(resultTrans[0].length < 1) {
                    return response(res, 'Topup failed.', null, null, 400);
                  } else {
                    firebaseAdmin.sendFirebase(resultToken.rows[0].token, 'Topup Success', `Your balance now ${convertMoney(result[0].balance + parseInt(req.body.amount, 10), 10)}`);
                    // const Tokens = resultToken.rows[0].token;
                    // const message = {
                    //   notification: {
                    //     title: 'Topup Success',
                    //     body: 'You have 1 transaction. Check it at history'
                    //   }
                    // };
                    // firebaseAdmin.messaging().sendToDevice(Tokens, message, {
                    //   priority: 'high',
                    // }).then(response => console.log(response)).catch(error => console.log(error));
                    return response(res, 'Topup success', resultTrans[0]);
                  }
                }
              });
            }
          });
          
        }
      }
    });
  }
};

exports.getAllTransactions = (req, res) => {
  const currentUser = req.authUser;
  const {search='',searchBy, sortBy, sortType, limit=parseInt(process.env.LIMIT_DATA), page=1} = req.query;
  const type = parseInt(sortType);
  const offset = (page-1) * limit;
  let typeSort='';
  const pageInfo = {};
  if(type == 0){
    typeSort = 'ASC';
  } else {
    typeSort = 'DESC';
  }
  if(!type){
    typeSort = 'ASC';
  }
  transactionModel.historyTransaction(search, searchBy, sortBy, typeSort, limit, offset, currentUser.id,  (err, result)=>{
    if(err){
      return errorResponse(err, res);
    } else {
      transactionModel.countHistoryTransaction(search, searchBy, currentUser.id, (err, infoData)=>{
        pageInfo.totalDatas = infoData;
        pageInfo.pages = Math.ceil(infoData/limit);
        pageInfo.currentPage = parseInt(page);
        pageInfo.prevPage = pageInfo.currentPage > 1 ? pageInfo.currentPage - 1 : null;
        // pageInfo.prevPage = pageInfo.currentPage > 1 ? `http://localhost:3555transactions/getAllTransaction?page=${pageInfo.currentPage - 1 }` : null;
        // pageInfo.nextPage = pageInfo.currentPage < pageInfo.pages ? `http://localhost:3555transactions/getAllTransaction?page=${ pageInfo.currentPage + 1 }` : null;
        pageInfo.nextPage = pageInfo.currentPage < pageInfo.pages ? pageInfo.currentPage + 1 : null;
        // return response(res, 'This is all transaction', result, pageInfo);
        return response(res, 'This is all your transaction history', result.rows, pageInfo);
      });
    }
  });
};

exports.getTransaction = (req, res) => {
  transactionModel.getTransaction(parseInt(req.params.id, 10), (err, result) => {
    if(err){
      return errorResponse(err, res);
    } else {
      if (result.rows.length < 1) {
        return response(res, 'Data not found. Something wrong.', null, null, 400);
      } else {
        return response(res, 'Success get detail', result.rows);
      }
    }
  });
};
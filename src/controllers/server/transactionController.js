const transactionModel = require('../../models/transaction');
const profileModel = require('../../models/profiles');
const userModel = require('../../models/users');
const response = require('../../helpers/standartResponse');

exports.createTransaction = (req, res) => {
  const data = req.authUser;
  const tm = new Date();
  req.body.time = new Date(tm.toLocaleString('en-US', {timeZone: 'Asia/Jakarta'}));
  const dateStr = req.body.time.toLocaleDateString();
  const timeStr = req.body.time.toLocaleTimeString();
  let dateTime = dateStr+'T'+timeStr;
  profileModel.getProfileByUserId(data.id, (err, rs)=>{
    if(rs[0].balance < req.body.amount) {
      return response(res, 'Balance is low then amount, change amount or top up first!!!', null, null, 400);
    } else if (rs[0].balance < 1) {
      return response(res, 'Your have\'nt more balance, plea top up first!!!', null, null, 400);
    } else {
      transactionModel.createTransaction(dateTime, req.body, data.id, (err, result)=>{
        const senderId = data.id;
        profileModel.getProfileByUserId(senderId, (err, resultProfile)=>{
          if(resultProfile < 1 ){
            return response(res, 'Profile sender not found', null, null, 400);
          } else {
            const currentBalance = resultProfile[0].balance;
            const newBalance = currentBalance - req.body.amount;
            profileModel.updateProfile(resultProfile[0].id, {balance: newBalance}, null, ()=>{});
          }
        });
        if(req.body.recipient_id) {
          const recipientId = parseInt(req.body.recipient_id);
          userModel.getUser(recipientId, (err, resultUser)=>{
            if(resultUser.length < 1){
              return response(res, 'Recipent id not found!!!', null, null, 400);
            } else {
              profileModel.getProfileByUserId(resultUser[0].id, (err, resultProfile)=>{
                if(resultProfile < 1 ){
                  return response(res, 'Profile recipient not found', null, null, 400);
                } else {
                  const currentBalance = parseInt(resultProfile[0].balance);
                  const newBalance = currentBalance + parseInt(req.body.amount);
                  profileModel.updateProfile(resultProfile[0].id, {balance: newBalance}, null, ()=>{});
                }
              });
            }
          });
        }
        return response(res, 'Transaction has been created.', result[0]);
      });
    }
  });
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
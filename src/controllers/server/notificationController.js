const response = require('../../helpers/standartResponse');
const errResponse = require('../../helpers/errorResponse');
const notificationModel = require('../../models/notification');

exports.getAllNotificationsReading = (req, res) => {
  const idUser = req.authUser.id;
  notificationModel.getAllNotificationsReading(idUser, (err, result) => {
    if(err){
      return errResponse(err, res);
    } else {
      if(result.rows.length < 1) {
        return response(res, 'Notification is Empty', null, null);
      } else {
        return response(res, 'Success get notifications', result.rows);
      }
    }
  });
};
exports.getAllNotifications = (req, res) => {
  const idUser = req.authUser.id;
  const {limit=parseInt(process.env.LIMIT_DATA), page=1} = req.query;
  const offset = (page-1) * limit;
  const pageInfo = {};
  notificationModel.getAllNotifications(idUser, limit, offset, (err, result) => {
    if(err){
      return errResponse(err, res);
    } else {
      if(result.rows.length < 1) {
        return response(res, 'Notification is Empty', null, null);
      } else {
        notificationModel.countNotifications(idUser, (err, infoData) =>{
          pageInfo.totalDatas = infoData;
          pageInfo.pages = Math.ceil(infoData/limit);
          pageInfo.currentPage = parseInt(page);
          pageInfo.prevPage = pageInfo.currentPage > 1 ? pageInfo.currentPage - 1 : null;
          pageInfo.nextPage = pageInfo.currentPage < pageInfo.pages ? pageInfo.currentPage + 1 : null;
          return response(res, 'Success get notifications', result.rows, pageInfo);
        });
      }
    }
  });
};
exports.isReadNotification = (req, res) => {
  const idNotification = req.params.id;
  notificationModel.idReadingNotification(idNotification, (err, result)=>{
    if(err){
      return errResponse(err, res);
    } else {
      return response(res, 'Notification has been read', result.rows[0]);
    }   
  });
};

exports.createFCMToken = (req, res) => {
  const token = req.body.token;
  notificationModel.checkToken(token, (err, result)=>{
    if(result.rows.length < 1){
      notificationModel.createFCMToken(token, (err, result)=>{
        if(err){
          return errResponse(err, res);
        } else {
          return response(res, 'Success created token FCM');
        }
      });
    } else {
      return response(res, 'Error. Token has been created', null, null, 400);
    }
  });
};

exports.updateFCMTokenUserLogin = (req, res) => {
  const idUser = req.body.idUser;
  notificationModel.updateFCMTokenUserLogin(idUser, (err, result) => {
    if(err) {
      return errResponse(err, res);
    } else {
      return response(res, 'Success set user on token FCM', result.rows[0]);
    }
  });
};

exports.getFCMToken = (req, res) => {
  const idUser = req.authUser.id;
  notificationModel.getFCMToken(idUser, (err, result)=>{
    console.log(err)
    if(err) {
      return errResponse(err, res);
    } else {
      if(!result.rows){
        return response(res, 'No FCM token for this user', null, null, 400);
      } else {
        return response(res, 'success get fcm token', result.rows[0]);
      }
    }
  });
};

exports.checkFCMToken = (req, res) => {
  const token = req.params.token;
  notificationModel.checkToken(token, (err, result) => {
    return response(res, 'There is fcm token', result.rows[0]);
  });
};
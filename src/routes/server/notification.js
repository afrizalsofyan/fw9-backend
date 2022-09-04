const notification = require('express').Router();
const notificationcontroller = require('../../controllers/server/notificationController');
const authMiddelware = require('../../middleware/auth');

notification.get('/', authMiddelware, notificationcontroller.getAllNotifications);
notification.get('/reading', authMiddelware, notificationcontroller.getAllNotificationsReading);
notification.patch('/:id', authMiddelware, notificationcontroller.isReadNotification);
notification.post('/fcm', notificationcontroller.createFCMToken);
notification.patch('/fcm', authMiddelware, notificationcontroller.updateFCMTokenUserLogin);
notification.get('/fcm', authMiddelware, notificationcontroller.getFCMToken);
notification.get('/fcm/:token', authMiddelware, notificationcontroller.checkFCMToken);

module.exports = notification;
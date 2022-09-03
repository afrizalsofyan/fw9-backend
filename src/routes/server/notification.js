const notification = require('express').Router();
const notificationcontroller = require('../../controllers/server/notificationController');
const authMiddelware = require('../../middleware/auth');

notification.get('/', authMiddelware, notificationcontroller.getAllNotifications);
notification.get('/reading', authMiddelware, notificationcontroller.getAllNotificationsReading);
notification.patch('/:id', authMiddelware, notificationcontroller.isReadNotification);
notification.post('/fcm', notificationcontroller.createFCMToken);
notification.patch('/fcm', authMiddelware, notificationcontroller.updateFCMTokenUserLogin);

module.exports = notification;
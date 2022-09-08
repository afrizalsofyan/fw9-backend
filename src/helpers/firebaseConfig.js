const admin = require('firebase-admin');
var serviceAccount = require('../../ourpocket-55940-firebase-adminsdk-rgzki-bdd0c4be30.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
exports.sendFirebase = (token, title, body) => {
  const tokenFirebase = token;
  const message = {
    notification: {
      title: title,
      body: body,
    }
  };
  admin.messaging().sendToDevice(tokenFirebase, message, {priority: 'high'}).then(response => console.log(response.results[0].error)).catch(err => console.log(err))
};
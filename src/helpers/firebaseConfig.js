const admin = require('firebase-admin');
var serviceAccount = require('../../ourpocket-fb-firebase-adminsdk-w1h08-dc1a219d2e.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
module.exports = admin;
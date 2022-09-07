const admin = require('firebase-admin');
var serviceAccount = require('../../ourpocket-55940-firebase-adminsdk-rgzki-bdd0c4be30.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
module.exports = admin;
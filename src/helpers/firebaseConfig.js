const admin = require('firebase-admin');
var serviceAccount = require('../../ourpocket-af4b7-firebase-adminsdk-3erhh-9a707cb34a.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
module.exports = admin;
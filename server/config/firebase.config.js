const admin = require("firebase-admin");

const serviceAccount = require("C:/Users/PSK_45/Downloads/player/server/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;

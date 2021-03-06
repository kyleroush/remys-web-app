const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
exports.feedRemy = functions.pubsub.topic("feed-remy").onPublish((message) => {
  admin.database().ref("remy").update({feed: {
    speed: 500,
    length: 500,
  }});
});

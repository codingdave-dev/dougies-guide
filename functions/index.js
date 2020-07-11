const functions = require("firebase-functions");
const admin = require("firebase-admin");
const config = functions.config();
const cors = require("cors")({ origin: true });

admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.deleteUser = functions.https.onRequest(async (request, response) => {
  cors(request, response, () => {
    const { id } = request.query;

    admin
      .auth()
      .deleteUser(`${id}`)
      .then(() => {
        console.log("Deleted User");
        response.status(200).send("Deleted User");

        // admin
        //   .storage()
        //   .bucket()
        //   .deleteFiles({ prefix: `user_profile_photos/${id}/${photoName}` });

        return;
      })
      .catch((error) => {
        console.log("Error Deleting User", error);
        response.status(500).send(error);
        return;
      });
  });
});

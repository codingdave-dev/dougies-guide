const functions = require("firebase-functions");
const admin = require("firebase-admin");
const config = functions.config();
const cors = require("cors")({ origin: true });
const nodemailer = require("nodemailer");

admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: { user: config.user.email, pass: config.user.password },
});

// DELETE USER
exports.deleteUser = functions.https.onRequest(async (request, response) => {
  cors(request, response, () => {
    const { id } = request.query;

    admin
      .auth()
      .deleteUser(`${id}`)
      .then(() => {
        console.log("Deleted User");
        response.status(200).send("Deleted User");

        return;
      })
      .catch((error) => {
        console.log("Error Deleting User", error);
        response.status(500).send(error);
        return;
      });
  });
});

// SEND MAIL
exports.sendMail = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const { name, email, phone, message } = request.query;

    const mailOptions = {
      from: "DougiesGuide Website Messsage <noreply.dougiesguide@gmail.com>",
      to: "dougiesguide@gmail.com",
      subject: "Message Received From Website!",
      html: `<p style="font-size: 16px">From: ${name}</p><p style="font-size: 16px">Email: ${email}</p><p style="font-size: 16px">Phone Number: ${phone}</p><p style="font-size: 16px">Message: ${message}</p>`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        response.send(error);
      } else {
        response.send("Message Sent Succesfully");
      }
    });
  });
});

// NEW LISTING
exports.newListing = functions.firestore
  .document("listings/{listing}")
  .onCreate((snap, context) => {
    const addedBy = snap.data().addedBy;
    const listing = snap.data().title;

    const listingId = context.params.listing

    const mailOptions = {
      from: "New Listing <noreply.dougiesguide@gmail.com>",
      to: "dougiesguide@gmail.com",
      subject: "New Listing Added",
      html: `
                <p style="font-size: 20px">New Listing Added</p>
                <p style="font-size: 16px">Listing Title: ${listing}</p>
                <p style="font-size: 16px">Added By: ${addedBy}</p>
                <p style="font-size: 16px">Link: https://dougiesguide.com/listing/detailed?id=${listingId}</p>`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.log(error)
      } else {
        console.log('Message Sent')
      }
    });
  });


// NEW LISTING
exports.newUser = functions.firestore
    .document("users/{user}")
    .onCreate((snap, context) => {
        const fullName = snap.data().fullName;
        const mailOptions = {
            from: "New User <noreply.dougiesguide@gmail.com>",
            to: "dougiesguide@gmail.com",
            subject: "New User Added",
            html: `
                <p style="font-size: 20px">New User Added</p>
                <p style="font-size: 16px">Name: ${fullName}</p>
                <p style="font-size: 16px">Link: https://dougiesguide.com/admin</p>`,
        };

        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                console.log(error)
            } else {
                console.log('Message Sent')
            }
        });
    });
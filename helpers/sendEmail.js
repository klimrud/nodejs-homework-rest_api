// ===================== sendGrid =========================

// const sgMail = require("@sendgrid/mail");
// require("dotenv").config();


// const { SENDGRID_API_KEY } = process.env;

// sgMail.setApiKey(SENDGRID_API_KEY);

// const sendEmail = async (data) => {
//   const email = {...data, from: "klim.ta777@gmail.com"};
//   await sgMail.send(email);
//   return true;
// }

// // const email = {
// //   to: "mifohaj976@eimatro.com",
// //   from: "klim.ta777@gmail.com",
// //   subject: "Test email",
// //   html: "<p><strong> !Test email! </strong>from localhost:3000</p>",
// // };

// // sgMail
// //   .send(email)
// //   .then(() => console.log("Email send surcess"))
// //   .catch((error) => console.log("error", error.message));

// module.exports = sendEmail;
// ========================== ElasticEmail =========================================

// const ElasticEmail = require('@elasticemail/elasticemail-client');
// require("dotenv").config();

// const { ELASTICEMAIL_API_KEY } = process.env;

// const defaultClient = ElasticEmail.ApiClient.instance;
 
// const {apikey} = defaultClient.authentications;
// apikey.apiKey = ELASTICEMAIL_API_KEY;
 
// const api = new ElasticEmail.EmailsApi()
 
// const email = ElasticEmail.EmailMessageData.constructFromObject({
//   Recipients: [
//     new ElasticEmail.EmailRecipient("mifohaj976@eimatro.com")
//   ],
//   Content: {
//     Body: [
//       ElasticEmail.BodyPart.constructFromObject({
//         ContentType: "HTML",
//         Content: "<p>Verify your email</p>"
//       })
//     ],
//     Subject: "Verify your email",
//     From: "ktlimenko@gmail.com"
//   }
// });
 
// const callback = function(error, data, response) {
//   if (error) {
//     console.error(error);
//   } else {
//     console.log('API called successfully.');
//   }
// };
//    const sendEmail = api.emailsPost(email, callback);
// module.exports = sendEmail;



// ==================================================
const nodemailer = require("nodemailer");
require("dotenv").config();

const { UKR_NET_EMAIL, UKR_NET_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: UKR_NET_EMAIL,
    pass: UKR_NET_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
    const email = {...data, from: UKR_NET_EMAIL};
    await transport.sendMail(email);
    return true;
  }

// const email = {
//   to: "mifohaj976@eimatro.com",
//   from: UKR_NET_EMAIL,
//   subject: "Test email",
//   html: "<p><strong> !Test email! </strong>from localhost:3000</p>",
// };

// transport
//   .sendMail(email)
//   .then(() => console.log("Email send success"))
//   .catch((error) => console.log("error", error.message));

module.exports = sendEmail;
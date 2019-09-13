const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    type: "OAuth2",
    user: process.env.SJ_OAUTH_EMAIL,
    refreshToken: process.env.SJ_OAUTH_REFRESHTOKEN,
    accessToken: process.env.SJ_OAUTH_ACCESSTOKEN,
    clientId: process.env.SJ_OAUTH_CLIENTID,
    clientSecret: process.env.SJ_OAUTH_CLIENTSECRET
  }
});

const send = ({ email, name, text }) => {
  const from = name && email ? `${name} <${email}>` : `${name || email}`;
  const message = {
    from,
    to: "dean@paraform.co.uk",
    subject: `New message from ${from}`,
    text,
    replyTo: from
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(message, (error, info) =>
      error ? reject(error) : resolve(info)
    );
  });
};

module.exports = send;

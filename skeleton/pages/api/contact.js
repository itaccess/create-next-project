const mailer = require("../../app/mailer");

export default (req, res) => {
  const { email = "", name = "", message = "" } = req.body;
  mailer({ email, name, text: message }).then(() => {
    console.log('success')
    res.send('success')
  }).catch((error) => {
    console.log('failed', error)
    res.send('badddd')
  })
};
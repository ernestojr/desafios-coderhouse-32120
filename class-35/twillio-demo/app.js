const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require(twilio)(accountSid, authToken);

client.messages
  .create({ body: 'Hola curso de Coder House desde Twilio', from: process.env.TWILIO_PHONE_NUMBER, to: "+XXXXXXXXXXX" })
  .then(message => console.log(message.sid));
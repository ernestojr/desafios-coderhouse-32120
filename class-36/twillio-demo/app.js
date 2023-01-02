const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

const options = { 
  body: 'Hello! This is an editable text message. You are free to change it and write whatever you like.', 
  from: `whatsapp:+${process.env.TWILIO_PHONE_NUMBER}`,       
  to: `whatsapp:+${process.env.TWILIO_PHONE_NUMBER_TARGET}` 
}

client.messages
      .create(options)
      .then(message => console.log(message.sid));
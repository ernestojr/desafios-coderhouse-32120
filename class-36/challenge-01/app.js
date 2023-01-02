import minimist from 'minimist'
import twilio from 'twilio'

const opts = {
  alias: {
    t: 'target',
    m: 'message',
  }
}

const { target, message } = minimist(process.argv.slice(2), opts)

if (!message) {
  console.log('Error: The message is required!');
  process.exit(1)
}

if (!target) {
  console.log('Error: The target is required!');
  process.exit(1)
}

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

client.messages
  .create({ 
    body: message, 
    from: `whatsapp:+${process.env.TWILIO_PHONE_NUMBER}`,       
    to: `whatsapp:+${target}`, 
  })
  .then(message => console.log(message.sid))
  .catch(console.error)
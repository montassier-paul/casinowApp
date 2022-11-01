// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure


require('dotenv').config({ path: "../.env/" });



function SMSController(casinoName, game,numTel, jackpot) {

    
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);

    client.messages
        .create({
            body: `Le jackpot de ${game} à atteint ${jackpot} € dans votre établissement ${casinoName}`,
            from: '+19786226130',
            to: numTel
        })
        .then(message => console.log(message.sid));

}

module.exports = { SMSController };
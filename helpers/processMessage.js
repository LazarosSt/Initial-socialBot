const API_AI_TOKEN = '8aa553ef11ec461eba0849eb0eaa7641';
const apiAiClient = require('apiai')(API_AI_TOKEN);

const FACEBOOK_ACCESS_TOKEN = 'EAAa2SJBGtccBAHHDdbdiXY3ZC7bbgAeBtlH4ZAkCBpRXRDFrZCZARsWAebp9CDcfyUjN2vfZBPwtEZC6WR1G0eVidE8mENdSVGMQe235C6pIrBvNw6cWliwWan5aFedKS89Bl0mQ9r6GgZBLddiZAo8M9bf9tKhGjZATjKR6OjGiKAQZDZD';
const request = require('request');
const sendTextMessage = (senderId, text) => {
 request({
 url: 'https://graph.facebook.com/v2.6/me/messages',
 qs: { access_token: FACEBOOK_ACCESS_TOKEN },
 method: 'POST',
 json: {
 recipient: { id: senderId },
 message: { text },
 }
 });
};

module.exports = (event) => {
 const senderId = event.sender.id;
 const message = event.message.text;
const apiaiSession = apiAiClient.textRequest(message, {sessionId: 'crowdbotics_bot'});
apiaiSession.on('response', (response) => {
 const result = response.result.fulfillment.speech;
sendTextMessage(senderId, result);
 });
 
 apiaiSession.on('error', error => console.log(error));
 apiaiSession.end();
};
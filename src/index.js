require('dotenv').config();

const { client } = require('./core/twitch_client');
const { onNewChatMessageReceived, onConnected } = require('./events');

client.on('chat', onNewChatMessageReceived);
client.on('connected', onConnected);

client.connect();

require('dotenv').config();

const { client } = require('./core/twitch_client');
const { onNewChatMessageReceived } = require('./events/chat');

client.on('chat', onNewChatMessageReceived);

client.connect();

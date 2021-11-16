require('dotenv').config();

const { client } = require('./core/client');
const { onNewChatMessageReceived } = require('./events/chat');

client.on('chat', onNewChatMessageReceived);

client.connect();

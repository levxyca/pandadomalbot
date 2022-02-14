require('dotenv').config();

const { client } = require('./core/twitch_client');
const {
  onNewChatMessageReceived,
  onConnected,
  onSubGift,
} = require('./events');

client.on('chat', onNewChatMessageReceived);
client.on('connected', onConnected);
client.on('subgift', onSubGift);

client.connect();

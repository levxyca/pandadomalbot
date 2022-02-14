const { onConnected } = require('./connected');
const { onNewChatMessageReceived } = require('./chat');
const { onSubGift } = require('./subgift');

module.exports = {
  onConnected,
  onNewChatMessageReceived,
  onSubGift,
};

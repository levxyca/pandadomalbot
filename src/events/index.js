const { onConnected } = require('./connected');
const { onNewChatMessageReceived } = require('./chat');

module.exports = {
  onConnected,
  onNewChatMessageReceived,
};

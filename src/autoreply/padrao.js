let messages = [];

const REPLY_AFTER = 2; // Responder após quantas mensagens iguais.

function execute({ message }) {
  messages.push(message);
  if (messages.length === REPLY_AFTER && new Set(messages).size === 1) {
    messages = [];
    return message;
  }
  return null;
}

module.exports = {
  patterns: [/^(.*?)$/],
  execute,
};

let messages = [];

const REPLY_AFTER = 2; // Responder após quantas mensagens iguais.

function execute({ message }) {
  messages.push(message);

  if (messages.length === REPLY_AFTER) {
    if (new Set(messages).size === 1) {
      messages = [];
      return message;
    }
    messages.shift();
  }
  return null;
}

module.exports = {
  patterns: [/^(.*?)$/],
  execute,
};

const { commands } = require('../utilities/commands');

let messages = [];

const REPLY_AFTER = 2; // Responder após quantas mensagens iguais.
const commandsKeys = commands(true);

function execute({ message }) {
  if (commandsKeys.includes(message)) {
    // Ignora comandos.
    return null;
  }

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

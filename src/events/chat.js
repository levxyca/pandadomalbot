const { client } = require('../core/client');
const { walkCommands } = require('../utilities/walk-commands');

const regex = new RegExp(`^${process.env.PREFIX}([a-zA-Z0-9]+)(?:\\W+)?(.*)?`);
const commands = walkCommands();

function onNewChatMessageReceived(channel, context, message, self) {
  // Ignora mensagens do próprio bot.
  if (self) return;

  const command = message.match(regex);
  if (command) {
    const [, keyword, argument] = command;

    commands.forEach((item) => {
      if (item.keyword === keyword || item.aliases?.includes(keyword)) {
        switch (typeof item.execute) {
          case 'function':
            item.execute(argument, channel, context, message);
            break;
          case 'string':
            client.say(channel, item.execute);
            break;
          default:
            throw new Error('erro');
        }
      }
    });
  }
}

module.exports = { onNewChatMessageReceived };

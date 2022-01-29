const { client } = require('../core/twitch_client');
const { commands } = require('../utilities/commands');

const regex = new RegExp(`^${process.env.PREFIX}([a-zA-Z0-9]+)(?:\\W+)?(.*)?`);
const botCommands = commands();

function onNewChatMessageReceived(channel, context, message, self) {
  // Ignora mensagens do próprio bot.
  if (self) return;

  const command = message.match(regex);
  if (command) {
    const [, keyword, argument] = command;

    botCommands.forEach((item) => {
      if (item.keyword === keyword || item.aliases?.includes(keyword)) {
        switch (typeof item.execute) {
          case 'function':
            item.execute({
              argument,
              channel,
              context,
              message,
            });
            break;
          case 'string':
            client.say(channel, item.execute);
            break;
          default:
            throw new Error(
              `Falha ao executar o comando "${item.keyword}", verifique se o objeto contém o atributo 'execute' sendo uma função ou uma string.`,
            );
        }
      }
    });
  }
}

module.exports = { onNewChatMessageReceived };

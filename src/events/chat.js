const { client } = require('../core/twitch_client');
const { listJSFiles } = require('../utilities/bot-fs');
const { listCommands } = require('../utilities/commands');

const regex = new RegExp(
  `^${process.env.PREFIX}([a-zà-úA-ZÀ-Ú0-9]+)(?:\\W+)?(.*)?`,
);
const autoReply = listJSFiles('autoreply');
const commands = listCommands();

function handleBotCommand(channel, context, message) {
  const command = message.match(regex);
  if (command) {
    const [, keyword, argument] = command;

    commands.forEach((item) => {
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

function handleAutoReply(channel, context, message) {
  autoReply.forEach((item) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const pattern of item.patterns) {
      const matches = message.match(pattern);

      if (matches) {
        const result = item.execute({
          channel,
          context,
          message,
          matches,
        });
        if (result && typeof result === 'string') {
          client.say(channel, result);
        }
        break;
      }
    }
  });
}

function onNewChatMessageReceived(channel, context, message, self) {
  // Ignora mensagens do próprio bot.
  if (self) return;

  // Verifica se é um comando do bot, e, executa.
  handleBotCommand(channel, context, message);

  // Verifica se é uma resposta automática, e, executa.
  handleAutoReply(channel, context, message);
}

module.exports = { onNewChatMessageReceived };

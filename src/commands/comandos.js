const { client } = require('../core/client');
const { walkCommands } = require('../utilities/walk-commands');

/**
 * Obtém a listagem de comandos do bot.
 * @param {Boolean} includeAliases se deve ser incluído os aliases dos comandos.
 * @returns a lista de comandos disponíveis.
 */
const availableCommands = (includeAliases) => {
  const availableCommmands = walkCommands();
  // Para exibir os comandos ordenados alfabeticamente.
  availableCommmands.sort((a, b) => (a.keyword - b.keyword ? -1 : 1));

  const keys = availableCommmands.map((item) => {
    let command = `${process.env.PREFIX}${item.keyword}`;
    if (includeAliases && item.aliases?.length > 0) {
      command += `(${item.aliases?.join(',')})`;
    }
    return command;
  });

  return keys;
};

module.exports = {
  keyword: 'comandos',
  aliases: ['commands'],
  execute(args, channel) {
    const commands = availableCommands(args && args === 'alias');
    client.say(channel, `/me Comandos disponíveis: ${commands.join(', ')}.`);
  },
};

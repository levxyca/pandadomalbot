const { client } = require('../core/twitch_client');
const { commandsAsText } = require('../utilities/commands');

const execute = ({ argument, channel }) => {
  const commands = commandsAsText(argument && argument === 'alias');
  client.say(channel, `Comandos disponíveis: ${commands}.`);
};

module.exports = {
  keyword: 'comandos',
  aliases: ['commands'],
  execute,
};

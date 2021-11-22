const { client } = require('../core/client');
const { commands } = require('../utilities/commands');

const getCommandKeys = (alias) => {
  const keys = commands().map((item) => {
    let command = `${process.env.PREFIX}${item.keyword}`;
    if (alias && item.aliases?.length > 0) {
      command += `(${item.aliases?.join(',')})`;
    }
    return command;
  });

  return keys;
};

const execute = ({ argument, channel }) => {
  const keys = getCommandKeys(argument && argument === 'alias');
  client.say(channel, `Comandos disponíveis: ${keys.join(', ')}.`);
};

module.exports = {
  keyword: 'comandos',
  aliases: ['commands'],
  execute,
};

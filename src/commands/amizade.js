const { client } = require('../core/client');

const execute = (args, channel, context) => {
  if (!args) return;

  const friendship = Math.round(Math.random() * 99) + 1;

  client.say(
    channel,
    `/me ${context.username} tem ${friendship}% de amizade com ${args} PogChamp`,
  );
};

module.exports = {
  keyword: 'amizade',
  execute,
};

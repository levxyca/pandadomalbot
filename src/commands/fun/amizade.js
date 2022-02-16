const { client } = require('../../core/twitch_client');

const execute = ({ argument, channel, context }) => {
  if (!argument) {
    client.say(
      channel,
      `Mas amizade com quem mesmo, hein ${context.username}?`,
    );

    return;
  }

  const friendship = Math.round(Math.random() * 99) + 1;

  client.say(
    channel,
    `${context.username} tem ${friendship}% de amizade com ${argument} PogChamp`,
  );
};

module.exports = {
  keyword: 'amizade',
  execute,
};

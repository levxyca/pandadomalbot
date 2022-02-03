const { client } = require('../core/twitch_client');
const { people } = require('../queues/people');

module.exports = {
  keyword: 'pontos',
  execute: async ({ channel, context }) => {
    await people(context.username, async (person) => {
      const word = person.points === 1 ? 'ponto' : 'pontos';
      await client.say(
        channel,
        `${context.username}, você possui ${person.points} ${word}.`,
      );
    });
  },
};

const { client } = require('../core/twitch_client');
const { people } = require('../queues/people');

const COMMAND_KEY = 'first';
const points = Number(process.env.POINTS_FIRST);

module.exports = {
  keyword: COMMAND_KEY,
  execute: async ({ channel, context }) => {
    const users = await people();

    const first = users.find((user) =>
      user.haveUsedTheCommandToday(COMMAND_KEY),
    );
    if (first) {
      let message;
      if (first.name === context.username) {
        message = `@${context.username}, você foi a pessoa first de hoje.`;
      } else {
        message = `@${context.username}, infelizmente você não foi a pessoa first de hoje. ${first.name} foi a pessoa first.`;
      }

      await client.say(channel, message);
      await people(context.username, (person) => {
        person.incrementCommandUsage(COMMAND_KEY);
        return person;
      });
    } else {
      await people(context.username, (person) => {
        person.incrementCommandUsage(COMMAND_KEY);
        person.setLastCommandUsageForToday(COMMAND_KEY);
        person.points += points;
        return person;
      });
      await client.say(
        channel,
        `@${context.username}, você foi a pessoa first da livexyca de hoje levxycAnimada Por isso, irei lhe presentear com ${points} pontos.`,
      );
    }
  },
};

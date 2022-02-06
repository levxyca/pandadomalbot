const { client } = require('../../core/twitch_client');
const { jail } = require('../../queues/jail');

module.exports = {
  keyword: 'proteger',
  async execute({ channel, context }) {
    if ('broadcaster' in context.badges) {
      await jail(async (j) => {
        const username = await j.protect();
        if (username) {
          await client.say(
            channel,
            `${username} agora está sob minha proteção!`,
          );
        }
      });
    }
  },
};

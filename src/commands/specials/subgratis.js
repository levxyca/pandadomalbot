const { client } = require('../../core/client');

const USERNAME = 'nesclimn10';

module.exports = {
  keyword: 'subgratis',
  async execute({ context, channel }) {
    if (context.username.toLowerCase() === USERNAME) {
      await client.say(channel, `Dê um sub grátis pro ${USERNAME}.`);
      await client.timeout(channel, USERNAME, 20000);
    }
  },
};

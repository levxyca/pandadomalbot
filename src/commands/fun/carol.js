const { client } = require('../../core/twitch_client');

const REPEAT_AMOUNT = 30;
const REPEAT_CONTENT = 'carol';

module.exports = {
  keyword: 'carol',

  async execute({ channel }) {
    const answer = Array(REPEAT_AMOUNT).fill(REPEAT_CONTENT).join(' ');

    await client.say(channel, `/me ${answer}`);
  },
};

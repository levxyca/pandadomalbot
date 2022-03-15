const { counters } = require('../../queues/counters');
const { client } = require('../../core/twitch_client');

const keyword = 'calma';

module.exports = {
  keyword,
  async execute({ channel }) {
    await counters(async (counter) => {
      counter.increment(keyword);
      await client.say(channel, counter.text(keyword));
    });
  },
};

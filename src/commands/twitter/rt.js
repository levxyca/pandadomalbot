const { client } = require('../../core/client');
const { getTodaysLiveAnnouncement } = require('./_client');
const { tweetURL, tweetMetrics } = require('./_formatter');

module.exports = {
  keyword: 'rt',
  execute: async (_, channel) => {
    const tweet = await getTodaysLiveAnnouncement();
    if (tweet) {
      const url = tweetURL(tweet.id);
      const metrics = tweetMetrics(tweet);
      client.say(
        channel,
        `Dá um RT aí por favorzinho levxycAnimada ${url} (${metrics})`,
      );
    } else {
      client.say(
        channel,
        'Não encontrei nenhum tweet relacionado a live de hoje.',
      );
    }
  },
};

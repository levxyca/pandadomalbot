const { client } = require('../core/client');
const { getTodaysLiveAnnouncement } = require('../utilities/twitter/api');
const { format } = require('../utilities/twitter/formatter');

module.exports = {
  keyword: 'rt',
  execute: async ({ channel }) => {
    const tweet = await getTodaysLiveAnnouncement();
    if (tweet) {
      const url = format.tweetURL(tweet.id);
      const metrics = format.tweetMetrics(tweet);
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

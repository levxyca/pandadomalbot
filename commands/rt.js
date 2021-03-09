const {
  getTodaysLiveAnnouncement,
  mountTweetUrl,
  formatTweetMetrics,
} = require('../utils/twitter');

exports.default = async (client, target, _, message) => {
  if (message.trim() === '!rt') {
    const tweet = await getTodaysLiveAnnouncement();
    const metrics = formatTweetMetrics(tweet);
    const url = mountTweetUrl(tweet.id);

    client.say(
      target,
      `/me ${metrics}Dá um RT aí por favorzinho levxycAnimada ${url}`,
    );
  }
};

const {
  getTodaysLiveAnnouncement,
  mountTweetUrl,
  formatTweetMetrics,
} = require('../utils/twitter');

exports.default = async (client, target, _, message) => {
  if (message.trim() === '!rt') {
    const tweet = await getTodaysLiveAnnouncement();
    if (tweet) {
      const metrics = formatTweetMetrics(tweet);
      const url = mountTweetUrl(tweet.id);

      client.say(
        target,
        `/me ${metrics}Dá um RT aí por favorzinho levxycAnimada ${url}`,
      );
    } else {
      client.say(
        target,
        '/me Não encontrei nenhum tweet relacionado a live hoje.',
      );
    }
  }
};

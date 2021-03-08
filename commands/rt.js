const {
  getTodaysLiveAnnouncement,
  mountTweetUrl,
} = require('../utils/twitter');

exports.default = async (client, target, _, message) => {
  if (message.trim() === '!rt') {
    const tweet = await getTodaysLiveAnnouncement();

    client.say(
      target,
      `Dá um RT aí por favorzinho levxycAnimada ${mountTweetUrl(tweet.id)}`,
    );
  }
};

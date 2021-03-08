const {
  getTodaysLiveAnnouncement,
  mountTweetUrl,
} = require('../utils/twitter');

exports.default = async (client, target, _, message) => {
  if (message.trim() === '!rt') {
    const tweet = await getTodaysLiveAnnouncement();

    let retweetMessage = '';
    if (tweet.public_metrics.retweet_count > 0) {
      retweetMessage += `🔁 ${tweet.public_metrics.retweet_count}. `;
    }
    if (tweet.public_metrics.like_count > 0) {
      retweetMessage += `❤️ ${tweet.public_metrics.like_count}. `;
    }

    retweetMessage += `Dá um RT aí por favorzinho levxycAnimada ${mountTweetUrl(
      tweet.id,
    )}`;

    client.say(target, retweetMessage);
  }
};

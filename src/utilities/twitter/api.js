const { client } = require('../../core/twitter_client');
const { isToday } = require('../date-time');

const QUERY = `from:${process.env.TW_USERNAME} -is:retweet -is:reply has:links`;

async function getTodaysLiveAnnouncement() {
  const params = {
    query: QUERY,
    max_results: 25,
    'tweet.fields': 'created_at,public_metrics,entities',
  };

  const { data } = await client.get('tweets/search/recent', params);

  if (!data) {
    throw new Error('Falha ao obter os últimos tweets.');
  }

  const tweets = data.filter((tweet) => {
    const tweetWithTwitchURLs = tweet.entities?.urls?.find((url) => {
      return url.expanded_url === `https://twitch.tv/levxyca`;
    });
    return (
      isToday(tweet.created_at) &&
      tweet.text.match(process.env.TW_TWEET_ANNOUNCE_REGEX) &&
      tweetWithTwitchURLs
    );
  });
  return tweets.length > 0 ? tweets[0] : undefined;
}

module.exports = {
  getTodaysLiveAnnouncement,
};

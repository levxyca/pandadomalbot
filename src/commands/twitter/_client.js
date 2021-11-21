const Twitter = require('twitter-v2');
const { isToday } = require('../../utilities/date-time');

const client = new Twitter({
  consumer_key: process.env.TW_CONSUMER_KEY,
  consumer_secret: process.env.TW_CONSUMER_SECRET,
  access_token_key: process.env.TW_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TW_ACCESS_TOKEN_SECRET,
});

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

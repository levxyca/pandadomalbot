const Twitter = require('twitter-v2');
const { isToday } = require('./datetime');

const client = new Twitter({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

/**
 * Obtém os últimos Tweets.
 *
 * @param limit quantidade de tweets para retornar.
 *
 * @returns {Object} retorna um objeto contendo as informações dos últimos tweets.
 * Por exemplo:
 * ```
 * [
 *    {
 *      "created_at":"2021-03-08T19:34:03.000Z",
 *      "id":"1369008532201349123",
 *      "text":"..."
 *    },
 *    {
 *      "created_at":"2021-03-08T19:34:03.000Z",
 *      "id":"1369008532201349123",
 *      "text":"..."
 *    },
 *    // ...
 * ]
 *
 * ```
 */
const getLatestTweets = async (limit = 20) => {
  const { data } = await client.get('tweets/search/recent', {
    query: `from:${process.env.TWITTER_USERNAME} -is:retweet`,
    'tweet.fields': 'created_at,public_metrics,entities',
    max_results: limit,
  });

  if (!data) {
    throw new Error('Falha ao obter os últimos tweets.');
  }

  return data;
};

/**
 * Obtém o tweet diário de anúncio da live.
 */
const getTodaysLiveAnnouncement = async () => {
  const hasLookupUrl = (urls) =>
    urls.filter((url) => {
      return url.display_url.includes(process.env.RETWEET_URL_LOOKUP);
    });

  const hasLookupText = (text) =>
    text.toLowerCase().includes(process.env.RETWEET_TEXT_LOOKUP);

  const tweets = await getLatestTweets();
  const todayTweets = tweets.filter((tweet) => {
    return (
      isToday(tweet.created_at) &&
      hasLookupText(tweet.text) &&
      hasLookupUrl(tweet.entities?.urls)
    );
  });
  return todayTweets[0] ?? undefined;
};

/**
 * Obtém a url de um tweet.
 * @param {String|Number} id identificador do tweet.
 * @returns {String} a url do tweet.
 */
const mountTweetUrl = (id) => {
  return `https://twitter.com/${process.env.TWITTER_USERNAME}/status/${id}`;
};

/**
 * Formata as métricas do tweet.
 * @param {Object} tweet informações do tweet.
 * @returns {String} a contagem de retweets/likes como texto. Ex:
 * 🔁 10. -> Quando a quantidade de retweets for maior que 0.
 * ❤️ 10. -> Quando a quantidade de likes for maior que 0.
 * 🔁 10. 15 ❤️. -> Quando a quantidade de retweets e likes forem maior que 0.
 *
 */
const formatTweetMetrics = (tweet) => {
  let message = '';
  if (tweet.public_metrics.retweet_count > 0) {
    message += `🔁 ${tweet.public_metrics.retweet_count}. `;
  }
  if (tweet.public_metrics.like_count > 0) {
    message += `❤️ ${tweet.public_metrics.like_count}. `;
  }
  return message;
};

module.exports = {
  mountTweetUrl,
  getLatestTweets,
  getTodaysLiveAnnouncement,
  formatTweetMetrics,
};

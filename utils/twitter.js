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
    query: `from:${process.env.TWITTER_USERNAME}`,
    'tweet.fields': 'created_at,public_metrics,entities',
    max_results: limit,
  });

  if (!data) {
    throw new Error('Falha ao obter os últimos tweets.');
  }

  /**
   * Exclui os retweets.
   * Por algum motivo a lib usada está retornando UNAUTHORIZED quando tenta-se
   * filtrar os retweets na query. TODO: futuramente, trocar a query de:
   * "from:levxyca" (excluindo os retweets manualmente) para "from:levxyca -is:retweet"
   * e retornando o "data" diretamente.
   *
   * https://developer.twitter.com/en/docs/twitter-api/tweets/search/integrate/build-a-query
   */
  return data.filter((item) => !item.text.startsWith('RT'));
};

/**
 * Obtém o tweet diário de anúncio da live.
 *
 * @returns {Object} os dados do tweet. Ex:
 * ```
 * {
 *    entities: { urls: [ [Object], [Object] ], mentions: [ [Object] ] },
 *    text: 'live ONNN 🌟\n' +
 *      '\n' +
 *      'YAAAY! Ás segundas nós estudamos Javascript 💻 Avisando também que hoje teremos SORTEIO de um ebook da @casadocodigo !!!\n' +
 *      '\n' +
 *      'Caso não possa assistir a live, deixa ela aberta e abaixa o volume no navegador pra ajudar, é o famoso lurk!\n' +
 *      '\n' +
 *      'Link: https://t.co/vYnX9G1Yuy https://t.co/PQ3M3UaYdm',
 *    id: '1368962227261292551',
 *    public_metrics: { retweet_count: 14, reply_count: 0, like_count: 18, quote_count: 0 },
 *    created_at: '2021-03-08T16:30:03.000Z'
 * }
 * ```
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

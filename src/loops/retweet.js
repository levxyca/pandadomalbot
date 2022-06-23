const { client } = require('../core/twitch_client');
const { isTwitterEnabled } = require('../core/twitter_client');
const { getTodaysLiveAnnouncement } = require('../utilities/twitter/api');
const { format } = require('../utilities/twitter/formatter');

module.exports = {
  interval: 600000, // 10min
  async execute() {
    if (!isTwitterEnabled()) {
      console.info(`
        Configuração incorreta dos tokens do Twitter.
        Ignorando mensagem solicitando o retweet da live.
      `);
      return;
    }

    const tweet = await getTodaysLiveAnnouncement();
    if (tweet) {
      const url = format.tweetURL(tweet.id);
      const metrics = format.tweetMetrics(tweet);
      await client.say(
        process.env.CHANNEL,
        `/announce Dá um RT aí por favorzinho levxycAnimada ${url} (${metrics})`,
      );
    } else {
      console.info(
        'Não foi encontrado nenhum tweet relacionado a live de hoje.',
      );
    }
  },
};

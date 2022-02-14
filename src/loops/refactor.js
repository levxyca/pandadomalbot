const { client } = require('../core/twitch_client');

module.exports = {
  interval: 300000,
  execute() {
    client.say(
      process.env.CHANNEL,
      `Estou passando por um processo de refatoração, então tenha paciência comigo 🐼 e se perceber algum bug, reporte a minha dona @levxyca`,
    );
  },
};

const { client } = require('../core/twitch_client');
const { jail } = require('../queues/jail');

module.exports = {
  interval: 600000, // 10min
  async execute() {
    await jail(async (j) => {
      const username = await j.arrest();
      if (username) {
        client.say(process.env.CHANNEL, `Ei ${username}, você está preso! 🐼`);
      }
    });
  },
};

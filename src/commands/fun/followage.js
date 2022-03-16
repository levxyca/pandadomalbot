/* eslint-disable camelcase */
const api = require('../../core/twitch_api');
const { client } = require('../../core/twitch_client');
const { fromNow, dateToString } = require('../../utilities/date-time');

module.exports = {
  keyword: 'followage',
  execute: async ({ context, channel }) => {
    if (api.me === null) {
      await api.fetchCurrentUser();
    }

    const follow = await api.follow(context['user-id'], api.me.id);

    let message;

    if (follow) {
      const { from_login, to_login, followed_at } = follow;
      const date = new Date(followed_at);

      message = `${from_login} está seguindo ${to_login} desde ${dateToString(
        date,
      )}, ${fromNow(date)}.`;
    } else {
      message = `${context.username} não está seguindo ${process.env.CHANNEL}.`;
    }

    await client.say(channel, message);
  },
};

/* eslint-disable camelcase */
const api = require('../../core/twitch_api');
const { client } = require('../../core/twitch_client');
const { diff } = require('../../utilities/date-time');

function format(years, months, days) {
  const parts = [];
  if (years && years > 0) {
    parts.push(`${years} ano${years === 1 ? '' : 's'}`);
  }
  if (months && months > 0) {
    parts.push(`${months} mese${months === 1 ? '' : 's'}`);
  }
  if (days && days > 0) {
    parts.push(`${days} dia${days === 1 ? '' : 's'}`);
  }

  if (parts.length === 1) {
    return parts[0];
  }

  const spllited = parts.splice(0, parts.length - 1);
  return `${spllited.join(', ')} e ${parts[parts.length - 1]}`;
}

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
      const { years, months, days } = diff(new Date(followed_at));
      const duration = format(years, months, days);

      message = `${from_login} está seguindo ${to_login} há ${duration}.`;
    } else {
      message = `${context.username} não está seguindo ${process.env.CHANNEL}.`;
    }

    await client.say(channel, message);
  },
};

const intervalToDuration = require('date-fns/intervalToDuration');
const axios = require('axios');

exports.default = (client, target, context, message) => {
  if (message.split(' ')[0] === '!followage') {
    const userID = context['user-id'];

    axios
      .get(
        `https://api.twitch.tv/kraken/users/${userID}/follows/channels/${process.env.CHANNEL_ID}`,
        {
          headers: {
            Accept: 'application/vnd.twitchtv.v5+json',
            'Client-ID': process.env.CLIENT_ID,
          },
        },
      )
      .then((response) => {
        const dateFollow = new Date(response.data.created_at);
        const dateNow = new Date();

        const diffDate = intervalToDuration({
          start: dateFollow,
          end: dateNow,
        });

        let messageFollowage = '';

        if (diffDate.years > 0) {
          messageFollowage += `${diffDate.years} ${
            diffDate.years === 1 ? 'ano' : 'anos'
          } `;
        }

        if (diffDate.months > 0) {
          messageFollowage += `${diffDate.months} ${
            diffDate.months === 1 ? 'mês' : 'meses'
          } `;
        }

        if (diffDate.days > 0) {
          messageFollowage += `${diffDate.days} ${
            diffDate.days === 1 ? 'dia' : 'dias'
          } `;
        }

        if (diffDate.hours > 0) {
          messageFollowage += `${diffDate.hours} ${
            diffDate.hours === 1 ? 'hora' : 'horas'
          } `;
        }

        if (
          diffDate.years === 0 &&
          diffDate.months === 0 &&
          diffDate.days === 0 &&
          diffDate.hours === 0
        ) {
          if (diffDate.minutes > 0) {
            messageFollowage += `${diffDate.minutes} ${
              diffDate.minutes === 1 ? 'minuto' : 'minutos'
            } `;
          }

          if (diffDate.seconds > 0) {
            messageFollowage += `${diffDate.seconds} ${
              diffDate.seconds === 1 ? 'segundo' : 'segundos'
            } `;
          }
        }

        client.say(
          target,
          `@${context.username} está há ${messageFollowage}seguindo esse canal!`,
        );
      })
      .catch(() => {});
  }
};

const { CHANNEL_NAME } = process.env;
const axios = require('axios');
const { readDataJSON, writeDataJSON } = require('../../../utils/data');

exports.default = (client, target, context, message, ehBot) => {
  const { username } = context;
  const estoque = readDataJSON('estoque-carinhos');

  if (ehBot) {
    return; // se for mensagens do nosso bot ele não faz nada
  }

  if (message.split(' ')[0].toLowerCase() === '!addcarinho') {
    if (username.toLowerCase() !== CHANNEL_NAME) {
      client.say(
        target,
        '/me Você não tem permissão para dar carinhos adicionais.',
      );
      return;
    }

    const user = message.split(' ')[1].toLowerCase().replace('@', '');
    let qtdCarinhos = message.split(' ')[2];

    // eslint-disable-next-line no-restricted-globals
    if (isNaN(qtdCarinhos)) {
      client.say(
        target,
        '/me Quantidade de carinho(s) invalidos. Adicione apenas números.',
      );
      return;
    }

    qtdCarinhos = parseInt(qtdCarinhos, 10);

    if (user.toLowerCase() === 'all') {
      axios
        .get(`https://tmi.twitch.tv/group/user/${CHANNEL_NAME}/chatters`)
        .then((response) => {
          const vips = [...response.data.chatters.vips];
          const mods = [...response.data.chatters.moderators];
          const viewers = [...response.data.chatters.viewers];
          const users = vips.concat(mods, viewers);

          // eslint-disable-next-line no-shadow
          users.forEach((user) => {
            if (estoque[user]) {
              estoque.users[user] += qtdCarinhos;
            } else {
              estoque.users[user] = qtdCarinhos;
            }

            writeDataJSON('estoque-carinhos', estoque);
          });
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          client.say(target, '/me, Erro ao adicionar carinho(s).');
        });

      client.say(
        target,
        `/me Adicionado ${qtdCarinhos} carinho(s) para todas as pessoas do chat.`,
      );
    } else {
      if (estoque.users[user]) {
        estoque.users[user] += qtdCarinhos;
      } else {
        estoque.users[user] = qtdCarinhos;
      }

      client.say(
        target,
        `/me Adicionado ${qtdCarinhos} carinho(s) para ${user} BloodTrail`,
      );

      writeDataJSON('estoque-carinhos', estoque);
    }
  }
};

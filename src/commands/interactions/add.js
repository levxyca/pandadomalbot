const { CHANNEL_NAME } = process.env;
const axios = require('axios');
const { readDataJSON, writeDataJSON } = require('../../utils/data');

exports.default = (client, target, context, message, ehBot) => {
  const { username } = context;
  const estoqueCarinho = readDataJSON('estoque-carinhos');
  const estoqueIrritar = readDataJSON('estoque-irritar');

  if (ehBot) {
    return; // se for mensagens do nosso bot ele não faz nada
  }

  if (message.split(' ')[0].toLowerCase() === '!add') {
    if (username.toLowerCase() !== CHANNEL_NAME) {
      client.say(
        target,
        '/me Você não tem permissão para dar carinho(s) e irritar(s) adicionais.',
      );
      return;
    }

    const user = message.split(' ')[1].toLowerCase().replace('@', '');
    let qtd = message.split(' ')[2];

    if (isNaN(qtd)) {
      client.say(
        target,
        '/me Quantidade de carinho(s) e irritar(s) inválidos. Adicione apenas números.',
      );
      return;
    }

    qtd = parseInt(qtd, 10);

    if (user.toLowerCase() === 'all') {
      axios
        .get(`https://tmi.twitch.tv/group/user/${CHANNEL_NAME}/chatters`)
        .then((response) => {
          const vips = [...response.data.chatters.vips];
          const mods = [...response.data.chatters.moderators];
          const viewers = [...response.data.chatters.viewers];
          const users = vips.concat(mods, viewers);

          users.forEach((user) => {
            if (estoqueCarinho[user]) {
              estoqueCarinho.users[user] += qtd;
            } else {
              estoqueCarinho.users[user] = qtd;
            }

            writeDataJSON('estoque-carinhos', estoqueCarinho);

            if (estoqueIrritar[user]) {
              estoqueIrritar.users[user] += qtd;
            } else {
              estoqueIrritar.users[user] = qtd;
            }

            writeDataJSON('estoque-irritar', estoqueIrritar);
          });
        })
        .catch((error) => {
          client.say(target, '/me, Erro ao adicionar carinho(s) e irritar(s).');
        });

      client.say(
        target,
        `/me Adicionado ${qtd} carinho(s) e irritar(s) para todas as pessoas do chat.`,
      );
    } else {
      if (estoqueCarinho.users[user]) {
        estoqueCarinho.users[user] += qtd;
      } else {
        estoqueCarinho.users[user] = qtd;
      }

      writeDataJSON('estoque-carinhos', estoqueCarinho);

      if (estoqueIrritar.users[user]) {
        estoqueIrritar.users[user] += qtd;
      } else {
        estoqueIrritar.users[user] = qtd;
      }

      writeDataJSON('estoque-irritar', estoqueIrritar);

      client.say(
        target,
        `/me Adicionado ${qtd} carinho(s) e irritar(s) para ${user} BloodTrail`,
      );
    }
  }
};

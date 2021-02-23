/* eslint-disable radix */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-shadow */
/* eslint-disable prefer-const */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

const { Client } = require('tmi.js');
require('dotenv').config();
const { readdirSync } = require('fs');
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.static('public'));
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const timer = require('./timers');

const porta = 5050;

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

const { lerRT, salvaRT } = require('./utils');
const { protectSubscriber } = require('./commands/jail/actions');
const { readDataJSON, writeDataJSON } = require('./utils/data');
const { chatters } = require('./utils/twitch');

const { BOT_USERNAME, CHANNEL_NAME, OAUTH_TOKEN } = process.env;

const opts = {
  identity: {
    username: BOT_USERNAME,
    password: OAUTH_TOKEN,
  },
  channels: [CHANNEL_NAME],
};

const client = new Client(opts);

const dados = readDataJSON('dados');
const pontos = readDataJSON('pontos');
const carteira = readDataJSON('carteira');
const loja = readDataJSON('lojinha');
const piadas = readDataJSON('piadas');
const ensinamentos = readDataJSON('ensinamentos');
const geradorNarios = readDataJSON('gerador-de-narios');
const geradorLevs = readDataJSON('gerador-de-levs');

const sabores = [
  'Shacolate',
  'Leite Compensado',
  'Frocus',
  'Napolialma',
  'Trushado',
  'Motankum',
  'Vambruesha',
];

// Contadores
let msgRt;

function compraPicole(message, username) {
  if (!loja[username]) {
    loja[username] = {
      Shacolate: 0,
      'Leite Compensado': 0,
      Frocus: 0,
      Napolialma: 0,
      Trushado: 0,
      Motankum: 0,
      Vambruesha: 0,
    };
  }
  let sabor = message.split(' ')[1];

  if (sabor) {
    sabor = sabor[0].toUpperCase() + sabor.substr(1);
  }

  if (message.toLowerCase().includes('leite compensado')) {
    sabor = 'Leite Compensado';
  } else if (!sabores.includes(sabor)) {
    sabor = sabores[Math.floor(Math.random() * sabores.length)];
  }

  loja[username][sabor] += 1;

  carteira[username] -= 50;

  writeDataJSON('lojinha', loja);
  writeDataJSON('carteira', carteira);

  return sabor;
}

function verRanking(username) {
  let indexUser = null;
  let msg = 'O ranking atual é ';

  const ranking = Object.entries(
    Object.fromEntries(Object.entries(pontos).sort(([, a], [, b]) => b - a)),
  );

  ranking.forEach((user, index) => {
    if (user[0] === username) {
      indexUser = index;
    }
  });

  let counter = ranking.length < 3 ? ranking.length : 3;

  for (let i = 0; i < counter; i += 1) {
    const user = ranking[i];

    msg += `${i + 1}º ${user[0]} com ${user[1]} pontos. `;
  }

  if (indexUser != null) {
    msg += `${username} está ${indexUser + 1}º com ${
      ranking[indexUser][1]
    } pontos`;
  } else {
    msg += `${username} não possui pontos :(`;
  }

  return msg;
}

function verGeladeira(message, username) {
  let user = message.split(' ')[1];
  let msg = '';

  if (user) {
    user = user.replace('@', '');
    user = user.toLowerCase();
  } else {
    user = username;
  }

  if (loja[user]) {
    Object.keys(loja[user]).forEach((property) => {
      if (loja[user][property] > 0) {
        msg += `${loja[user][property]} ${property} `;
      }
    });

    msg = `${user} possui ${msg}na geladeira 🔎`;
  } else {
    msg = `${user} está com a geladeira vazia :(`;
  }

  return msg;
}

protectSubscriber();

readdirSync(`${__dirname}/commands`)
  .filter((file) => file.slice(-3) === '.js')
  .forEach((file) => {
    client.on('message', (target, context, message, isBot) => {
      if (isBot) return;

      require(`./commands/${file}`).default(
        client,
        target,
        context,
        message,
        dados,
      );
    });
  });

client.on('message', (target, context, message, isBot) => {
  if (isBot) return;
  require('./commands/jail').default(client, target, context, message);
});

// intercepta mensagem do chat
function mensagemChegou(target, context, message, ehBot) {
  if (ehBot) {
    return; // se for mensagens do nosso bot ele não faz nada
  }

  let { username } = context;

  if (message.split(' ')[0] === '!rank') {
    let user = message.split(' ')[1];

    if (user) {
      user = user.replace('@', '');
      user = user.toLowerCase();

      username = user;
    }

    const msg = verRanking(username);

    client.say(target, msg);
  } else if (message.split(' ')[0] === '!comprar') {
    if (carteira[username] >= 50) {
      const sabor = compraPicole(message, username);

      client.say(
        target,
        `/me ${username} saindo um picole/sorvete de ${sabor} geladinho para você! 🍦`,
      );
    } else {
      client.say(
        target,
        `/me ${username} você não tem pandacoins🐼 suficientes, quem sabe da proxima vez!?`,
      );
    }
  } else if (message.split(' ')[0] === '!geladeira') {
    const msg = verGeladeira(message, username);

    client.say(target, msg);
  } else if (message.split(' ')[0] === '!pontos') {
    let msg = '';
    let user = message.split(' ')[1];

    if (user) {
      user = user.replace('@', '');
      user = user.toLowerCase();

      if (pontos[user]) {
        msg = `/me ${user} possui ${pontos[user]} pontos.`;
      } else {
        msg = `/me ${user} possui 0 pontos`;
      }
    } else if (pontos[username]) {
      msg = `/me ${username} você possui ${pontos[username]} pontos.`;
    } else {
      msg = `/me Poxa, ${username}! Você ainda não possui pontos.`;
    }

    client.say(target, msg);
  } else if (message.split(' ')[0] === '!carteira') {
    let msg = '';
    let user = message.split(' ')[1];

    if (user) {
      user = user.replace('@', '');
      user = user.toLowerCase();

      if (carteira[user]) {
        msg = `/me ${user} possui ${carteira[user]} pandacoins🐼.`;
      } else {
        msg = `/me ${user} possui 0 panda coins`;
      }
    } else if (carteira[username]) {
      msg = `/me ${username} você possui ${carteira[username]} pandacoins🐼.`;
    } else {
      msg = `/me Poxa, ${username}! Você ainda não possui pandacoins🐼.`;
    }

    client.say(target, msg);
  } else if (message.split(' ')[0].toLowerCase() === '!addpoints') {
    if (username.toLowerCase() !== CHANNEL_NAME) {
      client.say(target, '/me Você não tem permissão para adicionar pontos');
      return;
    }

    let user = message.split(' ')[1].replace("@", "");
    let qtdPontos = message.split(' ')[2];

    if (isNaN(qtdPontos)) {
      client.say(
        target,
        '/me Valor de pontos invalidos. Adicione apenas números',
      );
      return;
    }

    qtdPontos = parseInt(qtdPontos);

    if (user.toLowerCase() === 'all') {
      axios
        .get(`https://tmi.twitch.tv/group/user/${CHANNEL_NAME}/chatters`)
        .then((response) => {
          let vips = [...response.data.chatters.vips];
          let mods = [...response.data.chatters.moderators];
          let viewers = [...response.data.chatters.viewers];
          let users = vips.concat(mods, viewers);

          users.forEach((user) => {
            if (pontos[user]) {
              pontos[user] += qtdPontos;
            } else {
              pontos[user] = qtdPontos;
            }

            writeDataJSON('pontos', pontos);

            if (carteira[user]) {
              carteira[user] += qtdPontos;
            } else {
              carteira[user] = qtdPontos;
            }

            writeDataJSON('carteira', carteira);
          });
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          client.say(target, '/me, Erro ao adicionar pontos.');
        });
    } else {
      if (pontos[user]) {
        pontos[user] += qtdPontos;
      } else {
        pontos[user] = qtdPontos;
      }

      writeDataJSON('pontos', pontos);

      if (carteira[user]) {
        carteira[user] += qtdPontos;
      } else {
        carteira[user] = qtdPontos;
      }

      writeDataJSON('carteira', carteira);
    }
  } else if (
    message.split(' ')[0] === '!addrt' &&
    (context.mod || CHANNEL_NAME)
  ) {
    const msg = message.replace('!addrt', '');

    salvaRT(msg);
  }
  if (message.split(' ')[0] === '!piada') {
    let piada = piadas[Math.floor(Math.random() * piadas.length)];
    client.say(
      target,

      `/me ${piada.pergunta}`,
    );
    setTimeout(() => {
      client.say(
        target,

        `/me ${piada.resposta}`,
      );
    }, 3000);
  }
  if (message.split(' ')[0] === '!ensinamento') {
    let ensinamento =
      ensinamentos[Math.floor(Math.random() * ensinamentos.length)];

    client.say(
      target,

      `/me ${ensinamento.ensinamento}`,
    );
  }

  if (message.split(' ')[0] === '!nario') {
    let geradorNario =
      geradorNarios[Math.floor(Math.random() * geradorNarios.length)];

    client.say(
      target,

      `/me Gerando uma variação de Nario especial para você @${username}... Bip... Bop... Aqui está, o seu Nario especial é: ${geradorNario.codnario}`,
    );
  }

  if (message.split(' ')[0] === '!lev') {
    let geradorLev =
      geradorLevs[Math.floor(Math.random() * geradorLevs.length)];

    client.say(
      target,

      `/me Saindo do forninho uma variação de levxyca especialmente para você @${username}... trililililim... A sua levxyca especial é: ${geradorLev.cod}`,
    );
  }

  switch (message) {
    case '!carinho':
      // eslint-disable-next-line no-case-declarations
      let perfect = Math.random();

      if (perfect >= 0.999) {
        let points = [300];
        points = points[Math.floor(Math.random() * points.length)];

        client.say(
          target,
          `/me ${username} está fazendo o melhor carinho que eu já recebi! nhawwww Obrigada por sua gentileza, eu estou muito feliz agora graças a você e por isso vou te dar ${points} pandacoins🐼.`,
        );

        if (carteira[username]) {
          carteira[username] += points;
        } else {
          carteira[username] = points;
        }

        writeDataJSON('carteira', carteira);

        if (pontos[username]) {
          pontos[username] += points;
        } else {
          pontos[username] = points;
        }

        writeDataJSON('pontos', pontos);
      } else {
        client.say(
          target,
          `/me Obrigado pelo seu carinho ${username}! 🐼 Apesar de não ser o carinho perfeito foi um carinho muito bom! Seu nível de carinho foi: ${(
            perfect * 100
          ).toFixed(2)}%!`,
        );
      }
      break;
    case '!rt':
      msgRt = lerRT();
      client.say(target, `/me ${msgRt}`);
      break;
    default:
      break;
  }
}

async function darPontos() {
  const { vips, moderators, viewers, broadcaster } = await chatters();
  const total = [...vips, ...moderators, ...viewers, ...broadcaster];

  total.forEach((user) => {
    if (carteira[user]) {
      carteira[user] += 5;
    } else {
      carteira[user] = 5;
    }

    writeDataJSON('carteira', carteira);

    if (pontos[user]) {
      pontos[user] += 5;
    } else {
      pontos[user] = 5;
    }

    writeDataJSON('pontos', pontos);
  });
}

io.on('connection', (socket) => {
  // eslint-disable-next-line no-console
  console.log('Conectou com overlay');

  client.on('message', (target, context, message, ehBot) => {
    if (ehBot) return;

    if (message === '!alimentar') {
      socket.broadcast.emit('alimentar', true);
    }

    if (message === '!loira') {
      socket.broadcast.emit('loira', true);
    }
  });
});

client.on('connected', (host, port) => {
  // eslint-disable-next-line no-console
  console.log(`* Bot entrou no endereço ${host}:${port}`);
  setTimeout(() => {
    client.say(CHANNEL_NAME, 'Estou de olho em vocês.');
  }, 1500);
  setInterval(async () => {
    await darPontos();
  }, 300000);
  timer.default(client, CHANNEL_NAME);
});

client.on('message', mensagemChegou);

client.connect();

http.listen(porta, () => {
  // eslint-disable-next-line no-console
  console.log(`O overlay está rodando em: http://localhost:${porta}`);
});

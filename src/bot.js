/* eslint-disable radix */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-shadow */
/* eslint-disable prefer-const */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

const { Client } = require('tmi.js');
require('dotenv').config();
const { readdirSync, existsSync, mkdirSync, readFileSync } = require('fs');
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.static('src/public'));
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const timer = require('./timers');

const porta = 5050;

if (!existsSync('./data/')) {
  mkdirSync('./data/', { recursive: true });
}

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/src/public/index.html`);
});
const { protectSubscriber } = require('./commands/jail/actions');
const { readDataJSON, writeDataJSON } = require('./utils/data');
const { chatters } = require('./utils/twitch');
const {
  getTodaysLiveAnnouncement,
  mountTweetUrl,
  formatTweetMetrics,
} = require('./utils/twitter');

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
const loja = readDataJSON('lojinha');
const piadas = readDataJSON('piadas');
const geradorNarios = readDataJSON('gerador-de-narios');
const geradorLevs = readDataJSON('gerador-de-levs');
dados.first = null;

const sabores = [
  'Shacolate',
  'Leite Compensado',
  'Frocus',
  'Napolialma',
  'Trushado',
  'Motankum',
  'Vambruesha',
];

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

  writeDataJSON('lojinha', loja);

  return sabor;
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
require('./commands/jail/arrest-viewers').default(client);

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

// Exporta as mensagens do chat e usuários para os commands
client.on('message', (target, context, message, isBot) => {
  if (isBot) return;
  require('./commands/jail').default(client, target, context, message);
  require('./commands/interactions').default(client, target, context, message);
  require('./commands/interactions/carinho').default(
    client,
    target,
    context,
    message,
  );
  require('./commands/interactions/irritar').default(
    client,
    target,
    context,
    message,
  );
});

// intercepta mensagem do chat
function mensagemChegou(target, context, message, ehBot) {
  const pontos = readDataJSON('pontos');

  if (ehBot) {
    return; // se for mensagens do nosso bot ele não faz nada
  }

  let { username } = context;

  if (message.split(' ')[0] === '!comprar') {
    const sabor = compraPicole(message, username);

    client.say(
      target,
      `/me ${username} saindo um picole/sorvete de ${sabor} geladinho para você! 🍦`,
    );
  } else if (message.split(' ')[0] === '!geladeira') {
    const msg = verGeladeira(message, username);

    client.say(target, msg);
  } else if (message.split(' ')[0].toLowerCase() === '!addpontos') {
    if (username.toLowerCase() !== CHANNEL_NAME) {
      client.say(target, '/me Você não tem permissão para adicionar pontos');
      return;
    }

    let user = message.split(' ')[1].toLowerCase().replace('@', '');
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
          });
        })
        .catch(() => {
          client.say(target, '/me, Erro ao adicionar pontos.');
        });

      client.say(target, `/me Adicionado ${qtdPontos} para ${user} BloodTrail`);
    } else {
      if (pontos[user]) {
        pontos[user] += qtdPontos;
      } else {
        pontos[user] = qtdPontos;
      }

      writeDataJSON('pontos', pontos);
    }

    client.say(target, `/me Adicionado ${qtdPontos} para ${user} BloodTrail`);
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
}

async function darPontos() {
  const { vips, moderators, viewers, broadcaster } = await chatters();
  const total = [...vips, ...moderators, ...viewers, ...broadcaster];

  const pontos = readDataJSON('pontos');

  total.forEach((user) => {
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
      socket.emit('alimentar', true);
      client.say(
        target,
        `/me ${context.username} alimentou o pandadomalbot com um sorvete.`,
      );
    }

    if (message === '!loira') {
      socket.emit('loira', true);
      client.say(
        target,
        `/me Quem soltou essa loira? Meu deus leva ela de volta ${context.username}!`,
      );
    }

    if (message === '!gato') {
      socket.emit('gato', true);
    }

    if (message === '!agora') {
      const data = readFileSync('agora.txt', 'utf8');
      socket.emit('agora', data);
    }
  });
});

client.on('connected', (host, port) => {
  // eslint-disable-next-line no-console
  console.log(`* Bot entrou no endereço ${host}:${port}`);

  setTimeout(() => {
    client.say(CHANNEL_NAME, 'Estou de olho em vocês.');
  }, 1500);

  // Reseta a prisão
  const { JAIL_STATE } = require('./commands/jail/state');
  const state = readDataJSON('jail', JAIL_STATE);
  const { dateToString, isToday } = require('./utils/datetime');

  if (!state.last_date || !isToday(state.last_date)) {
    state.last_date = dateToString(new Date());
    state.prisoners = [];
    state.rescuers = [];
    state.fugitives = [];
    state.protected = [];
    writeDataJSON('jail', state);
  }
  //-------------------------------------

  const RETWEET_INTERVAL = parseInt(
    process.env.MINUTOS_ENTRE_PEDIDO_DE_RETWEET,
    10,
  );
  setInterval(async () => {
    const tweet = await getTodaysLiveAnnouncement();
    if (tweet) {
      const metrics = formatTweetMetrics(tweet);
      const url = mountTweetUrl(tweet.id);

      client.say(
        process.env.CHANNEL_NAME,
        `/me ${metrics}Dá um RT aí por favorzinho levxycAnimada ${url}`,
      );
    }
  }, RETWEET_INTERVAL * 1000 * 60);

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

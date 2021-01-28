/* eslint-disable no-shadow */
/* eslint-disable prefer-const */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

const { Client } = require('tmi.js');
const fetch = require('node-fetch');
require('dotenv').config();
const { readdirSync } = require('fs');
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.static('overlay'));
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const porta = 5050;

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/overlay/index.html`);
});

const {
  lerDados,
  lerSubs,
  lerPontos,
  salvaPontos,
  lerCarteira,
  salvaCarteira,
  lerLoja,
  salvaLoja,
  lerPiadas,
  lerEnsinamentos,
  lerRT,
  salvaRT,
} = require('./utils');

const { BOT_USERNAME } = process.env;
const { CHANNEL_NAME } = process.env;
const { OAUTH_TOKEN } = process.env;

const opts = {
  identity: {
    username: BOT_USERNAME,
    password: OAUTH_TOKEN,
  },
  channels: [CHANNEL_NAME],
};

const client = new Client(opts);

const subs = lerSubs();
const dados = lerDados();
const pontos = lerPontos();
const carteira = lerCarteira();
const loja = lerLoja();
const piadas = lerPiadas();
const ensinamentos = lerEnsinamentos();

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
let views = [];
let preso = '';
let tentou = [];
let protegido = '';
let escape = false;
let msgRt;

const motivoIrritacao = [
  'puxou a orelha do panda do mal',
  'imitou a voz do panda do mal',
  'jogou água no panda do mal',
  'sugeriu live de deno',
];

function prendeView() {
  let index = Math.floor(Math.random() * views.length);

  return views[index];
}

function protegerSub() {
  let index = Math.floor(Math.random() * subs.length);

  protegido = subs[index];

  dados.protegido = protegido;
}

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

  salvaLoja(loja);
  salvaCarteira(carteira);

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

protegerSub();

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

// intercepta mensagem do chat
function mensagemChegou(target, context, message, ehBot) {
  if (ehBot) {
    return; // se for mensagens do nosso bot ele não faz nada
  }

  let { username } = context;

  if (views.indexOf(username) === -1) {
    if (username !== protegido) {
      views.push(username);
    }
  }

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

    let user = message.split(' ')[1];
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

            salvaPontos(pontos);

            if (carteira[user]) {
              carteira[user] += qtdPontos;
            } else {
              carteira[user] = qtdPontos;
            }

            salvaCarteira(carteira);
          });
        })
        .catch((error) => {
          client.say(target, '/me, Erro ao adicionar pontos.');
        });
    } else {
      if (pontos[user]) {
        pontos[user] += qtdPontos;
      } else {
        pontos[user] = qtdPontos;
      }

      salvaPontos(pontos);

      if (carteira[user]) {
        carteira[user] += qtdPontos;
      } else {
        carteira[user] = qtdPontos;
      }

      salvaCarteira(carteira);
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

  switch (message) {
    case '!salvar':
      if (preso) {
        if (!tentou.includes(username)) {
          if (preso === username) {
            client.say(target, `/me ${username}, você não pode se salvar.`);
          } else if (Math.random() < 0.5) {
            client.say(
              target,
              `/me ${username} resgatou ${preso} das mãos do panda do mal.`,
            );

            if (pontos[username]) {
              pontos[username] += 100;
            } else {
              pontos[username] = 100;
            }

            salvaPontos(pontos);

            if (carteira[username]) {
              carteira[username] += 100;
            } else {
              carteira[username] = 100;
            }

            salvaCarteira(carteira);

            preso = '';
            tentou = [];
            escape = false;
          } else {
            client.say(
              target,
              `/me ${username} não conseguiu resgatar ${preso} das mãos do panda do mal.`,
            );
            tentou.push(username);
          }
        } else {
          client.say(
            target,
            `/me ${username} você não pode mais resgatar ${preso} das mãos do panda do mal.`,
          );
        }
      } else {
        client.say(target, `/me ${username} não tem ninguem preso.`);
      }
      break;
    case '!irritar': {
      const index = Math.floor(Math.random() * motivoIrritacao.length);
      const irritacao = `${username} ${motivoIrritacao[index]} e `;

      if (context.mod === true) {
        client.say(
          target,
          `/me PunOko para sua sorte ${username}, meus poderes não são capazes de te prender. Mas não conte com isso, um dia eu te pego e você terá os piores momentos da sua vida!!!`,
        );
        break;
      }

      if (Math.random() < 0.5) {
        const tempoTO = Math.floor(Math.random() * 30);
        client.say(
          target,
          `/me ${irritacao} deu azar. Vou segurar você por ${tempoTO} segundos!`,
        );
        client.say(target, `/timeout ${username} ${tempoTO}`);

        preso = username;
        tentou = [];
        escape = false;
      } else {
        if (carteira[username]) {
          carteira[username] += 100;
        } else {
          carteira[username] = 100;
        }

        salvaCarteira(carteira);

        client.say(target, `/me ${irritacao} saiu correndo. Grrrr`);
      }
      break;
    }
    case '!proteger':
      if (username.toLowerCase() === CHANNEL_NAME) {
        protegerSub();
      }
      break;
    case '!protegido':
      client.say(
        target,
        `/me ${protegido} está sob minha proteção, nem adianta tentar!`,
      );
      break;
    case '!escapar':
      if (preso === username) {
        if (!escape) {
          if (Math.random() <= 0.1) {
            let points = [0, 50, 100, 150, 200];
            points = points[Math.floor(Math.random() * points.length)];

            client.say(
              target,
              `/me ${username} conseguiu escapar das minhas mãos e achou ${points} em cima da mesa.`,
            );
            preso = '';
            tentou = [];
            escape = false;

            if (pontos[username]) {
              pontos[username] += points;
            } else {
              pontos[username] = points;
            }

            salvaPontos(pontos);

            if (carteira[username]) {
              carteira[username] += points;
            } else {
              carteira[username] = points;
            }

            salvaCarteira(carteira);
          } else {
            client.say(
              target,
              `/me ${username} não conseguiu escapar das minhas mãos.`,
            );
            escape = true;
          }
        } else {
          client.say(target, `/me ${username} você já tentou escapar.`);
        }
      }
      break;
    case '!preso':
      if (preso) {
        client.say(target, `/me ${preso} está em minhas mãos.`);
      } else {
        client.say(target, `/me não tem ninguem em minhas mãos.`);
      }
      break;
    case '!carinho':
      // eslint-disable-next-line no-case-declarations
      let perfect = Math.random();

      if (perfect >= 0.999) {
        let points = [1000];
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

let interval = null;

client.on('message', (target) => {
  if (interval === null) {
    interval = setInterval(() => {
      if (!preso) {
        preso = prendeView();

        client.say(target, `/me prendeu ${preso}`);
      } else {
        client.say(
          target,
          `/me ${preso} está nas minhas mãos. Digite !salvar para tentar salvar.`,
        );
      }
    }, 600000);
  }
});

function darPontos(channel) {
  fetch(`https://tmi.twitch.tv/group/user/${channel}/chatters`)
    .then((res) => res.json())
    .then((json) => {
      const total = [].concat(
        json.chatters.vips,
        json.chatters.moderators,
        json.chatters.viewers,
        json.chatters.broadcaster,
      );

      total.forEach((user) => {
        if (pontos[user]) {
          pontos[user] += 5;
        } else {
          pontos[user] = 5;
        }

        salvaPontos(pontos);
      });
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
  setInterval(() => {
    darPontos(CHANNEL_NAME);
  }, 10000);
});

client.on('message', mensagemChegou);

client.connect();

http.listen(porta, () => {
  // eslint-disable-next-line no-console
  console.log(`O overlay está rodando em: http://localhost:${porta}`);
});

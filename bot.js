/* eslint-disable no-shadow */
/* eslint-disable prefer-const */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

const {
  Client
} = require('tmi.js');
const {
  readdirSync
} = require('fs');

require('dotenv').config();

const {
  lerDados,
  lerSubs,
  lerPontos,
  salvaPontos
} = require('./utils');

const {
  BOT_USERNAME
} = process.env;
const {
  CHANNEL_NAME
} = process.env;
const {
  OAUTH_TOKEN
} = process.env;

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

const sabores = ['Shacolate', 'Leite Compensado', 'Frocus', 'Napolialma', 'Trucado', 'Motankum', 'Vambruesha'];

// Contadores
let views = [];
let preso = '';
let tentou = [];
let protegido = '';

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

protegerSub();

readdirSync(`${__dirname}/commands`)
  .filter((file) => file.slice(-3) === '.js')
  .forEach((file) => {
    client.on('message', function (target, context, message, isBot) {
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

  let {
    username
  } = context;

  if (views.indexOf(username) == -1) {
    if (username != protegido) {
      views.push(username);
    }
  }

  if (message.split(' ')[0] == '!comprar') {
    if (pontos[username] >= 50) {
      sabor = message.split(' ')[1];

      if (sabor) {
        sabor = sabor[0].toUpperCase() + sabor.substr(1);
      }

      if (message.toLowerCase().includes('leite compensado')) {
        sabor = 'Leite Compensado';
      } else if (!sabores.includes(sabor)) {
        sabor = sabores[Math.floor(Math.random() * sabores.length)];
      }

      pontos[username] -= 50;
      
      salvaPontos(pontos);

      client.say(target, `/me ${username} saindo um picole/sorvete de ${sabor} geladinho para você!`);
    } else {
      client.say(target, `/me ${username} você não tem pontos suficientes, quem saiba da proxima vez!?`);
    }
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

            preso = '';
            tentou = [];
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
    case '!pontos':
      let msg = '';

      if (pontos[username]) {
        msg = `/me ${username} você possui ${pontos[username]} pontos`;
      } else {
        msg = `/me ${username} você possui 0 pontos`;
      }

      client.say(
        target,
        msg
      );

      break;
    case '!irritar':
      const index = Math.floor(Math.random() * motivoIrritacao.length);
      const irritacao = `${username} ${motivoIrritacao[index]} e `;

      if (Math.random() < 0.5) {
        const tempoTO = Math.floor(Math.random() * 30);
        client.say(
          target,
          `/me ${irritacao} deu azar. Vou segurar você por ${tempoTO} segundos!`,
        );
        client.say(target, `/timeout ${username} ${tempoTO}`);

        preso = username;
      } else {
        client.say(target, `/me ${irritacao} saiu correndo.`);
      }
      break;
    case '!proteger':
      if (context.username == 'levxyca') {
        protegerSub();
      }
      break;
    case '!protegido':
      client.say(
        target,
        `/me ${protegido} está sob minha proteção, nem adianta tentar!`,
      );
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
          `/me ${preso} está nas mãos do panda do mal. Digita !salvar para poder salvar.`,
        );
      }
    }, 600000);
  }
});

client.on('connected', (host, port) => {
  // eslint-disable-next-line no-console
  console.log(`* Bot entrou no endereço ${host}:${port}`);
  setTimeout(() => {
    client.say(CHANNEL_NAME, 'Estou de olho em vocês.');
  }, 1500);
});

client.on('message', mensagemChegou);

client.connect();
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
const fs = require('fs');

require('dotenv').config();

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

// Contadores
let countEita = 0;
let countEitaH = 0;
let countCalma = 0;
let countCalmaH = 0;
let countOh = 0;
let countOhH = 0;
let views = [];
let preso = '';
let botOnline = true

let obj = {
  table: {
    qtdEita: 0,
    qtdCalma: 0,
    qtdOh: 0
  },
};

const motivoIrritacao = [
  'puxou a orelha do panda do mal',
  'imitou a voz do panda do mal',
  'jogou água no panda do mal',
  'sugeriu live de deno'
];

function escrever(data) {
  const obj = JSON.stringify(data);
  fs.writeFile('dados.json', obj, 'utf8', (erro) => {
    if (erro) {
      // eslint-disable-next-line no-console
      console.log(erro);
    } else {
      // eslint-disable-next-line no-console
      console.log('salvo');
    }
  });
}

function ler() {
  fs.readFile('dados.json', 'utf8', (erro, data) => {
    if (erro) {
      // eslint-disable-next-line no-console
      console.log('Deu erro no arquivo');
    } else {
      const fileContents = JSON.parse(data);
      countEita = fileContents.table.qtdEita;
      countCalma = fileContents.table.qtdCalma;
      countOh = fileContents.table.qtdOh;
    }
  });
}

function prendeView() {
  let index = Math.floor((Math.random() * views.length));

  return views[index];
}

ler();

readdirSync(`${__dirname}/commands`)
  .filter((file) => file.slice(-3) === '.js')
  .forEach((file) => {
    client.on('message', (target, context, message, isBot) => {
      if (isBot) return;
      require(`./commands/${file}`).default(client, target, context, message);
    });
  });

// intercepta mensagem do chat
function mensagemChegou(target, context, message, ehBot) {
  if (ehBot) {
    return; // se for mensagens do nosso bot ele não faz nada
  }

  let username = context.username;

  if (views.indexOf(username) == -1) {
    views.push(username);
  }

  if (botOnline) {
    client.say(target, "Estou de olho em vocês.")
    botOnline = false
  }

  const messageTrimmed = message.trim();
  const messageSplited = messageTrimmed.split(" ");
  const messageLength = messageSplited.length;
  const messageQuantity = Number.isInteger(parseInt(messageSplited[1],10)) &&  parseInt(messageSplited[1],10) > 1 ? parseInt(messageSplited[1],10) : 1;

    switch (messageSplited[0]) {
      case '!eita':
        countEita += messageQuantity;
        countEitaH += messageQuantity;
        client.say(
          target,
          `/me A @levxyca já disse EITA! ${countEitaH} vezes hoje e ${countEita} vezes desde o dia 09/10/2020.`,
        );
        obj.table.qtdEita = countEita;
        escrever(obj);
        break;
      case '!calma':
        countCalma += messageQuantity;
        countCalmaH += messageQuantity;
        client.say(
          target,
          `/me A @levxyca já disse CALMA! ${countCalmaH} vezes hoje e ${countCalma} vezes desde o dia 09/10/2020.`,
        );
        obj.table.qtdCalma = countCalma;
        escrever(obj);
        break;
      case '!oh':
        countOh += messageQuantity;
        countOhH += messageQuantity;
        client.say(
          target,
          `/me A @levxyca já disse Ó! ${countOhH} vezes hoje e ${countOh} vezes desde o dia 09/10/2020.`,
        );
        obj.table.qtdOh = countOh;
        escrever(obj);
        break;
      case '!salvar':
        if (preso) {
          if (Math.random() < 0.5) {
            client.say(
              target,
              `/me ${username} resgatou ${preso} das mãos do panda do mal.`,
            );

            preso = '';
          } else {
            client.say(
              target,
              `/me ${username} não conseguiu resgatar ${preso} das mãos do panda do mal.`,
            );
          }
        } else {
          client.say(
            target,
            `/me ${username} não tem ninguem preso.`,
          );
        }
        break;
      case '!irritar':
        const index = Math.floor((Math.random() * motivoIrritacao.length));
        const irritacao = `${username} ${motivoIrritacao[index]} e `;

        if (Math.random() < 0.5) {
          client.say(
            target,
            `/me ${irritacao} deu azar.`,
          );

          preso = username;
        } else {
          client.say(
            target,
            `/me ${irritacao} saiu correndo.`,
          );
        }
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
        client.say(target, `/me ${preso} está nas mãos do panda do mal. Digita !salvar para poder salvar.`);
      }
    }, 600000);
  }
});

client.on('connected', (host, port) => {
  // eslint-disable-next-line no-console
  console.log(`* Bot entrou no endereço ${host}:${port}`);
});

client.on('message', mensagemChegou);

client.connect();
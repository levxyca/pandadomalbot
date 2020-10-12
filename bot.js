const { Client } = require('tmi.js');
const { readdirSync } = require('fs');
const fs = require('fs');
const dotenv = require("dotenv").config();

const BOT_USERNAME = process.env.BOT_USERNAME
const CHANNEL_NAME = process.env.CHANNEL_NAME
const OAUTH_TOKEN = process.env.OAUTH_TOKEN

const opts = {
  identity: {
  username: BOT_USERNAME,
  password: OAUTH_TOKEN
  },
  channels: [ CHANNEL_NAME ]
};

const client = new Client(opts);

//Contadores
var countEita = 0;
var countEitaH = 0;
var countCalma = 0;
var countCalmaH = 0;
var countOh = 0;
var countOhH = 0;

var obj = {
  table: {qtdEita:0, qtdCalma:0, qtdOh:0}
};

function escrever(data) {
  let obj = JSON.stringify(data);
  fs.writeFile("dados.json", obj, "utf8", (erro)=>{
    if (erro) {
      console.log(erro);
    } else {
      console.log('salvo');
    }
  });
}

function ler(){
  fs.readFile("dados.json", "utf8", (erro, data)=>{
    if (erro) {
      console.log('Deu erro no arquivo');
    } else {
      data = JSON.parse(data);
      countEita = data.table.qtdEita;
      countCalma = data.table.qtdCalma;
      countOh = data.table.qtdOh;
    }
  });
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

//intercepta mensagem do chat
function mensagemChegou(target, context, message, ehBot) {
  if (ehBot) {
    return; //se for mensagens do nosso bot ele não faz nada
  } 

  switch (message) {
    case '!eita':
      countEita = countEita + 1;
      countEitaH = countEitaH + 1;
      client.say(target, `/me A @levxyca já disse EITA! ${countEitaH} vezes hoje e ${countEita} vezes desde o dia 09/10/2020.`);
      obj.table.qtdEita = countEita;
      escrever(obj);
      break;
    case '!calma':
      countCalma = countCalma + 1;
      countCalmaH = countCalmaH + 1;
      client.say(target, `/me A @levxyca já disse CALMA! ${countCalmaH} vezes hoje e ${countCalma} vezes desde o dia 09/10/2020.`);
      obj.table.qtdCalma = countCalma;
      escrever(obj);
      break;
    case '!oh':
      countOh = countOh + 1;
      countOhH = countOhH + 1;
      client.say(target, `/me A @levxyca já disse Ó! ${countOhH} vezes hoje e ${countOh} vezes desde o dia 09/10/2020.`);
      obj.table.qtdOh = countOh;
      escrever(obj);
      break;
  }
}

client.on('connected', (host, port) => {
  console.log(`* Bot entrou no endereço ${host}:${port}`);
});
client.on('message', mensagemChegou);

client.connect();
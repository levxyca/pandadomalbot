const { client } = require('../../core/twitch_client');
const { sample } = require('../../utilities/collections');

const answers = [
  'sim.',
  'não.',
  'provavelmente.',
  'com certeza!',
  'hmmmmmm, será?',
  'o que você acha?',
  'acredite nos seus sonhos Kappa',
  'vou ver e te aviso...',
  'só tem um jeito de saber...',
  'não conte com isso',
  'é sério que você tá me perguntando isso?',
  'eu gostaria de saber...',
  'minha resposta vai mudar em algo?',
  'fica o questionamento...',
  'é uma questão deveras confusa...',
  'impossível.',
  'que pergunta, hein?',
  'duvido muito.',
  'não acredito nisso.',
  'nem que o panda urre.',
  'em breve.',
  'tudo indica que sim',
  'se concentra e pergunta de novo',
  'é melhor eu não te contar agora',
];

module.exports = {
  keyword: 'pergunta',

  execute({ argument, channel, context }) {
    if (!argument) {
      client.say(
        channel,
        "/me Para utilizar o comando !pergunta você digitar !pergunta 'sua pergunta'",
      );

      return;
    }

    if (argument.includes('9?')) {
      client.say(channel, `/me 9? 99? @${context.username}`);

      return;
    }

    if (argument.match(/j[a-á] pode\?$/i)) {
      client.say(channel, `/me Nunca pode @${context.username}`);

      return;
    }

    if (argument.match(/(aqui|aki)?[ ]?salv[ao]\?$/i)) {
      client.say(channel, `/me salva nada @${context.username}`);

      return;
    }

    client.say(channel, `/me ${sample(answers)} @${context.username}`);
  },
};

function getAnswer() {
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

  const answersCount = answers.length;

  const randomAnswerIndex = Math.floor(Math.random() * answersCount);

  return answers[randomAnswerIndex];
}

exports.default = (client, target, context, message) => {
  const command = message.split(' ');

  if (command[0] === '!pergunta' && command[1] === undefined) {
    client.say(
      target,
      `/me Para utilizar o comando !pergunta você deve digitar !pergunta 'sua pergunta'`,
    );
  } else if (command[0] === '!pergunta') {
    if (message.includes('9?')) {
      client.say(target, `/me 9? 99? @${context.username}`);
    } else if (message.includes('já pode?')) {
      client.say(target, `/me Nunca pode @${context.username} Kappa`);
    } else if (
      message.includes('aqui salva') ||
      message.includes('aki salva') ||
      message.includes('salva?') ||
      message.includes('salvo?')
    ) {
      client.say(target, `/me Salva nada @${context.username}.`);
    } else {
      const answer = getAnswer();
      client.say(target, `/me ${answer} @${context.username}`);
    }
  }
};

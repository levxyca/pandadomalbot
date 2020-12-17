function getAnswer() {
  const answers = [
    'sim',
    'não',
    'provavelmente',
    'com certeza',
    'hmmmmmm, será?',
    'o que você acha?',
    'acredite nos seus sonhos Kappa',
    'vou ver e te aviso...',
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
      `Para utilizar o comando !pergunta você deve digitar !pergunta 'sua pergunta'`,
    );
  } else if (command[0] === '!pergunta') {
    if (message.includes('9?')) {
      client.say(target, `9? 99? @${context.username}`);
    } else {
      const answer = getAnswer();

      client.say(target, `${answer} @${context.username}`);
    }
  }
};

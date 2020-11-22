function getAnswer() {
  const answers = ['sim', 'não', 'provavelmente', 'com certeza'];

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
  } else {
    const answer = getAnswer();

    client.say(target, `${answer} @${context.username}`);
  }
};

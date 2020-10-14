function getAnswer() {
  const answers = ['sim', 'não', 'provavelmente', 'com certeza'];

  const answersCount = answers.length;

  const randomAnswerIndex = Math.floor(Math.random() * answersCount);

  return answers[randomAnswerIndex];
}

exports.default = (client, target, context, message) => {
  const commandName = message.trim();

  if (commandName.includes('!pergunta')) {
    const answer = getAnswer();

    client.say(target, `${answer} @${context.username}`);
  }
};

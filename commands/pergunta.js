function randomArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

exports.default = (client, target, context, message) => {
  if (String(message).includes('!pergunta')) {
    let respostas = ['sim', 'com certeza', 'provavelmente', 'não'];
    let pergunta = String(message).split(' ');

    let resultado = randomArray(respostas);
    client.say(target, `${resultado}, ${context.username}`);
  }
};

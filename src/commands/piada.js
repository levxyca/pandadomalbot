const { readDataJSON } = require('../utils/data');

const RESPONSE_INTERVAL = 3; // Tempo em segundos para a resposta pergunta.

exports.default = (client, target, _, message) => {
  if (message.trim() === '!piada') {
    const piadas = readDataJSON('piadas');

    if (piadas && piadas.length > 0) {
      const piada = piadas[Math.floor(Math.random() * piadas.length)];

      client.say(target, `/me ${piada.pergunta}`);

      const timeout = setTimeout(() => {
        client.say(target, `/me ${piada.resposta}`);
        clearTimeout(timeout);
      }, RESPONSE_INTERVAL * 1000);
    }
  }
};

const { client } = require('../../core/twitch_client');
const { read } = require('../../utilities/data-file');
const { sample } = require('../../utilities/collections');

const SECONDS_TO_ANSWER = 3;

const wait = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

module.exports = {
  keyword: 'piada',

  async execute({ channel }) {
    const piadas = read('piadas');
    if (piadas.length === 0) {
      return;
    }

    const piada = sample(piadas);

    await client.say(channel, `/me ${piada.pergunta}`);
    await wait(SECONDS_TO_ANSWER * 1000);
    await client.say(channel, `/me ${piada.resposta}`);
  },
};

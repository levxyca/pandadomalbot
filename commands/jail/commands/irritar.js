const { readDataJSON, writeDataJSON } = require('../../../utils/data');

const REASONS = [
  'puxou a orelha do panda do mal',
  'imitou a voz do panda do mal',
  'jogou água no panda do mal',
  'sugeriu live de deno',
];

const USAGE_COUNT = {};
const USAGE_MAX = 1; // Número máximo de usos do comando.
const SUCCESSFULLY_IRRITATE_POINTS = 0; // Quantidade de pontos dada ao irritar sem ser preso.

/**
 * Verifica se o usuário pode utilizar o comando.
 *
 * @param {String} username nome do usuário.
 *
 * @returns {Boolean} `true`caso não tenha atingido o número máximo,
 * do contrário `false` é retornado.
 */
const canUseCommand = (username) => {
  if (!(username in USAGE_COUNT)) {
    USAGE_COUNT[username] = 1;
    return true;
  }

  if (USAGE_COUNT[username] < USAGE_MAX) {
    USAGE_COUNT[username] += 1;
    return true;
  }

  return false;
};

/**
 * Executado quando o usuário irrita o pandadomal com sucesso.
 *
 * Ação realizada: adição de pontos na carteira do respectivo usuário
 * com base no valor da constante `SUCCESSFULLY_IRRITATE_POINTS`.
 *
 * @param {Client} client cliente do TMI.
 * @param {String} login nome do usuário.
 * @param {String} reason motivo utilizado para irritar o pandadomal.
 */
const successfullyIrritate = (client, username, reason) => {
  const wallet = readDataJSON('carteira');

  if (username in wallet) {
    wallet[username] += SUCCESSFULLY_IRRITATE_POINTS;
  } else {
    wallet[username] = SUCCESSFULLY_IRRITATE_POINTS;
  }
  writeDataJSON('carteira', wallet);

  client.say(
    process.env.CHANNEL_NAME,
    `/me ${username} ${reason} e saiu correndo. Grrrr`,
  );
};

/**
 * Executado quando usuário não consegue irritar o pandadomal.
 *
 * Ação realizada: timeout de valor aleatório.
 *
 * @param {Client} client cliente do TMI.
 * @param {String} username nome de usuário
 * @param {String} reason motivo usado para irritar o pandadomal.
 */
const unsuccessfulIrritate = (client, username, reason) => {
  const timeout = Math.floor(Math.random() * 30);

  client.say(
    process.env.CHANNEL_NAME,
    `/me ${username} ${reason} e deu azar. Vou segurar você por ${timeout} segundos!`,
  );
  client.say(process.env.CHANNEL_NAME, `/timeout ${username} ${timeout}`);

  const state = readDataJSON('jail');
  writeDataJSON('jail', {
    ...state,
    prisoners: [...state.prisoners, username],
  });
};

/**
 * Executado quando o comando for utilizado por um usuário comum.
 *
 * @param {Client} client cliente do TMI.
 * @param {String} username nome do usuário que utilizou o comando.
 */
const handleCommand = (client, username) => {
  const reason = REASONS[Math.floor(Math.random() * REASONS.length)];

  if (Math.random() < 0.5) {
    unsuccessfulIrritate(client, username, reason);
  } else {
    successfullyIrritate(client, username, reason);
  }
};

exports.default = (client, _, context, message) => {
  if (message === '!irritar') {
    const { badges, mod, username } = context;

    if (!canUseCommand(username)) {
      client.say(
        process.env.CHANNEL_NAME,
        `/me ${username}, você já irritou bastante o pandadomal por hoje.`,
      );
      return;
    }

    if (mod) {
      client.say(
        process.env.CHANNEL_NAME,
        `/me PunOko para sua sorte ${username}, meus poderes não são capazes de te prender. Mas não conte com isso, um dia eu te pego e você terá os piores momentos da sua vida!!!`,
      );
      return;
    }

    handleCommand(client, username);
  }
};

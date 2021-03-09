const { readDataJSON, writeDataJSON } = require('../../../utils/data');
const { dateToString, isToday } = require('../../../utils/datetime');
const { arrest } = require('../actions');

const MAX = parseInt(process.env.MAXIMO_DE_IRRITAR_DIARIOS, 10); // Número máximo de usos do comando.
const POINTS = parseInt(process.env.SUCCESSFULLY_IRRITATE_POINTS, 10); // Quantidade de pontos dada ao irritar sem ser preso.

const canUseCommand = (username) => {
  const state = readDataJSON('irritadores');

  if (state.last_date === isToday) {
    state.users = {};
  }

  state.users = state.users ?? {};

  if (!state.last_date || !isToday(state.last_date)) {
    state.last_date = dateToString(new Date());
    state.users[username] = 1;
    writeDataJSON('irritadores', state);
    return true;
  }

  if (!(username in state.users)) {
    state.users[username] = 1;
    writeDataJSON('irritadores', state);
    return true;
  }

  const usage = state.users[username];
  if (usage < MAX) {
    state.users[username] = usage + 1;
    writeDataJSON('irritadores', state);
    return true;
  }

  return false;
};

const REASONS = [
  'puxou a orelha do panda do mal',
  'imitou a voz do panda do mal',
  'jogou água no panda do mal',
  'sugeriu live de deno',
];

/**
 * Executado quando o usuário irrita o pandadomal com sucesso.
 *
 * Ação realizada: adição de pontos na carteira do respectivo usuário
 * com base no valor da constante `POINTS`.
 *
 * @param {Client} client cliente do TMI.
 * @param {String} login nome do usuário.
 * @param {String} reason motivo utilizado para irritar o pandadomal.
 */
const successfullyIrritate = (client, username, reason) => {
  const wallet = readDataJSON('carteira');

  if (username in wallet) {
    wallet[username] += POINTS;
  } else {
    wallet[username] = POINTS;
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

  arrest(username);
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
    const { mod, username } = context;

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

const { readDataJSON, writeDataJSON } = require('../../../../utils/data');
const { dateToString, isToday } = require('../../../../utils/datetime');
const { arrest } = require('../../../jail/actions');

const DEFAULT_MAX = parseInt(process.env.MAXIMO_DE_IRRITAR_DIARIOS, 10); // Número máximo de usos do comando.
const POINTS = parseInt(process.env.SUCCESSFULLY_IRRITATE_POINTS, 10); // Quantidade de pontos dada ao irritar sem ser preso.

const canUseCommand = (username) => {
  const state = readDataJSON('irritadores');
  const MAX = readDataJSON('estoque-irritar');

  let subtract = MAX.users[username];

  state.users = state.users ?? {};

  if (!state.last_date || !isToday(state.last_date)) {
    state.last_date = dateToString(new Date());
    state.users = {};
    state.users[username] = 1;
    writeDataJSON('irritadores', state);
    if (username in MAX.users) {
      MAX.users[username] = subtract + 1;
      writeDataJSON('estoque-irritar', MAX);
      subtract = MAX.users[username];
      MAX.users[username] = subtract - 1;
      writeDataJSON('estoque-irritar', MAX);
    }
    return true;
  }

  if (!(username in state.users)) {
    state.users[username] = 1;
    writeDataJSON('irritadores', state);
    if (username in MAX.users) {
      MAX.users[username] = subtract - 1;
      writeDataJSON('estoque-irritar', MAX);
    }
    return true;
  }

  const usage = state.users[username];

  if (username in MAX.users) {
    if (subtract > 0) {
      state.users[username] = usage + 1;
      MAX.users[username] = subtract - 1;
      writeDataJSON('estoque-irritar', MAX);
      writeDataJSON('irritadores', state);
      return true;
    }
    // eslint-disable-next-line no-else-return
  } else if (usage < DEFAULT_MAX) {
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
  'falou que a lagostinha é melhor que o panda do mal',
  'não deu carinho no panda do mal',
  'salvou alguém da prisão do panda do mal, deixou ele sozinho',
  'deu um carinho ruim no panda do mal',
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
  const points = readDataJSON('pontos');

  if (username in points) {
    points[username] += POINTS;
  } else {
    points[username] = POINTS;
  }
  writeDataJSON('pontos', wallet);

  client.say(
    process.env.CHANNEL_NAME,
    `/me AAAAAAAAAA ${username} ${reason} e saiu correndo com ${POINTS} pontos. Grrrr`,
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
const unsuccessfulIrritate = (client, username) => {
  // const timeout = Math.floor(Math.random() * 30);

  const wallet = readDataJSON('carteira');
  const points = readDataJSON('pontos');

  if (username in points) {
    points[username] -= 5;
  }
  writeDataJSON('pontos', wallet);

  client.say(
    process.env.CHANNEL_NAME,
    `/me ${username} tentou mas deu azar. Vou prender você e roubar 5 pontos seus.`,
  );
  // client.say(process.env.CHANNEL_NAME, `/timeout ${username} ${timeout}`);

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
  const luck = Math.random();

  if (luck < 0.5) {
    unsuccessfulIrritate(client, username, reason);
  } else {
    successfullyIrritate(client, username, reason);
  }
};

exports.default = (client, _, context, message) => {
  if (message === '!irritar') {
    const { username } = context;

    if (!canUseCommand(username)) {
      client.say(
        process.env.CHANNEL_NAME,
        `/me ${username}, você já irritou bastante o pandadomal por hoje.`,
      );
      return;
    }

    handleCommand(client, username);
  }
};

const { readDataJSON, writeDataJSON } = require('./data');

/**
 * Adiciona o valor especificado à carteira e pontos do usuário.
 *
 * @param {String} user nome do usuário.
 * @param {Array|Number} seed valor dos pontos. Pode ser especificado um Array
 * contendo os possíveis valores a se entregue como pontos.
 *
 * @returns {Number} o número de pontos atribuídos ao usuário.
 */
const giveMoneyAndPointsTo = (user, seed = 100) => {
  let point = seed;

  if (seed instanceof Array) {
    point = seed[Math.floor(Math.random() * seed.length)];
  }

  const wallet = readDataJSON('carteira');
  const points = readDataJSON('pontos');

  wallet[user] = user in wallet ? wallet[user] + point : point;
  points[user] = user in points ? points[user] + point : point;

  writeDataJSON('carteira', wallet);
  writeDataJSON('pontos', points);

  return point;
};

module.exports = { giveMoneyAndPointsTo };

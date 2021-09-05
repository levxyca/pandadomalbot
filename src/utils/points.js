const { readDataJSON, writeDataJSON } = require('./data');

/**
 * Adiciona o valor especificado à carteira e pontos do usuário.
 *
 * @param {String} user nome do usuário.
 * @param {Array|Number} seed valor dos pontos. Pode ser especificado um Array
 * contendo os possíveis valores a ser entregue como pontos. Ex:
 * ```
 * // Entrega um do valores (10, 20, 30, 100) para o usuário jubileu.
 * const points = giveMoneyAndPointsTo('jubileu', [10, 20, 30, 100]);
 *
 * // Entrega o valor 200 para o usuário jubileu.
 * const points = giveMoneyAndPointsTo('jubileu', 200);
 *
 * // Entrega o valor padrão (100) para o usuário jubileu.
 * const points = giveMoneyAndPointsTo('jubileu');
 * ```
 *
 * @returns {Number} o número de pontos atribuídos ao usuário.
 */
const giveMoneyAndPointsTo = (user, seed) => {
  let point = seed;

  if (seed instanceof Array) {
    point = seed[Math.floor(Math.random() * seed.length)];
  }

  const points = readDataJSON('pontos');

  points[user] = user in points ? points[user] + point : point;

  writeDataJSON('pontos', points);

  return point;
};

module.exports = { giveMoneyAndPointsTo };

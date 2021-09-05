/**
 * Formata um objeto date para o formato especificado.
 *
 * @param {Date} date data a ser formatada.
 *
 * @returns {String} a data formatada no padrão mes/dia/ano.
 */
const dateToString = (date) => {
  return date.toLocaleDateString('en', {
    timezone: 'UTC',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

/**
 * Verifica se a data especificada é a de hoje.
 * @param {String} date data no formato mes/dia/ano.
 *
 * @returns {Boolean} true caso seja o mesmo dia.
 */
const isToday = (date) => {
  return dateToString(new Date()) === dateToString(new Date(date));
};

module.exports = {
  dateToString,
  isToday,
};

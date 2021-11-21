/**
 * Formata um objeto date para o formato especificado.
 *
 * @param {Date} date data a ser formatada.
 *
 * @returns {String} a data formatada no padrão dia/mês/ano.
 */
const dateToString = (date) => date.toLocaleDateString('pt-BR');

/**
 * Verifica se a data especificada é a de hoje.
 *
 * @param {String} date data no formato dia/mês/ano.
 *
 * @returns {Boolean} true caso seja o mesmo dia.
 */
const isToday = (date) =>
  dateToString(new Date()) === dateToString(new Date(date));

module.exports = {
  dateToString,
  isToday,
};

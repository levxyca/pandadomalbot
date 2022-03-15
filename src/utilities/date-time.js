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

/**
 * Cria-se um objeto Date a partir de um texto.
 *
 * @param {String} text texto contendo a data no formato DD/MM/YYYY
 */
const dateFromText = (text) => {
  const parts = text.split('/');

  return new Date(parts[2], parts[1] - 1, parts[0]);
};

module.exports = {
  dateToString,
  isToday,
  dateFromText,
};

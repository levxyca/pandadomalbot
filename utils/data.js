const { readFileSync, writeFileSync, existsSync } = require('fs');

const DATA_PATH = './data/';

/**
 * Lê o conteúdo de um arquivo no diretório /data.
 *
 * @param {String} file nome do arquivo (sem o '.json').
 * @param {Object} defaultValue valor padrão a ser retornado caso o
 * arquivo não exista e/ou esteja vazio.
 *
 * @returns {Object} o conteúdo do arquivo como objeto, caso exista e não seja
 * vazio. Do contrário, o valor especificado em 'defaultValue' é retornado.
 */
const readDataJSON = (file, defaultValue = {}) => {
  const path = `${DATA_PATH}/${file}.json`;

  if (!existsSync(path)) {
    return defaultValue;
  }

  const content = readFileSync(path, { encoding: 'utf-8' });
  if (!content) {
    return defaultValue;
  }

  return JSON.parse(content);
};

/**
 * Lê o conteúdo de um arquivo no diretório /data.
 *
 * @param {String} file nome do arquivo (sem o '.json').
 * @param {Object} defaultValue valor padrão a ser retornado caso o
 * arquivo não exista e/ou esteja vazio.
 *
 * @returns {Boolean} true se a escrita no arquivo ocorrer sem errros, do contrário false é retornado.
 */
const writeDataJSON = (file, data) => {
  const path = `${DATA_PATH}/${file}.json`;
  const contents = JSON.stringify(data);

  try {
    writeFileSync(path, contents, { encoding: 'utf-8' });
    return true;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(
      `Falha ao persistir o conteúdo "${contents}" em "${path}". Err: ${err}`,
    );
  }
  return false;
};

module.exports = { readDataJSON, writeDataJSON };

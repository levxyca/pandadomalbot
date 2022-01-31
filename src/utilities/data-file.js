const { existsSync, readFileSync, writeFileSync, mkdirSync } = require('fs');

const PATH = './data';
/**
 * Lê um arquivo específico dentro do diretório /data.
 *
 * @param {String} file nome do arquivo.
 * @param {Object} defaultValue valor padrão a se retornado, caso o arquivo não exista.
 *
 * @returns {Object} o conteúdo do arquivo como objeto, caso exista e não seja vazio.
 * Do contrário, o valor especificado em 'defaultValue' é retornado.
 */
function read(file, defaultValue = {}) {
  // Força a criação do diretório /data.
  if (!existsSync(PATH)) {
    mkdirSync(PATH, { recursive: true });
  }

  const path = `${PATH}/${file}.json`;

  if (!existsSync(path)) {
    return defaultValue;
  }

  const content = readFileSync(path, { encoding: 'utf-8' }) || {};
  const json = JSON.parse(content);
  if (Object.keys(json).length === 0) {
    return defaultValue;
  }

  return json;
}

/**
 * Persiste um objeto em um arquivo dentro do diretório /data.
 *
 * @param {String} file nome do arquivo.
 * @param {Object} contents conteúdo a ser persistido no arquivo.
 *
 * @returns {Boolean} true se o arquivo for criado corretamente.
 */
function write(file, contents) {
  const path = `${PATH}/${file}.json`;
  const contentAsString = JSON.stringify(contents);

  try {
    writeFileSync(path, contentAsString, { encoding: 'utf-8' });
    return true;
  } catch (err) {
    console.error(
      `Falha ao persistir o conteúdo "${contentAsString}" em "${path}". Err: ${err}`,
    );
  }
  return false;
}

module.exports = { read, write };

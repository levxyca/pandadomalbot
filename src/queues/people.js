const fastq = require('fastq');
const { types } = require('util');
const Person = require('../models/person');
const { read, write } = require('../utilities/data-file');

/** Nome do arquivo a ser utilizado. */
const FILE_NAME = 'people';

async function worker({ username, callback }) {
  let content = read(FILE_NAME, []);

  if (!username) {
    const users = content.map((data) => Person.fromJSON(data));
    return users;
  }

  let born = false;
  let person = content.find((p) => p.name === username);

  if (!person) {
    born = true;
    person = new Person(username);
  } else {
    person = Person.fromJSON(person);
  }
  const before = JSON.stringify(person);
  const postExecution = types.isAsyncFunction(callback)
    ? await callback(person)
    : callback(person);

  const after = JSON.stringify(postExecution);
  let log;
  if (born) {
    content = [...content, postExecution];
    log = `[Novo usuário criado] :: Valores iniciais: ${after}`;
  } else if (postExecution) {
    content = content.map((p) => (p.name === username ? postExecution : p));
    log = `[Usuário modificado]\nAntes: ${before}\nAgora: ${after}`;
  }

  if (postExecution) {
    console.info(log);
    write(FILE_NAME, content);
  }

  return null;
}

const queue = fastq.promise(worker, 1);

async function people(username, callback) {
  const result = await queue.push({
    username,
    callback,
  });
  return result;
}

module.exports = { people };

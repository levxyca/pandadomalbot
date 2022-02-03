const fastq = require('fastq');
const { types } = require('util');
const { Jail } = require('../models/jail');
const { read, write } = require('../utilities/data-file');

/** Nome do arquivo a ser utilizado. */
const FILE_NAME = 'jail';

async function worker(callback) {
  const content = Jail.fromJSON(read(FILE_NAME, {}));

  if (types.isAsyncFunction(callback)) {
    await callback(content);
  } else {
    callback(content);
  }

  if (!write(FILE_NAME, content)) {
    console.error('Falha ao alterar o status da prisão.');
  }
}

const queue = fastq.promise(worker, 1);

async function jail(callback) {
  await queue.push(callback);
}

module.exports = { jail };

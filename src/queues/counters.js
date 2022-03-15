const fastq = require('fastq');
const { types } = require('util');
const Counter = require('../models/counter');
const { read, write } = require('../utilities/data-file');

/** Nome do arquivo a ser utilizado. */
const FILE_NAME = 'counters';

async function worker(callback) {
  const content = Counter.fromJSON(read(FILE_NAME), {});

  if (types.isAsyncFunction(callback)) {
    await callback(content);
  } else {
    callback(content);
  }

  if (!write(FILE_NAME, content)) {
    console.error('Falha ao alterar alterar os dados do arquivo de contadores');
  }
}

const queue = fastq.promise(worker, 1);

async function counters(callback) {
  await queue.push(callback);
}

module.exports = { counters };

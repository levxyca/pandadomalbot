/* eslint-disable no-restricted-syntax */

const fs = require('fs');
const path = require('path');

const SRC_PATH = `${__dirname}/..`;

const walkFiles = (filePath) => {
  const files = [];
  for (const file of fs.readdirSync(filePath)) {
    const fullPath = `${filePath}/${file}`;
    if (fs.lstatSync(fullPath).isDirectory())
      walkFiles(fullPath).forEach((x) => files.push(`${file}/${x}`));
    else files.push(file);
  }
  return files;
};

function listJSFiles(dir) {
  const availableCommands = [];
  const root = `${SRC_PATH}/${dir}`;

  for (const file of walkFiles(root)) {
    if (!path.parse(file).base.startsWith('_') && file.slice(-3) === '.js') {
      // eslint-disable-next-line import/no-dynamic-require,global-require
      const module = require(`${root}/${file}`);
      availableCommands.push(module);
    }
  }
  availableCommands.sort((a, b) => (a.keyword - b.keyword ? -1 : 1));
  return availableCommands;
}

module.exports = { listJSFiles };

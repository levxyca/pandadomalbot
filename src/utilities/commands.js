/* eslint-disable no-restricted-syntax */

const fs = require('fs');
const path = require('path');

const COMMANDS_PATH = `${__dirname}/../commands`;

const getCommandFiles = (filePath) => {
  const files = [];
  for (const file of fs.readdirSync(filePath)) {
    const fullPath = `${filePath}/${file}`;
    if (fs.lstatSync(fullPath).isDirectory())
      getCommandFiles(fullPath).forEach((x) => files.push(`${file}/${x}`));
    else files.push(file);
  }
  return files;
};

function commands() {
  const availableCommands = [];

  for (const file of getCommandFiles(COMMANDS_PATH)) {
    if (!path.parse(file).base.startsWith('_') && file.slice(-3) === '.js') {
      // eslint-disable-next-line import/no-dynamic-require,global-require
      const module = require(`${COMMANDS_PATH}/${file}`);
      availableCommands.push(module);
    }
  }
  availableCommands.sort((a, b) => (a.keyword - b.keyword ? 1 : -1));
  return availableCommands;
}

module.exports = { commands };

const fs = require('fs');
const path = require('path');

const COMMANDS_PATH = `${__dirname}/../commands`;

const getCommandFiles = (filePath) => {
  const files = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const file of fs.readdirSync(filePath)) {
    const fullPath = `${filePath}/${file}`;
    if (fs.lstatSync(fullPath).isDirectory())
      getCommandFiles(fullPath).forEach((x) => files.push(`${file}/${x}`));
    else files.push(file);
  }
  return files;
};

function walkCommands() {
  const commands = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const file of getCommandFiles(COMMANDS_PATH)) {
    if (!path.parse(file).base.startsWith('_') && file.slice(-3) === '.js') {
      // eslint-disable-next-line import/no-dynamic-require,global-require
      const module = require(`${COMMANDS_PATH}/${file}`);
      commands.push(module);
    }
  }
  return commands;
}

module.exports = { walkCommands };

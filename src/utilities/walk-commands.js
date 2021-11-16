const fs = require('fs');

const COMMANDS_PATH = `${__dirname}/../commands`;

const getCommandFiles = (path) => {
  const files = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const file of fs.readdirSync(path)) {
    if (!file.startsWith('_') || file.slice(-3) === '.js') {
      const fullPath = `${path}/${file}`;
      if (fs.lstatSync(fullPath).isDirectory())
        getCommandFiles(fullPath).forEach((x) => files.push(`${file}/${x}`));
      else files.push(file);
    }
  }
  return files;
};

function walkCommands() {
  const commands = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const file of getCommandFiles(COMMANDS_PATH)) {
    // eslint-disable-next-line import/no-dynamic-require,global-require
    const module = require(`${COMMANDS_PATH}/${file}`);
    commands.push(module);
  }
  return commands;
}

module.exports = { walkCommands };

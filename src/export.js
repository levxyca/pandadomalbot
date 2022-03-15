const { writeFileSync } = require('fs');
const process = require('process');
const { listCommands } = require('./utilities/commands');

const COMMANDS_FILE = 'commands.json';

require('dotenv').config();

const commands = listCommands().map((command) => {
  const { keyword, aliases, description } = command;
  return {
    keyword,
    aliases,
    description,
  };
});

const indent = process.argv.includes('-pretty') ? 2 : 0;
writeFileSync(COMMANDS_FILE, JSON.stringify(commands, null, indent), {
  encoding: 'utf-8',
});

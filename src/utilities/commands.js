const { listJSFiles } = require('./bot-fs');

/**
 * Obtém a lista de comandos disponíveis.
 *
 * @returns <{
 *    keyword: string,
 *    aliases: string[],
 *    execute: Function
 * }[]>
 */
function listCommands() {
  const files = listJSFiles('commands');
  return files.map((file) => {
    const { keyword, aliases, execute } = file;
    return { keyword, aliases, execute };
  });
}

/**
 * Obtém a listagem de todos os comandos e aliases.
 *
 * @param {Boolean} includePrefix se deve ser incluído o prefixo de comandos.
 */
function commands(includePrefix = false) {
  const all = listCommands().reduce((acc, command) => {
    if (command.aliases) {
      acc = [...acc, ...command.aliases];
    }
    acc = [...acc, command.keyword];
    return acc;
  }, []);

  if (includePrefix) {
    return all.map((command) => `${process.env.PREFIX}${command}`);
  }

  return all;
}

/**
 * Obtém todos os comandos disponíveis (como texto).
 *
 * @param {Boolean} alias se deve ser incluído os aliases.
 */
function commandsAsText(alias = false) {
  const keys = listCommands().map((item) => {
    let command = `${process.env.PREFIX}${item.keyword}`;
    if (alias && item.aliases?.length > 0) {
      command += `(${item.aliases?.join(',')})`;
    }
    return command;
  });
  return keys.sort().join(', ');
}

module.exports = {
  commands,
  listCommands,
  commandsAsText,
};

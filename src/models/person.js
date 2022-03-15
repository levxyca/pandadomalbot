const { isToday, dateFromText } = require('../utilities/date-time');

class Person {
  /**
   * Representa um usuário do chat.
   *
   * @param {String} name nome de usuário na Twitch
   * @param {Number} points quantidade de pontos.
   * @param {Object} usage informação de uso dos comandos.
   */
  constructor(name, points, usage) {
    this.name = name;
    this.points = points || 0;
    this.usage = usage || {};
    this.counter = {
      irritations: 0,
      affections: 0,
    };
  }

  /**
   * Incrementa a quantidade de uso de um comando.
   * @param {String} key chave para identificar o comando.
   */
  incrementCommandUsage(key) {
    const usage = this.usage[key] || {};

    this.usage = {
      ...this.usage,
      [key]: {
        ...usage,
        counter: (this.usage[key]?.counter || 0) + 1,
      },
    };
  }

  /**
   * Define a última data de uso do comando para hoje.
   *
   * @param {String} key identificador do comando.
   */
  setLastCommandUsageForToday(key) {
    const usage = this.usage[key] || {};

    this.usage = {
      ...this.usage,
      [key]: {
        ...usage,
        lastuse: new Date().toLocaleDateString('pt-BR'),
      },
    };
  }

  /**
   * Verifica se o usuário já utilizou o comando hoje.
   *
   * @param {String} key identificador do comando.
   * @returns {Boolean} true, indicando que o usuário já utilizou o comando hoje.
   * Do contrário false é retornado.
   */
  haveUsedTheCommandToday(key) {
    const lastUsage = this.usage[key]?.lastuse || null;

    if (!lastUsage) return false;

    return isToday(dateFromText(lastUsage));
  }

  /**
   * Cria um objeto Person a partir de um objeto.
   * @param {Object} json objeto contendo os dados para se criar o usuário.
   */
  static fromJSON(json) {
    return Object.assign(new Person(), json);
  }
}

module.exports = Person;

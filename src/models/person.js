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
  }

  /**
   * Incrementa a quantidade de uso de um comando.
   * @param {String} command chave para identificar o comando.
   */
  incrementCommandUsage(command) {
    const usage = {
      counter: (this.usage[command]?.counter || 0) + 1,
      lastuse: new Date().toLocaleDateString('pt-BR'),
    };

    this.usage = { ...this.usage, [command]: usage };
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

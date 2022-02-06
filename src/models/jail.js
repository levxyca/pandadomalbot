const { read } = require('../utilities/data-file');
const { usersInChat } = require('../utilities/twitch');

const RescueActions = Object.freeze({
  IS_EMPTY: 0,
  IS_WASTED: 1,
  ALREADY_TRIED_TO_RESCUE: 2,
  SUCCESS_TO_RESCUE: 3,
  FAIL_TO_RESCUE: 4,
});

const EscapeActions = Object.freeze({
  NOT_WASTED_YET: 0,
  ALREADY_TRIED_TO_ESCAPE: 1,
  SUCCESS_TO_ESCAPE: 2,
  FAIL_TO_ESCAPE: 3,
});

class Jail {
  constructor() {
    this.prisoners = [];
    this.rescuers = [];
    this.fugitives = [];
    this.users = {
      protected: null,
      rescued: null,
    };
  }

  /**
   * Obtém o último usuário salvo.
   */
  get lastRescuedUser() {
    return this.users.rescued;
  }

  /**
   * Obtém o usuário protegido.
   */
  get protectedUser() {
    return this.users.protected;
  }

  get prisioners() {
    if (this.prisoners.length === 0) {
      return [];
    }
    return this.prisoners.join(', ');
  }

  /**
   * Limpa os usuários presos, salvadores e futitivos.
   */
  clear() {
    this.prisoners = [];
    this.rescuers = [];
    this.fugitives = [];
  }

  /**
   * Marca um usuário específico como protegido.
   *
   * @param {String} username nome do usuário a ser protegido.
   */
  async protect() {
    const subs = read('subs', null);
    if (!subs) {
      console.error(
        'Arquivo de subs não encontrado em /data/subs.json ou vazio.',
      );
      return null;
    }

    const users = await usersInChat();
    const subsInChat = users.filter((user) => subs.includes(user));

    if (!subsInChat || subsInChat.length === 0) {
      console.info('Nenhum sub para ser protegido atualmente no chat.');
      return null;
    }
    const user = subsInChat[Math.floor(Math.random() * subsInChat.length)];

    this.users.protected = user;
    console.info('Novo usuário protegido:', user);
    return user;
  }

  /**
   * Prende um usuário do chat
   * @returns {String} nome do usuário que foi preso.
   */
  async arrest() {
    let chat = await usersInChat();

    chat = chat.filter((user) => !this.prisoners.includes(user.toLowerCase()));

    if (this.users.protected) {
      chat = chat.filter((user) => user.toLowerCase() !== this.users.protected);
    }

    if (chat.length === 0) return null;

    const user = chat[Math.floor(Math.random() * chat.length)];
    this.prisoners.push(user.toLowerCase());

    console.info('Novo usuário preso:', user);
    return user;
  }

  /**
   * Tenta resgatar um usuário preso.
   *
   * @param   {String} username
   *          Usuário tentando realizar a ação de resgate.
   *
   * @returns {Number}
   *          Dependendo do
   */
  rescue(username) {
    const user = username.toLowerCase();
    if (this.prisoners.length === 0) {
      // Só por garantia :)
      // Limpa o restante das listas caso não tenha ninguém preso.
      this.clear();
      return RescueActions.IS_EMPTY;
    }

    if (this.prisoners.includes(user)) return RescueActions.IS_WASTED;

    if (this.rescuers.includes(user))
      return RescueActions.ALREADY_TRIED_TO_RESCUE;

    if (Math.random() < 0.5) {
      const rescued =
        this.prisoners[Math.floor(Math.random() * this.prisoners.length)];

      this.prisoners = this.prisoners.filter((u) => u !== rescued);

      this.rescuers = [];
      this.fugitives = [];

      this.users.rescued = rescued;

      return RescueActions.SUCCESS_TO_RESCUE;
    }
    this.rescuers = [...new Set([...this.rescuers, user])];
    return RescueActions.FAIL_TO_RESCUE;
  }

  escape(username) {
    const user = username.toLowerCase();

    if (this.prisioners.length === 0 || !this.prisioners.includes(user))
      return EscapeActions.NOT_WASTED_YET;

    if (this.fugitives.includes(user))
      return EscapeActions.ALREADY_TRIED_TO_ESCAPE;

    if (Math.random() <= 0.1) {
      this.prisoners = this.prisoners.filter((u) => u !== user);
      return EscapeActions.SUCCESS_TO_ESCAPE;
    }
    this.fugitives = [...new Set([...this.fugitives, user])];
    return EscapeActions.FAIL_TO_ESCAPE;
  }

  static fromJSON(json) {
    return Object.assign(new Jail(), json);
  }
}

module.exports = { Jail, RescueActions, EscapeActions };

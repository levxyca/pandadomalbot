const axios = require('axios').default;

class TwitchAPI {
  constructor() {
    this.token = null;
    this.url = process.env.API_ENDPOINT;
    this.expiration = 4802369 / 2;
    this.expiresIn = 0;
    this.currentUser = null;
  }

  /**
   * Obtém os informações do usuário do canal.
   *
   * PS: execute o método TwitchAPI#fetchCurrentUser antes de acessar esta propriedade.
   */
  get me() {
    return this.currentUser;
  }

  async #authorization() {
    const query = new URLSearchParams({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: 'client_credentials',
      scopes: '',
    });

    const response = await axios.post(
      `${process.env.AUTH_ENDPOINT}/token?${query}`,
    );
    if (response.status === 200) {
      this.token = response.data.access_token;
      this.expiresIn = response.data.expires_in;
      return true;
    }
    return false;
  }

  async #validate() {
    if (this.token === null) {
      if (!(await this.#authorization())) {
        throw new Error('Falha ao se autenticar pela API da Twitch.');
      }
    }

    if (this.expiresIn < this.expiration) {
      if (!(await this.#authorization())) {
        throw new Error('Falha ao se autenticar pela API da Twitch.');
      }
    }
    return true;
  }

  /**
   * Obtém os dados do usuário do canal.
   */
  async fetchCurrentUser() {
    const user = await this.user(process.env.CHANNEL);
    if (user) {
      this.currentUser = user;
    }
  }

  /**
   * Obtém os dados de um usuário pelo seu login.
   *
   * @param {String} username nome de usuário.
   *
   * @returns {
   *    "id": "141981764",
   *    "login": "twitchdev",
   *    "display_name": "TwitchDev",
   *    "type": "",
   *    "broadcaster_type": "partner",
   *    "description": "Description example.",
   *    "profile_image_url": "https://image-example.png",
   *    "offline_image_url": "https://image-example.pngg",
   *    "view_count": 5980557,
   *    "created_at": "2016-12-14T20:32:28Z"
   * }
   */
  async user(username) {
    if (await this.#validate()) {
      const query = `login=${username}`;
      const response = await axios.get(`${this.url}/users?${query}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Client-Id': process.env.CLIENT_ID,
        },
      });
      if (response.status === 200) {
        return response.data.data[0];
      }
      return null;
    }
    throw new Error('Falha ao obter o usuário pela API.');
  }

  /**
   * Obtém as informações sobre follow entre dois usuários.
   *
   * @param {string} from ID do usuário interessado (ex: quem usou o comando).
   * @param {string} to ID do usuário alvo (ex: dono do canal).
   *
   * @returns {
   *    "from_id": "171003792",
   *    "from_login": "iiisutha067iii"
   *    "from_name": "IIIsutha067III"
   *    "to_id": "23161357",
   *    "to_name": "LIRIK",
   *    "followed_at": "2017-08-22T22:55:24Z"
   * }
   */
  async follow(from, to) {
    if (await this.#validate()) {
      const response = await axios.get(
        `${this.url}/users/follows?to_id=${to}&from_id=${from}`,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Client-Id': process.env.CLIENT_ID,
          },
        },
      );
      if (response.status === 200 && response.data.total === 1) {
        return response.data.data[0];
      }
      return null;
    }
    throw new Error('Falha ao obter os dados de follow pela API.');
  }
}

const api = new TwitchAPI();

module.exports = api;

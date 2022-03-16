const axios = require('axios').default;

class TwitchAPI {
  constructor() {
    this.token = null;
    this.url = process.env.API_ENDPOINT;
    this.expiration = 4802369 / 2;
    this.expiresIn = 0;
    this.currentUser = null;
  }

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

const { client } = require('../../core/client');

const USERNAME = 'EduardoCodes';

module.exports = {
  keyword: 'subgratisedu',
  async execute({ context, channel }) {
    if (context.username.toLowerCase() === USERNAME.toLowerCase()) {
      await client.say(
        channel,
        `${USERNAME} está querendo um gift sub. Quem se habilita?`,
      );
    }
  },
};

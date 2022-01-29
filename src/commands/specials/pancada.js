const { client } = require('../../core/twitch_client');

module.exports = {
  keyword: 'pancada',
  async execute({ context, channel }) {
    if (context.username.toLowerCase() === 'vitthin') {
      const perfect = Math.floor(Math.random() * 100) + 1;

      let reply;

      if (perfect === 100) {
        reply = `
          ${context.username} está dando a MAIOR PANCADA que eu já recebi 🐼
          Obrigada por sua gentileza, eu estou muito feliz agora graças a você
          PandaFurious
        `;
      } else if (perfect >= 70) {
        reply = `
          Obrigado pela sua pancada ${context.username}! 🐼
          Apesar de não ser a pancada perfeita foi uma pancada muito boa!
          Seu nível de pancada foi ${perfect}%.
        `;
      } else {
        reply = `
          Obrigado pela sua pancada ${context.username}! 🐼
          Se é que posso chamar isso de pancada né, porque eu acho que você
          me deu um carinho PandaRoll Seu nível de pancada foi ${perfect}%.
        `;
      }

      client.say(channel, reply);
    }
  },
};

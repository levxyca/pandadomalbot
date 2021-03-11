exports.default = (client, target, context, message) => {
  switch (message) {
    case '!social':
      client.say(
        target,
        `Me encontre nas outras redes sociais 🌎 https://links.levxyca.codes`,
      );
      break;
    case '!telegram':
      client.say(
        target,
        `Fique por dentro de todos os avisos da live 📰 https://t.me/newslevxyca`,
      );
      break;
    case '!discord':
      client.say(
        target,
        `O reino estelar é o nosso servidor do discord ⭐ https://discord.io/levxyca`,
      );
      break;
    case '!caverna':
      client.say(
        target,
        `Uma comunidade voltada para programação em geral com o objetivo de ajudar uns aos outros, estudar coletivamente, e outros. https://discord.io/caverna ⭐Por favor, não se esqueça de passar no canal #regras para liberar o acesso á todas as salas do nosso servidor⭐`,
      );
      break;
    case '!fofinho':
      client.say(
        target,
        `Um grupo no zap para apreciar bichinhos fofinhos 🐈 https://chat.whatsapp.com/BDHFDIn3yZM7pZwLpiQron`,
      );
      break;
    case '!github':
      client.say(
        target,
        `Confira meus projetos e contribuições 🦄 https://github.com/levxyca`,
      );
      break;
    case '!podcast':
      client.say(
        target,
        `Podcast com bate-papo sobre tecnologia apresentado por mim e pela @pachicodes 🎧 https://anchor.fm/mocasdaweb/`,
      );
      break;
    case '!youtube':
      client.say(
        target,
        `Conheça o meu canal no youtube sobre tecnologia, bate-papo, rotina e afins 🎥 www.youtube.com/levxyca`,
      );
      break;
    default:
      break;
  }
};

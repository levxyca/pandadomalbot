exports.default = (client, target, context, message) => {
  switch (message) {
    case '!donate':
      client.say(
        target,
        `Você pode doar pelo PayPal: https://streamlabs.com/levxyca/tip, ou pelo PicPay: https://app.picpay.com/user/levxyca 💰`,
      );
      break;
    case '!prime':
      client.say(
        target,
        `Com o prime você paga 9,99R$ e você pode dar um sub aqui na live, assistir filmes, músicas, frete gratis e muito mais ❤️ twitch.amazon.com/tp`,
      );
      break;
    case '!picpay':
      client.say(
        target,
        `Você pode doar através do picpay: https://app.picpay.com/user/levxyca 💰`,
      );
      break;
    case '!sub':
      client.say(
        target,
        `Por apenas R$7,90 você consegue se tornar sub do canal e me ajudar a continuar fazendo o que amo 💙 https://www.twitch.tv/subs/levxyca 🤗`,
      );
      break;
    default:
      break;
  }
};

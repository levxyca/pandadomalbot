exports.default = (client, target) => {
  function soundAlerts() {
    client.say(
      target,
      `💵 Sabia que você pode comprar sons para tocar na live com seus bits?  Além de tocar os sons com bits, se você doar 6.66, 66.66 ou 666.66 por aqui https://streamlabs.com/levxyca/tip você dá um sustinho na gente!`,
    );
  }
  function comandos() {
    client.say(
      target,
      `Para saber quais comandos temos disponíveis aqui é só digitar !commands 🐼`,
    );
  }
  function sub() {
    client.say(
      target,
      `💵 Quer apoiar o meu canal e me incentivar a fazer algo que eu amo?  Seja sub do canal! Você vai ter vantagens exclusivas. Digite !sub e caso você tenha o prime, você pode dar um sub de graça todo mês, digite !prime`,
    );
  }
  function vantagens() {
    client.say(
      target,
      `Sabia que você pode ganhar prêmios participando da live? Para saber mais digite !premio ou !help 🐼`,
    );
  }
  function ajuda() {
    client.say(
      target,
      `Está gostando da live? Se sim, deixa seu follow. É de graça e me ajuda muito!  E, lembrando que, caso não possa assistir a live, deixa ela aberta e muta no navegador pra ajudar 🤗`,
    );
  }

  function recado() {
    client.say(
      target,
      `/me ATENÇÃO O MEU SISTEMA DE PONTUAÇÃO ESTÁ COM MAL FUNCIONAMENTO POR FAVOR SEJAM GENTIS COMIGO 🐼`,
    );
  }

  setInterval(() => {
    comandos();
  }, 1200000); // 20min
  setInterval(() => {
    soundAlerts();
  }, 2400000); // 40min
  setInterval(() => {
    sub();
  }, 1800000); // 30min
  setInterval(() => {
    vantagens();
  }, 900000); // 15min
  setInterval(() => {
    ajuda();
  }, 1500000); // 25min
  // setInterval(() => {
  //   recado();
  // }, 600000); // 10min
};

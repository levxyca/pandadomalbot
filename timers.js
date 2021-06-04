exports.default = (client, target) => {
  function comandos() {
    client.say(
      target,
      `Para saber quais comandos temos disponíveis aqui é só digitar !commands 🐼`,
    );
  }

  setInterval(() => {
    comandos();
  }, 1200000); // 20min
};

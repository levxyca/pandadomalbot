const fs = require('fs');

module.exports = {
  salvarDados(data) {
    const obj = JSON.stringify(data);
    fs.writeFile('./data/dados.json', obj, 'utf8', (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log('salvo');
      }
    });
  },
  lerDados() {
    let dados = {};
    try {
      const conteudoArquivo = fs.readFileSync('./data/dados.json');
      if (!conteudoArquivo) return;
      dados = JSON.parse(conteudoArquivo);

      // return dados;
    } catch (err) {
      console.log('Deu erro no arquivo :(');
    } finally {
      return dados;
    }
  },
  lerSubs() {
    const subs = [];
    try {
      const data = fs.readFileSync('./data/subs.txt', 'utf8');
      if (!data) return;

      const lines = data.split(/\r?\n/);

      lines.forEach((line) => {
        subs.push(line);
      });
    } finally {
      return subs;
    }
  },
};

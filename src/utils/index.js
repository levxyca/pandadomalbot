const fs = require('fs');

module.exports = {
  salvarDados(data) {
    const obj = JSON.stringify(data);
    fs.writeFile('./data/dados.json', obj, 'utf8', (erro) => {
      if (erro) {
        // eslint-disable-next-line no-console
        console.log(erro);
      } else {
        // eslint-disable-next-line no-console
        console.log('salvo');
      }
    });
  },
  lerDados() {
    let dados = {};
    try {
      const conteudoArquivo = fs.readFileSync('./data/dados.json');

      if (conteudoArquivo) {
        dados = JSON.parse(conteudoArquivo);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('Falha ao ler o arquivo dados.json', err);
    }
    return dados;
  },
  lerSubs() {
    const subs = [];
    try {
      const data = fs.readFileSync('./data/subs.txt', 'utf8');

      if (data) {
        const lines = data.split(/\r?\n/);

        lines.forEach((line) => {
          subs.push(line);
        });
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('Falha ao ler o conteúdo do arquivo de subs', err);
    }
    return subs;
  },
};

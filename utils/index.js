const fs = require('fs');

module.exports = {
  salvarDados(data) {
    const obj = JSON.stringify(data);
    fs.writeFile('dados.json', obj, 'utf8', (erro) => {
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
      const conteudoArquivo = fs.readFileSync('dados.json');
      if (!conteudoArquivo) return;
      dados = JSON.parse(conteudoArquivo);

      // return dados;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('Deu erro no arquivo');
    } finally {
      return dados;
    }
  },
  lerSubs() {
    const subs = [];
    try {
      const data = fs.readFileSync('subs.txt', 'utf8');
      if (!data) return;

      const lines = data.split(/\r?\n/);

      lines.forEach((line) => {
        subs.push(line);
      });
    } finally {
      return subs;
    }
  },
  lerPontos() {
    let dados = {};
    try {
      const conteudoArquivo = fs.readFileSync('pontos.json');
      if (!conteudoArquivo) return;
      dados = JSON.parse(conteudoArquivo);
    } finally {
      return dados;
    }
  },
  salvaPontos(data) {
    const obj = JSON.stringify(data);
    fs.writeFile('pontos.json', obj, 'utf8', (erro) => {
      if (erro) {
        // eslint-disable-next-line no-console
        console.log(erro);
      } else {
        // eslint-disable-next-line no-console
        console.log('salvo');
      }
    });
  },
  lerCarteira() {
    let dados = {};
    try {
      const conteudoArquivo = fs.readFileSync('carteira.json');
      if (!conteudoArquivo) return;
      dados = JSON.parse(conteudoArquivo);
    } finally {
      return dados;
    }
  },
  salvaCarteira(data) {
    const obj = JSON.stringify(data);
    fs.writeFile('carteira.json', obj, 'utf8', (erro) => {
      if (erro) {
        // eslint-disable-next-line no-console
        console.log(erro);
      } else {
        // eslint-disable-next-line no-console
        console.log('salvo');
      }
    });
  },
  lerLoja() {
    let dados = {};
    try {
      const conteudoArquivo = fs.readFileSync('lojinha.json');
      if (!conteudoArquivo) return;
      dados = JSON.parse(conteudoArquivo);
    } finally {
      return dados;
    }
  },
  salvaLoja(data) {
    const obj = JSON.stringify(data);
    fs.writeFile('lojinha.json', obj, 'utf8', (erro) => {
      if (erro) {
        // eslint-disable-next-line no-console
        console.log(erro);
      } else {
        // eslint-disable-next-line no-console
        console.log('salvo');
      }
    });
  },
  lerRT() {
    let msgRT;
    try {
      msgRT = fs.readFileSync('rt.txt');
      if (!msgRT) return;
    } finally {
      return msgRT;
    }
  },
  salvaRT(data) {
    fs.writeFile('rt.txt', data, 'utf8', (erro) => {
      if (erro) {
        // eslint-disable-next-line no-console
        console.log(erro);
      } else {
        // eslint-disable-next-line no-console
        console.log('salvo');
      }
    });
  },
};

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
  lerPontos() {
    let dados = {};
    try {
      const conteudoArquivo = fs.readFileSync('./data/pontos.json');
      if (!conteudoArquivo) return;
      dados = JSON.parse(conteudoArquivo);
    } finally {
      return dados;
    }
  },
  salvaPontos(data) {
    const obj = JSON.stringify(data);
    fs.writeFile('./data/pontos.json', obj, 'utf8', (erro) => {
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
      const conteudoArquivo = fs.readFileSync('./data/carteira.json');
      if (!conteudoArquivo) return;
      dados = JSON.parse(conteudoArquivo);
    } finally {
      return dados;
    }
  },
  salvaCarteira(data) {
    const obj = JSON.stringify(data);
    fs.writeFile('./data/carteira.json', obj, 'utf8', (erro) => {
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
      const conteudoArquivo = fs.readFileSync('./data/lojinha.json');
      if (!conteudoArquivo) return;
      dados = JSON.parse(conteudoArquivo);
    } finally {
      return dados;
    }
  },
  salvaLoja(data) {
    const obj = JSON.stringify(data);
    fs.writeFile('./data/lojinha.json', obj, 'utf8', (erro) => {
      if (erro) {
        // eslint-disable-next-line no-console
        console.log(erro);
      } else {
        // eslint-disable-next-line no-console
        console.log('salvo');
      }
    });
  },
  lerPiadas() {
    let dados = {};
    try {
      const conteudoArquivo = fs.readFileSync('./data/piadas.json');
      if (!conteudoArquivo) return;
      dados = JSON.parse(conteudoArquivo);
    } finally {
      return dados;
    }
  },
  lerEnsinamentos() {
    let dados = {};
    try {
      const conteudoArquivo = fs.readFileSync('./data/ensinamentos.json');
      if (!conteudoArquivo) return;
      dados = JSON.parse(conteudoArquivo);
    } finally {
      return dados;
    }
  },
  lerGeradorNario() {
    let dados = {};
    try {
      const conteudoArquivo = fs.readFileSync('./data/gerador-de-narios.json');
      if (!conteudoArquivo) return;
      dados = JSON.parse(conteudoArquivo);
    } finally {
      return dados;
    }
  },
  lerGeradorLev() {
    let dados = {};
    try {
      const conteudoArquivo = fs.readFileSync('./data/gerador-de-levs.json');
      if (!conteudoArquivo) return;
      dados = JSON.parse(conteudoArquivo);
    } finally {
      return dados;
    }
  },
  lerRT() {
    let msgRT;
    try {
      msgRT = fs.readFileSync('./data/rt.txt');
      if (!msgRT) return;
    } finally {
      return msgRT;
    }
  },
  salvaRT(data) {
    fs.writeFile('./data/rt.txt', data, 'utf8', (erro) => {
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

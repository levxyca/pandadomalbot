const fs = require('fs');

module.exports = {
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

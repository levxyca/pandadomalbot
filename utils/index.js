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
        const conteudoArquivo = fs.readFileSync('dados.json', 'utf8');
        if (!conteudoArquivo) return;
        dados = JSON.parse(conteudoArquivo);
        
        countEita = dados.table.qtdEita;
        countCalma = dados.table.qtdCalma;
        countOh = dados.table.qtdOh;
    
        return dados;
      } catch (err) {
      // eslint-disable-next-line no-console 
        console.log('Deu erro no arquivo');
      } finally {
        return dados;
      }
    }
    
}
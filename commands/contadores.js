const { salvarDados } = require('../utils')

const COMANDOS_CONTADORES = {
  '!calma' : {
    palavra: 'CALMA',
    contadorTotal: 'qtdCalma',
    contadorDiario: 'qtdCalmaH',
    temCombo: true
  },
  '!eita' : {
    palavra: 'EITA',
    contadorTotal: 'qtdEita',
    contadorDiario: 'qtdEitaH',
    temCombo: true
  },
  '!oh': {
    palavra: 'Ó',
    contadorTotal: 'qtdOh',
    contadorDiario: 'qtdOhH',
    temCombo: true
  }
}

const DATA_INICIAL = '09/10/2020';
const COMBO_MAX = 20;

const isComboValido = (combo) => {
  return combo && !isNaN(combo) && combo > 0 && combo < COMBO_MAX;
}

exports.default = (client, target, context, message, dados) => {
    if (!dados) {
      console.log('Objeto de dados vazio');
      return;
    }

    const data = [new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear()].join('/')
    
    const commandName = message.trim();
    const [comando, combo] = commandName.split(' ');
    const comandoContador = COMANDOS_CONTADORES[comando]

    if (!comandoContador) return;

    let contadorTotal = dados.table[comandoContador.contadorTotal] || 0;
    let contadorDiario = dados.table.ultimaData === data ? (dados.table[comandoContador.contadorDiario] || 0) : 0;

    const valorASerSomado = comandoContador.temCombo && isComboValido(combo) ? parseInt(combo) : 1; 
    contadorTotal += valorASerSomado;
    contadorDiario += valorASerSomado;

    client.say(
        target,
        `/me A @levxyca já disse ${comandoContador.palavra}! ${contadorDiario} vezes hoje e ${contadorTotal} vezes desde o dia ${DATA_INICIAL}.`,
    );

    dados.table[comandoContador.contadorTotal] = contadorTotal;
    dados.table[comandoContador.contadorDiario] = contadorDiario;
    dados.table.ultimaData = data;

    salvarDados({...dados});
};

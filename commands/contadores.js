const { salvarDados } = require('../utils');

const COMANDOS_CONTADORES = {
  '!calma': {
    palavra: 'CALMA',
    contadorTotal: 'qtdCalma',
    contadorDiario: 'qtdCalmaH',
    temCombo: true,
  },
  '!eita': {
    palavra: 'EITA',
    contadorTotal: 'qtdEita',
    contadorDiario: 'qtdEitaH',
    temCombo: true,
  },
  '!oh': {
    palavra: 'Ó',
    contadorTotal: 'qtdOh',
    contadorDiario: 'qtdOhH',
    temCombo: true,
  },
  '!esbarrou': {
    palavra: 'ESBARROU',
    contadorTotal: 'qtdEsbarrou',
    contadorDiario: 'qdtEsbarrouH',
    temCombo: true,
  },
};

const DATA_INICIAL = '09/10/2020';
const COMBO_MAX = 20;

const isComboValido = (combo) => {
  return (
    combo && !Number.isNaN(Number(combo)) && combo > 0 && combo < COMBO_MAX
  );
};

exports.default = (client, target, context, message, dados) => {
  if (!dados) return;

  const data = [
    new Date().getDate(),
    new Date().getMonth() + 1,
    new Date().getFullYear(),
  ].join('/');

  if (dados.table.ultimaData !== data) {
    dados.table.qtdEitaH = 0;
    dados.table.qtdCalmaH = 0;
    dados.table.qtdOhH = 0;
    dados.table.qtdEsbarrou = 0;
  }

  const commandName = message.trim();
  const [comando, combo] = commandName.split(' ');
  const comandoContador = COMANDOS_CONTADORES[comando];

  if (!comandoContador) return;

  let contadorTotal = dados.table[comandoContador.contadorTotal] || 0;

  let contadorDiario =
    dados.table.ultimaData === data
      ? dados.table[comandoContador.contadorDiario] || 0
      : 0;

  const novosDados = { ...dados };

  const valorASerSomado =
    comandoContador.temCombo && isComboValido(combo) ? parseInt(combo, 10) : 1;
  contadorTotal += valorASerSomado;
  contadorDiario += valorASerSomado;

  client.say(
    target,
    `/me A @levxyca já disse ${comandoContador.palavra}! ${contadorDiario} vezes hoje e ${contadorTotal} vezes desde o dia ${DATA_INICIAL}.`,
  );

  novosDados.table[comandoContador.contadorTotal] = contadorTotal;
  novosDados.table[comandoContador.contadorDiario] = contadorDiario;
  novosDados.table.ultimaData = data;

  salvarDados({ ...novosDados });
};

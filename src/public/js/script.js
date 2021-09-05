/* eslint-disable */
const app = document.querySelector('#app');
const panda = document.querySelector('#panda');
const sorvete = document.querySelector('#sorvete');
const loira = document.querySelector('#loira');
const alimentar = document.querySelector('#alimentar');
const capturaloira = document.querySelector('#capturaloira');
const mostragato = document.querySelector("#mostragato");
const gato = document.querySelector("#gato");

const socket = io();

socket.on('alimentar', () => {
  panda.classList.add('panda');
  sorvete.classList.add('sorvete');
  alimentar.classList.remove('hidden');

  setTimeout(() => {
    sorvete.classList.remove('sorvete');
    panda.classList.remove('panda');
    alimentar.classList.add('hidden');
  }, 5000);
});

socket.on('loira', () => {
  loira.classList.add('loira');
  capturaloira.classList.remove('hidden');

  setTimeout(() => {
    loira.classList.remove('loira');
    capturaloira.classList.add('hidden');
  }, 5000);
});

socket.on('gato', () => {
  gato.classList.add('gato');
  mostragato.classList.remove('hidden');

  setTimeout(() => {
    gato.classList.remove('gato');
    mostragato.classList.add('hidden');
  }, 5000);
});

/* eslint-disable */
const app = document.querySelector('#app');
const panda = document.querySelector('#panda');
const sorvete = document.querySelector('#sorvete');

const socket = io();

socket.on('alimentar', () => {
  panda.classList.add('panda');
  sorvete.classList.add('sorvete');
  app.classList.remove('hidden');

  setTimeout(() => {
    sorvete.classList.remove('sorvete');
    panda.classList.remove('panda');
    app.classList.add('hidden');
  }, 5000);
});

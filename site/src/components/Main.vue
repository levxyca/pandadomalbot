<template>
  <h1>Panda do Mal Bot</h1>
  <p>
    O Panda do Mal Bot foi pensado para as lives do canal da
    <a href="https://twitch.tv/levxyca">Levxyca</a>
  </p>

  <Github name="levxyca/pandadomalbot" link="pandadomalbot" />

  <Desenvolvimento />
  <Contribuindo />

  <Geral />
  <Donate />
  <Social />

</template>

<script>
import Desenvolvimento from './Desenvolvimento.vue';
import Contribuindo from './Contribuindo.vue';
import Github from './Github.vue';
import Geral from './Geral.vue';
import Donate from './Donate.vue';
import Social from './Social.vue';

export default {
  name: 'HelloWorld',
  components: {
    Geral,
    Donate,
    Social,
    Contribuindo,
    Desenvolvimento,
    Github,
  },
};
</script>
<style>
@import '../assets/css/main.css';
</style>

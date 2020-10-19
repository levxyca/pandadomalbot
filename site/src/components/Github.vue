<template>
  <a :href="linkDisplay" target="_blank" class="disableLink">
    <div class="github">
      <span class="githubName">{{ name }}</span>
      <div class="githubLink"></div>
    </div>
  </a>
</template>

<script>
export default {
  name: 'Github',
  props: {
    name: String,
    link: String,
  },
  computed: {
    linkDisplay() {
      return 'https://github.com/levxyca/' + this.link;
    },
  },
};
</script>

<style>
@import '../assets/css/github.css';
</style>

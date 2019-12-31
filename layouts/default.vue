<template>
  <div>
    <Header/>
    <div class="page-wrapper">
      <nuxt/>
    </div>
  </div>
</template>

<script>
  import Header from '~/components/Header.vue'

  export default {
    components: {
      Header
    }
  }
</script>

<style lang="scss">
  @import "../assets/css/layout.shared";

  .page-wrapper {
    padding: 15px;
  }
</style>

<template>
  <div class="title-page-wrapper">
    <h1 class="title">{{ name }}</h1>
  </div>
</template>

<script>
  export default {
    name: "TitlePage",
    props: {
      name: {
        type: String
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/base.variables";
  @import "../../assets/css/base.mixins";

  .title-page-wrapper {
    padding-bottom: 20px;
  }

  .title {
    font-size: 3.6rem;
    font-weight: bold;
    color: $color-main;
    text-transform: uppercase;
  }
</style>

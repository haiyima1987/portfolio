<template>
  <div class="heading-wrapper">
    <h1 class="title-heading">{{ name }}</h1>
    <div class="line"></div>
  </div>
</template>

<script>
  export default {
    name: "Heading",
    props: {
      name: {
        type: String
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/css/base.variables";
  @import "../assets/css/base.mixins";

  .heading-wrapper {
    display: flex;
    align-items: center;
  }

  .title-heading {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 800;
  }

  .line {
    margin-left: 10px;
    flex-grow: 1;
    height: 4px;
    background-color: $grey-text;
  }
</style>

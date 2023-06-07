<template>
  <div class="heading-wrapper">
    <h1 class="title-heading">{{ name }}</h1>
    <div class="line"></div>
  </div>
</template>

<script>
  export default {
    name: "HeadingLine",
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
    font-size: 2.6rem;
    font-weight: 800;
    text-transform: uppercase;
  }

  .line {
    margin-left: 20px;
    flex-grow: 1;
    height: 4px;
    background-color: $blue-light-1;
    @include position(relative, $bottom: 2px);
  }
</style>

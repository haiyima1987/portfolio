<template>
  <div class="heading-wrapper"
       :style="{ 'background-color': backgroundColor }">
    <h1 class="title-heading">{{ name }}</h1>
  </div>
</template>

<script>
  export default {
    name: "HeadingSolid",
    props: {
      name: {
        type: String
      },
      backgroundColor: {
        type: String
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/css/base.variables";
  @import "../assets/css/base.mixins";

  .heading-wrapper {
    padding: 10px;
    display: flex;
    align-items: center;
    background-color: $green-4;
    text-align: center;
  }

  .title-heading {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 900;
    color: $grey-dark-3;
    text-transform: uppercase;
    flex-grow: 1;
  }

  @media screen and (min-width: $screen-lg) {
    .heading-wrapper {
      padding: 15px;
    }
  }
</style>

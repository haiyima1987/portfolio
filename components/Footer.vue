<template>
  <div class="footer-wrapper">
    Copyright © {{ currentYear }} Haiyi Ma. All Rights Reserved.
  </div>
</template>

<script>
  export default {
    name: "Footer",
    computed: {
      currentYear: function () {
        return new Date().getFullYear()
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/css/base.variables";
  @import "../assets/css/base.mixins";

  .footer-wrapper {
    height: 50px;
    background-color: $grey-dark-3;
    color: white;
    @include flex-center();
  }
</style>

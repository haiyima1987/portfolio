<template>
  <div class="header-wrapper">
    <div class="icon-logo-wrapper">
      <nuxt-link to="/">
        <img class="logo" src="../assets/img/logo-haiyi-inverse.svg" alt="logo">
      </nuxt-link>
    </div>
    <div class="icon-menu-wrapper">
      <font-awesome-icon :icon="['fas', 'bars']"
                         @click="toggleOverlay"
                         class="icon-menu"/>
    </div>
    <transition name="basic">
      <div v-if="isOverlayShown"
           class="overlay-wrapper">
        <div class="icon-cancel-wrapper">
          <font-awesome-icon :icon="['fas', 'times']"
                             @click="toggleOverlay"
                             class="icon-menu"/>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "Header",
    data: () => ({
      isOverlayShown: false
    }),
    methods: {
      toggleOverlay: function () {
        this.isOverlayShown = !this.isOverlayShown;
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/css/base.variables";
  @import "../assets/css/base.mixins";
  @import "../assets/css/transition";

  .header-wrapper {
    height: 60px;
    background-color: $grey-dark;
    @include flex-center();
    @include box-shadow(0, 0, 10px, $grey-shadow-opaque);
  }

  .icon-logo-wrapper {
    padding: 0 20px;
    @include flex-center-horizontal($left: true);
    flex-grow: 1;
  }

  .logo {
    height: 40px;
    width: 40px;
  }

  .icon-menu-wrapper {
    padding: 20px;
    font-size: 1.5rem;
    color: white;
  }

  /* styles for the overlay */
  .overlay-wrapper {
    padding: 15px 20px;
    background-color: white;
    @include position-equal(fixed, 0, $elevation: 50);
  }

  .icon-cancel-wrapper {
    font-size: 1.5rem;
    display: flex;
    justify-content: flex-end;
  }
</style>

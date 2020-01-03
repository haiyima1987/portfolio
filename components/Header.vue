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
        <div class="item-mobile-wrapper">
          <nuxt-link v-for="(mobileItem, index) in mobileItems" :key="index"
                     @click.native="closeOverlay"
                     :to="mobileItem.link"
                     class="button-green-text item-mobile">
            {{ mobileItem.name }}
          </nuxt-link>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "Header",
    data: () => ({
      isOverlayShown: false,
      mobileItems: [{
        name: 'Projects',
        link: '/admin/projects'
      }, {
        name: 'Skills',
        link: '/admin/skills'
      }, {
        name: 'Scopes',
        link: '/admin/scopes'
      }, {
        name: 'Types',
        link: '/admin/types'
      }, {
        name: 'Categories',
        link: '/admin/categories'
      },]
    }),
    methods: {
      toggleOverlay: function () {
        this.isOverlayShown = !this.isOverlayShown
      },
      closeOverlay: function () {
        this.isOverlayShown = false
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
    padding: 0 20px;
    font-size: 1.5rem;
    color: white;

    &:hover {
      cursor: pointer;
    }
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
    color: $green-main;

    &:hover {
      cursor: pointer;
    }
  }

  /* mobile menu item */
  .item-mobile-wrapper {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }

  .item-mobile {
    padding: 10px 0 10px 20px;
    height: auto;
    border-bottom: 1px solid $green-main;
    font-size: 1rem;
    font-weight: 800;
  }
</style>

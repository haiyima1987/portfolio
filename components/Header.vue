<template>
  <div class="header-wrapper">
    <div class="icon-logo-wrapper">
      <nuxt-link to="/" @click.native="setMenuId(1)">
        <img class="logo-image" src="../assets/img/logo-haiyi-inverse.svg" alt="logo">
      </nuxt-link>
    </div>
    <div class="menu-button-group">
      <div class="menu-button-wrapper">
        <nuxt-link v-for="(mobileItem, index) in publicItems" :key="index"
                   @click.native="setMenuId(mobileItem.id)"
                   :to="mobileItem.link"
                   :class="{ 'menu-button-selected': mobileItem.id == selectedMenuId, 'about-button': mobileItem.id == 4 }"
                   class="button-white-text menu-button">
          {{ mobileItem.name }}
        </nuxt-link>
      </div>
    </div>
    <div v-if="isAuthenticated" class="button-logout-wrapper">
      <nuxt-link to="/admin/logout" @click.native="setMenuId(1)"
                 class="button-green-text button-logout">
        <font-awesome-icon :icon="['fas', 'sign-out-alt']"
                           class="icon-menu"/>
      </nuxt-link>
    </div>
    <div v-if="isAuthenticated" class="icon-menu-wrapper-admin">
      <font-awesome-icon :icon="['fas', 'bars']"
                         @click="openOverlay"
                         class="icon-menu"/>
    </div>
    <div v-else class="icon-menu-wrapper">
      <font-awesome-icon :icon="['fas', 'bars']"
                         @click="openOverlay"
                         class="icon-menu"/>
    </div>
    <transition name="basic">
      <HeaderOverlay :is-overlay-shown="isOverlayShown"
                     :on-overlay-close="closeOverlay"/>
    </transition>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import HeaderOverlay from "./HeaderOverlay";
  import {SET_SELECTED_MENU} from "../store/mutations";

  export default {
    name: "Header",
    components: {
      HeaderOverlay
    },
    data: () => ({
      isOverlayShown: false,
      publicItems: [{
        id: 1,
        name: 'Home',
        link: '/'
      }, {
        id: 2,
        name: 'Portfolio',
        link: '/portfolio'
      }, {
        id: 3,
        name: 'Resume',
        link: '/resume'
      }, {
        id: 4,
        name: 'About',
        link: '/about'
      }],
      authItems: [{
        name: 'Portfolio',
        items: [{
          name: 'Projects',
          link: '/admin/projects'
        }, {
          name: 'Types',
          link: '/admin/types'
        }, {
          name: 'Skills',
          link: '/admin/skills'
        }, {
          name: 'Skill scopes',
          link: '/admin/scopes'
        }, {
          name: 'Categories',
          link: '/admin/categories'
        }]
      }, {
        name: 'Resume',
        items: [{
          name: 'Experiences',
          link: '/admin/experiences'
        }, {
          name: 'Educations',
          link: '/admin/educations'
        }, {
          name: 'Personal Info',
          link: '/admin/infos'
        }, {
          name: 'Info types',
          link: '/admin/info-types'
        }]
      }, {
        name: 'Home',
        items: [{
          name: 'Headings',
          link: '/admin/headings'
        }, {
          name: 'Heading Types',
          link: '/admin/heading-types'
        }]
      }]
    }),
    computed: {
      ...mapGetters({
        selectedMenuId: 'getSelectedMenuId',
        isAuthenticated: 'auth/isAuthenticated'
      })
    },
    methods: {
      setMenuId: function (id) {
        this.$store.commit(SET_SELECTED_MENU, id)
      },
      openOverlay: function () {
        this.isOverlayShown = true
      },
      closeOverlay: function () {
        this.isOverlayShown = false
      },
      setMenuIdOnLoad: function () {
        if (process.browser && this.selectedMenuId == -1) {
          let path = window.location.pathname
          let item = this.publicItems.find(item => item.link == path)
          if (!item) return
          this.setMenuId(item.id)
        }
      }
    },
    created() {
      this.setMenuIdOnLoad();
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/css/base.variables";
  @import "../assets/css/base.mixins";
  @import "../assets/css/transition";

  .header-wrapper {
    height: 60px;
    background-color: $grey-opaque-03;
    @include flex-center();
    @include box-shadow(0, 0, 10px, $grey-opaque-21);
  }

  .icon-logo-wrapper {
    padding: 0 20px;
    @include flex-center-horizontal($left: true);
    flex-grow: 1;
  }

  .logo-image {
    height: 40px;
    width: 40px;
  }

  .menu-button-group {
    display: none;
  }

  .menu-button-wrapper {
    display: flex;
  }

  /* logout button */
  .button-logout {
    padding: 0 15px;
    height: 60px;
    line-height: 60px;
    font-size: 1.2rem;
  }

  .icon-menu-wrapper {
    padding: 0 20px;
    font-size: 1.5rem;
    color: white;

    &:hover {
      cursor: pointer;
    }
  }

  .icon-menu-wrapper-admin {
    padding: 0 20px;
    font-size: 1.5rem;
    color: white;

    &:hover {
      cursor: pointer;
    }
  }

  @media screen and (min-width: $screen-md) {
    .icon-logo-wrapper {
      flex-grow: unset;
    }

    .logo {
      height: 40px;
      width: 40px;
    }

    .menu-button-group {
      display: block;
      padding-left: 20px;
      flex-grow: 1;
    }

    .menu-button {
      padding: 0 20px;
      height: 60px;
      line-height: 60px;
    }

    .menu-button-selected {
      background-color: $green-main-1;
      color: $grey-opaque-03;
      font-weight: 800;
    }

    .icon-menu-wrapper {
      display: none;
    }
  }

  @media screen and (min-width: $screen-lg) {
    .about-button {
      display: none;
    }
  }

  @media screen and (min-width: $screen-xl) {
    .icon-logo-wrapper {
      width: 10%;
    }

    .menu-button-group {
      padding-left: 0;
    }
  }
</style>

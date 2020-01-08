<template>
  <div class="header-wrapper">
    <div class="icon-logo-wrapper">
      <nuxt-link to="/">
        <img class="logo" src="../assets/img/logo-haiyi-inverse.svg" alt="logo">
      </nuxt-link>
    </div>
    <div class="menu-button-group">
      <div class="menu-button-wrapper">
        <nuxt-link v-for="(mobileItem, index) in publicItems" :key="index"
                   @click.native="closeOverlay"
                   :to="mobileItem.link"
                   class="button-white-text menu-button">
          {{ mobileItem.name }}
        </nuxt-link>
      </div>
    </div>
    <div class="icon-menu-wrapper">
      <font-awesome-icon :icon="['fas', 'bars']"
                         @click="toggleOverlay"
                         class="icon-menu"/>
    </div>
    <div v-if="isAuthenticated" class="icon-menu-wrapper-admin">
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
        <div v-if="isAuthenticated">
          <div v-for="(itemData, index) in authItems">
            <button @click="showSelectedItems(index)"
                    type="button" class="button button-green button-menu-type">
              {{ itemData.name }}
            </button>
            <transition name="basic">
              <div v-if="index == selectedIndex"
                   class="menu-item-wrapper">
                <nuxt-link v-for="(mobileItem, index) in itemData.items" :key="index"
                           @click.native="closeOverlay"
                           :to="mobileItem.link"
                           class="button-green-text menu-item">
                  {{ mobileItem.name }}
                </nuxt-link>
              </div>
            </transition>
          </div>
        </div>
        <div class="menu-item-wrapper public-item-wrapper">
          <nuxt-link v-for="(mobileItem, index) in publicItems" :key="index"
                     @click.native="closeOverlay"
                     :to="mobileItem.link"
                     class="button-green-text menu-item">
            {{ mobileItem.name }}
          </nuxt-link>
          <nuxt-link v-if="isAuthenticated"
                     @click.native="closeOverlay"
                     to="/admin/logout"
                     class="button-green-text menu-item">
            Logout
          </nuxt-link>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: "Header",
    data: () => ({
      selectedIndex: -1,
      isOverlayShown: false,
      publicItems: [{
        name: 'Portfolio',
        link: '/portfolio'
      }, {
        name: 'Resume',
        link: '/resume'
      }, {
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
        },{
          name: 'Heading Types',
          link: '/admin/heading-types'
        }]
      }]
    }),
    computed: {
      ...mapGetters('auth', {
        isAuthenticated: 'isAuthenticated'
      })
    },
    methods: {
      showSelectedItems: function (index) {
        if (this.selectedIndex != index) {
          this.selectedIndex = index
        } else {
          this.selectedIndex = -1
        }
      },
      toggleOverlay: function () {
        this.isOverlayShown = !this.isOverlayShown
        // close menus
        if (!this.isOverlayShown) {
          this.selectedIndex = -1
        }
      },
      closeOverlay: function () {
        this.isOverlayShown = false
        this.selectedIndex = -1
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
    background-color: $grey-dark-opaque;
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

  .icon-menu-wrapper-admin {
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
  .menu-item-wrapper {
    display: flex;
    flex-wrap: wrap;
  }

  .menu-item {
    padding: 10px 10px 5px 20px;
    height: auto;
    border-bottom: 1px solid $green-main;
    font-size: 1rem;
    font-weight: 800;

    &:nth-of-type(odd) {
      width: 49%;
      margin-right: 1%;
    }

    &:nth-of-type(even) {
      width: 49%;
      margin-left: 1%;
    }
  }

  .button-menu-type {
    margin-top: 20px;
    width: 100%;
    font-weight: bold;
  }

  .public-item-wrapper {
    margin-top: 20px;
  }

  @media screen and (min-width: $screen-md) {
    .icon-logo-wrapper {
      flex-grow: unset;
    }

    .menu-button-group {
      padding-left: 20px;
      flex-grow: 1;
    }

    .menu-button {
      padding: 0 20px;
    }

    .icon-menu-wrapper {
      display: none;
    }
  }

  @media screen and (min-width: $screen-lg) {
  }

  @media screen and (min-width: $screen-xl) {
  }
</style>

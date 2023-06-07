<template>
  <div v-if="isOverlayShown"
       class="overlay-wrapper">
    <div class="icon-cancel-wrapper">
      <font-awesome-icon :icon="['fas', 'times']"
                         @click="closeOverlay"
                         class="icon-menu"/>
    </div>
    <div v-if="isAuthenticated"
         class="auth-item-wrapper">
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
                 @click.native="onPublicItemClicked(mobileItem.id)"
                 :class="{ 'menu-item-selected': mobileItem.id == selectedMenuId, 'about-button': mobileItem.id == 4 }"
                 :to="mobileItem.link"
                 class="menu-item-public">
        {{ mobileItem.name }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import {SET_SELECTED_MENU} from "../store/mutations";

  export default {
    name: "HeaderOverlay",
    props: {
      isOverlayShown: {
        type: Boolean,
        required: true
      },
      onOverlayClose: {
        type: Function,
        required: true
      }
    },
    data: () => ({
      selectedIndex: -1,
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
      showSelectedItems: function (index) {
        if (this.selectedIndex != index) {
          this.selectedIndex = index
        } else {
          this.selectedIndex = -1
        }
      },
      closeOverlay: function () {
        this.onOverlayClose();
        this.selectedIndex = -1
      },
      onPublicItemClicked: function (id) {
        this.closeOverlay()
        this.$store.commit(SET_SELECTED_MENU, id)
      }
    },
    watch: {
      isOverlayShown: function (newVal, oldVal) {
        if (!newVal && oldVal) {
          this.selectedIndex = -1
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/css/base.variables";
  @import "../assets/css/base.mixins";
  @import "../assets/css/transition";

  /* styles for the overlay */
  .overlay-wrapper {
    padding: 15px 20px;
    background-color: white;
    @include position-equal(fixed, 0, $elevation: 500);
  }

  .icon-cancel-wrapper {
    font-size: 2.4rem;
    display: flex;
    justify-content: flex-end;
    color: $green-main-1;

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
    border-bottom: 1px solid $green-main-1;
    font-size: 1.6rem;
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

  .menu-item-public {
    margin-bottom: 10px;
    padding: 10px;
    width: 100%;
    color: $green-main-1;
    font-size: 1.6rem;
    font-weight: 800;
    border: 1px solid $green-main-1;
  }

  .menu-item-selected {
    background-color: $green-main-1;
    color: white;
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
    .menu-item-public {
      display: none;
    }
  }

  @media screen and (min-width: $screen-lg) {
    .about-button {
      display: none;
    }

    .auth-item-wrapper {
      margin-top: 20px;
      @include grid(2, 20px);
    }

    .button-menu-type {
      margin-top: 0;
    }

    .public-item-wrapper {
      @include grid(4, 20px);

      .menu-item {
        margin-left: 0;
        margin-right: 0;
        width: 100%;
      }
    }
  }

  @media screen and (min-width: $screen-xl) {
    .auth-item-wrapper {
      @include grid(3, 20px);
    }
  }
</style>

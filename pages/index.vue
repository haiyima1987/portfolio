<template>
  <div class="home-wrapper">
    <div ref="introTopDisplay"
         class="intro-top-wrapper">
      <transition name="move-right">
        <div v-show="introTopDisplay"
             class="intro-top-group">
          <div v-for="heading in headingTypes[0].headings" :key="heading.id"
               class="heading-wrapper">
            <h1 v-if="heading.title" class="heading">{{ heading.title }}</h1>
            <div v-if="heading.text" class="heading-text">{{ heading.text }}</div>
          </div>
          <div class="intro-button-group">
            <div class="intro-button-wrapper">
              <nuxt-link to="/resume" @click.native="setMenuId(3)"
                         class="button-green button-home">
                Resume
              </nuxt-link>
            </div>
            <div class="intro-button-wrapper">
              <nuxt-link to="/portfolio" @click.native="setMenuId(2)"
                         class="button-green button-home">
                Projects
              </nuxt-link>
            </div>
          </div>
        </div>
      </transition>
      <div ref="introImageDisplay"
           class="image-wrapper">
        <transition name="fade">
          <img v-show="introImageDisplay"
               class="image" @load="onImageLoaded" src="../assets/img/haiyi_home.png" alt="haiyi">
        </transition>
      </div>
    </div>
    <div ref="buttonTopDisplay"
         class="button-top-wrapper">
      <transition name="move-left">
        <div v-if="buttonTopDisplay"
             ref="buttonTopGroup"
             class="button-group">
          <div class="button-wrapper">
            <nuxt-link to="/resume" @click.native="setMenuId(3)"
                       class="button-green button-home">
              Resume
            </nuxt-link>
          </div>
          <div class="button-wrapper">
            <nuxt-link to="/portfolio" @click.native="setMenuId(2)"
                       class="button-green button-home">
              Projects
            </nuxt-link>
          </div>
        </div>
      </transition>
    </div>
    <div ref="introBottomDisplay">
      <transition name="move-up">
        <div v-show="introBottomDisplay"
             class="intro-bottom-wrapper">
          <h1 class="heading">Who I am</h1>
          <div ref="headingBottomDisplay">
            <transition-group name="move-up" tag="div" class="heading-bottom-wrapper">
              <div v-show="headingBottomDisplay"
                   v-for="heading in headingTypes[1].headings" :key="heading.id"
                   class="sub-heading-wrapper">
                <h2 class="sub-heading">{{ heading.title }}</h2>
                <div class="sub-heading-text">{{ heading.text }}</div>
              </div>
            </transition-group>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import {GET_HOME_DATA} from "../store/actions";
  import {SET_LOADING, SET_SELECTED_MENU} from "../store/mutations";

  // display names
  const introTopDisplayName = 'introTopDisplay'
  const introImageDisplayName = 'introImageDisplay'
  const buttonTopDisplayName = 'buttonTopDisplay'
  const introBottomDisplayName = 'introBottomDisplay'
  const headingBottomDisplayName = 'headingBottomDisplay'
  // display arrays
  const initializationDisplays = [introImageDisplayName, introTopDisplayName, buttonTopDisplayName, introBottomDisplayName, introBottomDisplayName, headingBottomDisplayName]
  const contentDisplays = [introBottomDisplayName, headingBottomDisplayName]
  const imageDisplays = [introImageDisplayName]
  const displayOffset = 80

  export default {
    name: 'index',
    layout: 'home',
    data: () => ({
      introTopDisplay: false,
      introImageDisplay: false,
      buttonTopDisplay: false,
      introBottomDisplay: false,
      headingBottomDisplay: false
    }),
    computed: {
      ...mapGetters({
        headingTypes: 'getHeadingTypes',
        windowHeight: 'getWindowHeight'
      })
    },
    methods: {
      setMenuId: function (id) {
        this.$store.commit(SET_SELECTED_MENU, id)
      },
      checkElementDisplay: function (elementName) {
        let displayHeight = window.scrollY + window.innerHeight - displayOffset
        if (!this[elementName]) {
          this[elementName] = displayHeight > this.$refs[elementName].offsetTop
        }
      },
      checkDisplays: function () {
        for (let display of contentDisplays) {
          this.checkElementDisplay(display)
        }
      },
      initializeDisplays: function () {
        for (let display of initializationDisplays) {
          this.checkElementDisplay(display)
        }
      },
      loadImageDisplays: function () {
        this.$store.commit(SET_LOADING, true)
        for (let display of imageDisplays) {
          this.checkElementDisplay(display)
        }
      },
      onImageLoaded: function () {
        this.$store.commit(SET_LOADING, false)
        this.initializeDisplays()
      }
    },
    mounted() {
      this.loadImageDisplays()
      window.addEventListener('scroll', this.checkDisplays)
    },
    async asyncData({store}) {
      return store.dispatch(GET_HOME_DATA)
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/css/base.variables";
  @import "../assets/css/base.mixins";
  @import "../assets/css/transition";

  /* intro top layouts  */
  .intro-top-wrapper {
    background-color: $grey-pale-f;
  }

  .intro-top-group {
    padding: 30px 15px 15px 15px;
  }

  /* main heading */
  .heading-wrapper {
    margin-bottom: 5px;
  }

  .heading {
    font-size: 2.4rem;
    font-weight: bold;
    font-family: 'Raleway', Helvetica, Arial, sans-serif;
  }

  .heading-text {
    color: $grey-medium-9;
    line-height: 1.2rem;
    font-weight: 600;
  }

  /* image */
  .image-wrapper {
    display: flex;
    justify-content: center;
  }

  .image-wrapper {
    overflow: hidden;
  }

  .image {
    width: 100%;
    min-width: 420px;
  }

  /* buttons */
  .button-top-wrapper {
    padding: 30px 15px;
    background-color: $grey-pale-f;
  }

  .button-group {
    display: flex;
    justify-content: space-between;
  }

  .intro-button-group {
    display: none;
  }

  .button-wrapper {
    padding-right: 5px;
    flex-basis: 50%;

    &:first-of-type {
      padding-right: 5px;
    }

    &:last-of-type {
      padding-left: 5px;
    }
  }

  .button-home {
    width: 100%;
    text-transform: uppercase;
    font-weight: bold;
    @include border-radius(25px);
  }

  /* intro bottom wrapper  */
  .intro-bottom-wrapper {
    padding: 30px 15px;
    background-color: $grey-pale-e;
  }

  .heading-bottom-wrapper {
    display: flex;
    flex-direction: column;
  }

  /* sub-heading */
  .sub-heading-wrapper {
    margin-bottom: 15px;
    padding: 5px 10px;
    background-color: white;
    @include border-radius(5px);
    @include box-shadow(0, 0, 20px, rgba(160, 160, 160, 0.5));
  }

  .sub-heading {
    margin: 0;
    padding: 8px;
    font-size: 1.2rem;
    font-weight: bold;
    font-family: 'Raleway', Helvetica, Arial, sans-serif;
    border-bottom: 2px solid $green-main-1;
  }

  .sub-heading-text {
    padding: 8px;
    color: $grey-medium-9;
    font-weight: 600;
  }

  @media screen and (min-width: $screen-md) {
    .intro-top-wrapper {
      padding: 40px;
      position: relative;
    }

    .intro-top-group {
      @include position-elevation(relative, $elevation: 100);
      display: inline-block;
    }

    .intro-button-group {
      padding: 30px 0;
      width: 180px;
      display: block;
    }

    .intro-button-wrapper {
      margin-bottom: 15px;

      &:last-of-type {
        margin-bottom: 0;
      }
    }

    /* selfie image */
    .image-wrapper {
      @include position(absolute, $right: 0, $bottom: 0, $top: 50px);
      width: 75%;
    }

    .image {
      width: unset;
      @include position(absolute, $right: -36px, $bottom: 0);
      max-height: 100%;
    }

    /* buttons below intro top (hidden on big screens) */
    .button-top-wrapper {
      display: none;
    }

    /* headings bottom */
    .intro-bottom-wrapper {
      padding: 40px;
    }

    .heading-bottom-wrapper {
      @include grid(2, 20px);
    }

    .sub-heading-wrapper {
      margin-bottom: 0;
    }
  }

  @media screen and (min-width: $screen-lg) {
    .intro-top-wrapper {
      padding: 40px 8%;
    }

    .heading {
      margin-bottom: 20px;
      font-size: 2.8rem;
    }

    .heading-text {
      font-size: 1.2rem;
    }

    .image {
      right: 0;
    }

    /* headings bottom */
    .intro-bottom-wrapper {
      padding: 40px 8%;
    }
  }

  @media screen and (min-width: $screen-xl) {
    .intro-top-wrapper {
      padding: 120px 10%;
    }

    .heading-text {
      font-size: 1.5rem;
      line-height: 1.8rem;
    }

    .image {
      right: 50%;
      transform: translateX(50%);
    }

    /* intro buttons */
    .intro-button-group {
      width: 220px;
    }

    .button-home {
      height: 50px;
      @include border-radius(25px);
      line-height: 50px;
      font-size: 1.2rem;
    }

    /* headings bottom */
    .intro-bottom-wrapper {
      padding: 80px 10%;
    }

    .heading-bottom-wrapper {
      @include grid(3, 40px);
    }
  }

  @media screen and (min-width: $screen-tv) {
    .home-wrapper {
      display: flex;
      flex-direction: column;
      min-height: calc(100vh - 110px);
    }

    .heading {
      font-size: 3.6rem;
    }

    .heading-text {
      font-size: 1.8rem;
      line-height: 2.0rem;
    }

    .intro-bottom-wrapper {
      flex-grow: 1;
    }

    .sub-heading {
      font-size: 1.8rem;
    }

    .sub-heading-text {
      font-size: 1.5rem;
    }
  }
</style>

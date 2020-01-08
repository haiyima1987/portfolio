<template>
  <div class="home-wrapper">
    <div class="intro-top-wrapper">
      <div class="intro-top-group">
        <div v-for="heading in headingTypes[0].headings" :key="heading.id"
             class="heading-wrapper">
          <h1 v-if="heading.title" class="heading text-white">{{ heading.title }}</h1>
          <div v-if="heading.text" class="heading-text text-white">{{ heading.text }}</div>
        </div>
        <div class="intro-button-group">
          <div class="intro-button-wrapper">
            <nuxt-link to="/resume" class="btn button-white-border button-home">
              Resume
            </nuxt-link>
          </div>
          <div class="intro-button-wrapper">
            <nuxt-link to="/portfolio" class="btn button-white-border button-home">
              Projects
            </nuxt-link>
          </div>
        </div>
      </div>
      <div class="image-box">
        <div class="image-wrapper">
          <img class="image" src="../assets/img/selfie.png" alt="haiyi">
        </div>
      </div>
    </div>
    <div class="button-top-wrapper">
      <div class="button-group">
        <div class="button-wrapper">
          <nuxt-link to="/resume" class="btn button-white-border button-home">
            Resume
          </nuxt-link>
        </div>
        <div class="button-wrapper">
          <nuxt-link to="/portfolio" class="btn button-white-border button-home">
            Projects
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="heading-bottom-wrapper">
      <div v-for="heading in headingTypes[1].headings" :key="heading.id"
           class="sub-heading-wrapper">
        <h2 class="sub-heading">{{ heading.title }}</h2>
        <div class="sub-heading-text">{{ heading.text }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import {GET_HOME_DATA} from "../store/actions";

  export default {
    name: 'index',
    layout: 'home',
    computed: {
      ...mapGetters({
        headingTypes: 'getHeadingTypes'
      })
    },
    async asyncData({store}) {
      return store.dispatch(GET_HOME_DATA)
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/css/base.variables";
  @import "../assets/css/base.mixins";

  /* heading top layouts  */
  .intro-top-wrapper {
    padding: 0 15px;
    background-color: $green-dark;
  }

  .intro-top-group {
    padding-top: 30px;
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
    color: $grey-text-input;
    /*font-size: 1.2rem;*/
    line-height: 1.2rem;
    font-weight: 600;
  }

  /* image */
  .image-box {
    padding: 20px;
    display: flex;
    justify-content: center;
  }

  .image-wrapper {
    width: 200px;
    @include border-radius(50%);
    overflow: hidden;

    .image {
      width: 100%;
    }
  }

  /* heading top wrapper  */
  .heading-bottom-wrapper {
    padding: 30px 15px;
    display: flex;
    flex-direction: column;
  }

  /* sub-heading */
  .sub-heading-wrapper {
    margin-bottom: 15px;
    padding: 5px 10px;
    @include border-radius(5px);
    @include box-shadow(0, 0, 20px, rgba(160, 160, 160, 0.5));
  }

  .sub-heading {
    margin: 0;
    padding: 8px;
    font-size: 1.2rem;
    font-weight: bold;
    font-family: 'Raleway', Helvetica, Arial, sans-serif;
    border-bottom: 2px solid $green-main;
  }

  .sub-heading-text {
    padding: 8px;
    color: $grey-text-input;
    font-weight: 600;
  }

  /* buttons */
  .button-top-wrapper {
    padding: 15px;
    background-color: $green-dark;
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
    @include border-radius(25px);
  }

  @media screen and (min-width: $screen-md) {
    .intro-top-wrapper {
      padding: 40px;
      display: flex;
      align-items: center;
    }

    .intro-top-group {
      flex-basis: 60%;
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

    .button-top-wrapper {
      display: none;
    }

    /* headings bottom */
    .heading-bottom-wrapper {
      padding: 40px;
      @include grid(2, 20px);
    }

    .sub-heading-wrapper {
      margin-bottom: 0;
    }
  }

  @media screen and (min-width: $screen-lg) {
  }

  @media screen and (min-width: $screen-xl) {
  }
</style>

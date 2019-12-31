<template>
  <div class="home-wrapper">
    <h1 class="heading">Haiyi Ma</h1>
    <p class="text-description">My name is Haiyi. I am a full-stack developer.</p>
    <div class="button-group">
      <div class="button-wrapper">
        <nuxt-link to="/resume" class="btn button-green-main button-home">
          Resume
        </nuxt-link>
      </div>
      <div class="button-wrapper">
        <nuxt-link to="/portfolio" class="btn button-green-main button-home">
          Projects
        </nuxt-link>
      </div>
    </div>
    <h2 class="sub-heading">Front-end Developer</h2>
    <p class="text-description">
      A front-end developer who possesses skills in HTML5, CSS, JavaScript, and major JavaScript frameworks (Vue, React,
      and Angular).
    </p>
    <h2 class="sub-heading">Back-end Developer</h2>
    <p class="text-description">
      A back-end developer who focuses on back-end technologies such as PHP, MySQL, and MongoDB.
    </p>
  </div>
</template>

<script>
  export default {
    asyncData: function () {
      return new Promise((resolve, reject) => {
        return resolve({name: 'Portfolio'})
      })
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/css/base.variables";
  @import "../assets/css/base.mixins";

  /* text */
  .heading {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .sub-heading {
    font-size: 1.2rem;
    font-weight: 600;
  }

  .text-description {
    color: $grey-text-input;
    font-weight: 600;
  }

  /* buttons */
  .button-group {
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
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
  }
</style>

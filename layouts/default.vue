<template>
  <div>
    <Header/>
    <div class="page-wrapper">
      <nuxt/>
    </div>
    <div class="spinner" v-show="isLoading">
      <font-awesome-icon :icon="['fa', 'spinner']"/>
    </div>
    <MessageModal/>
  </div>
</template>

<script>
  import Header from '~/components/Header.vue'
  import MessageModal from "../components/MessageModal.vue";
  import {mapGetters} from "vuex";

  export default {
    components: {
      Header, MessageModal
    },
    computed: {
      ...mapGetters({
        isLoading: 'isLoading'
      })
    }
  }
</script>

<style lang="scss">
  @import "../assets/css/layout.shared";

  .page-wrapper {
    padding: 30px 15px;
  }

  /*ux element styles*/
  .spinner {
    height: 50px;
    width: 50px;
    @include center-element-fixed();
    z-index: 500;

    .fa-spinner {
      position: relative;
      width: 50px;
      height: 50px;
      color: $green-main;
    }
  }

  /* Define an animation behavior */
  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }

  /* This is the class name given by the Font Awesome component when icon contains 'spinner' */
  .fa-spinner {
    /* Apply 'spinner' keyframes looping once every second (1s)  */
    animation: spinner 1.5s linear infinite;
  }
</style>

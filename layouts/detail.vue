<template>
  <div>
    <Header/>
    <div class="page-wrapper">
      <div class="back-wrapper">
        <button @click="redirectBack"
                type="button" class="button button-green-text button-back">
          <font-awesome-icon :icon="['fas', 'arrow-circle-left']" class="icon-menu"/>
          <span class="text-back">Back</span>
        </button>
      </div>
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
  import MessageModal from "../components/element/MessageModal.vue";
  import {mapGetters} from "vuex";
  import {CLEAR_FORM_DATA} from "../store/mutations";

  export default {
    components: {
      Header, MessageModal
    },
    computed: {
      ...mapGetters({
        isLoading: 'isLoading'
      })
    },
    methods: {
      redirectBack: function () {
        this.$router.back()
      }
    },
    watch: {
      $route: function () {
        this.$store.commit(CLEAR_FORM_DATA)
      }
    }
  }
</script>

<style lang="scss">
  @import "../assets/css/layout.shared";

  .page-wrapper {
    padding: 30px 15px;
  }

  .back-wrapper {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  }

  .button-back {
    height: auto;
    padding: 0 15px;
    font-size: 1.5rem;
    display: flex;
    align-items: center;

    .text-back {
      margin-left: 8px;
      color: $green-main;
      font-size: 1rem;
    }
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

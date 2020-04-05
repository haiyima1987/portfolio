<template>
  <div class="full-page-wrapper">
    <Header/>
    <div class="page-wrapper page-wrapper-default">
      <nuxt/>
    </div>
    <Footer/>
    <div class="spinner" v-show="isLoading">
      <font-awesome-icon :icon="['fa', 'spinner']"/>
    </div>
    <MessageModal/>
  </div>
</template>

<script>
  import Header from '../components/Header.vue'
  import Footer from "../components/Footer";
  import MessageModal from "../components/element/MessageModal.vue";
  import {mapGetters} from "vuex";
  import {CLEAR_FORM_DATA} from "../store/mutations";

  export default {
    components: {
      Header, Footer, MessageModal
    },
    computed: {
      ...mapGetters({
        isLoading: 'isLoading'
      })
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
  @import "../assets/css/animation.observer";

  .page-wrapper-default {
    padding: 30px 15px;
  }

  .title-wrapper {
    margin: 0 0 30px 0;
    display: flex;
    align-items: center;
  }

  @media screen and (min-width: $screen-md) {
    .page-wrapper-default {
      padding: 30px 40px;
    }
  }

  @media screen and (min-width: $screen-lg) {
    .page-wrapper-default {
      padding: 30px 8%;
    }
  }

  @media screen and (min-width: $screen-xl) {
    .page-wrapper-default {
      padding: 40px 10% 90px 10%;
    }
  }
</style>

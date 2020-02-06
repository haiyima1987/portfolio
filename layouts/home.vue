<template>
  <div class="full-page-wrapper">
    <Header/>
    <div class="page-wrapper">
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
  import {CLEAR_FORM_DATA, SET_WINDOW_HEIGHT} from "../store/mutations";

  export default {
    head: {
      bodyAttrs: {
        class: "home-class"
      }
    },
    components: {
      Header, Footer, MessageModal
    },
    computed: {
      ...mapGetters({
        isLoading: 'isLoading'
      })
    },
    mounted() {
      this.$store.commit(SET_WINDOW_HEIGHT);
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

  .home-class {
  }
</style>

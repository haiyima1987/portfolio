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
  import MessageModal from "../components/element/MessageModal.vue";
  import {mapGetters} from "vuex";
  import {CLEAR_FORM_DATA} from "../store/mutations";

  export default {
    head: {
      bodyAttrs: {
        class: "home-class"
      }
    },
    components: {
      Header, MessageModal
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

  .home-class {
  }
</style>

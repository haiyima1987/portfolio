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
    head: {
      bodyAttrs: {
        class: "detail-class"
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

  .detail-class {
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
  }

  @media screen and (min-width: $screen-md) {
    .detail-class {
      .page-wrapper {
        padding: 30px 40px;
      }
    }
  }
</style>

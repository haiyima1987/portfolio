<template>
  <div v-if="appMessage" class="message-modal"
       :class="{ 'is-error': appMessage.isError }"
       @click="hideMessageModal">
    {{ appMessage.message }}
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import {CLEAR_APP_MESSAGE} from "../../store/mutations";

  export default {
    name: 'MessageModal',
    data: () => ({
      messageTimer: 0,
      hidingDelay: 2000,
    }),
    computed: {
      ...mapGetters({
        appMessage: 'getAppMessage'
      })
    },
    methods: {
      hideMessageModal() {
        this.$store.commit(CLEAR_APP_MESSAGE)
      },
    },
    watch: {
      appMessage: function (newVal) {
        if (newVal && !newVal.isPersistent) {
          this.messageTimer = setTimeout(this.hideMessageModal, this.hidingDelay)
        }
      }
    },
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/base.variables";
  @import "../../assets/css/base.mixins";

  .message-modal {
    padding: 10px 20px;
    max-width: 360px;
    @include center-element-fixed();
    z-index: 2000;
    color: $green-main-1;
    font-weight: bold;
    background-color: white;
    @include border-radius(5px);
    border: 1px solid $green-main-1;
    @include box-shadow(0, 0, 20px, rgba(215, 215, 215, 0.5));

    &:hover {
      cursor: pointer;
    }
  }

  .is-error {
    color: $red-main;
    background-color: white;
    border: 1px solid $red-main;
  }
</style>

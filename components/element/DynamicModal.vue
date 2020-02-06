<template>
  <div v-if="isShown" class="overlay-panel-background">
    <div class="overlay-panel">
      <div class="overlay-panel-wrapper">
        <h4 class="panel-title">Delete {{ modalOptions.modalContent }}</h4>
        <div class="panel-text">Are you sure?</div>
        <!--submit button group-->
        <div class="button-submit-group">
          <!--left button-->
          <div class="button-wrapper">
            <button @click="closePanel"
                    class="button-panel button-white">Cancel
            </button>
          </div>
          <!--right button-->
          <div class="button-wrapper">
            <button @click="executeCallback"
                    class="button-panel button-red">OK
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import {RESET_MODAL_DATA} from "../../store/mutations";

  export default {
    name: 'DynamicModal',
    computed: {
      ...mapGetters({
        isShown: 'isModalShown',
        modalOptions: 'getModalOptions'
      })
    },
    methods: {
      closePanel: function () {
        this.$store.commit(RESET_MODAL_DATA)
      },
      executeCallback: function () {
        if (this.modalOptions.data) {
          this.modalOptions.callback(this.modalOptions.data)
        } else {
          this.modalOptions.callback()
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/base.variables";
  @import "../../assets/css/base.mixins";

  .overlay-panel-background {
    background-color: $grey-opaque-19;
    @include position(fixed, $top: 0, $right: 0, $bottom: 0, $left: 0);
    @include flex-center();
    z-index: 100;

    .overlay-panel {
      padding: 20px;
      background-color: white;
      @include border-radius(10px);
      text-align: center;
      position: relative;
    }
  }

  .panel-title {
    font-weight: bold;
  }

  .button-submit-group {
    padding-top: 40px;
    display: flex;
  }

  .button-wrapper {
    padding: 0 10px;
    flex-basis: 50%;
  }

  .button-panel {
    width: 100px;
  }
</style>

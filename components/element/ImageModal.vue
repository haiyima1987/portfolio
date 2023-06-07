<template>
  <div v-if="previewProject"
       @click="clearImagePreview"
       class="image-preview-overlay">
    <transition name="image-preview">
      <div v-if="isSlidingActive"
           class="image-preview-wrapper">
        <div class="icon-cancel-wrapper">
          <font-awesome-icon :icon="['fas', 'times']"
                             @click="clearImagePreview"
                             class="icon-menu"/>
        </div>
        <img class="image-preview" :src="previewProject.previewLink" alt="preview">
        <div class="description">{{previewProject.description}}</div>
      </div>
    </transition>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import {CLEAR_PREVIEW_PROJECT} from "../../store/mutations";

  const inactiveDelay = 200;
  const activeDelay = 100;

  export default {
    name: "ImageModal",
    data: () => ({
      isSlidingActive: false
    }),
    computed: {
      ...mapGetters({
        previewProject: 'getPreviewProject'
      })
    },
    methods: {
      clearImagePreview: function () {
        this.isSlidingActive = false
        setTimeout(() => {
          this.$store.commit(CLEAR_PREVIEW_PROJECT)
        }, inactiveDelay)
      }
    },
    watch: {
      previewProject: function (newVal, oldVal) {
        if (newVal && !oldVal) {
          setTimeout(() => {
            this.isSlidingActive = true;
          }, activeDelay)
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/base.variables";
  @import "../../assets/css/base.mixins";
  @import "../../assets/css/transition";

  .image-preview-overlay {
    background-color: $grey-opaque-07;
    @include position-equal(fixed, 0, $elevation: 200);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .image-preview-wrapper {
    width: calc(100% - 4px);
    max-width: 900px;
    max-height: calc(100% - 4px);
    background-color: white;
    @include border-radius(10px);
    overflow: hidden;
    overflow-y: scroll;
    position: relative;

    &::-webkit-scrollbar {
      width: 0.1px;
    }
  }

  .image-preview {
    width: 100%;
  }

  .icon-cancel-wrapper {
    font-size: 2.4rem;
    color: $green-main-1;
    @include position(absolute, $top: 5px, $right: 15px);

    &:hover {
      cursor: pointer;
    }
  }

  .description {
    padding: 10px 20px;
  }
</style>

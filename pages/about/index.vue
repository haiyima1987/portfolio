<template>
  <div ref="contentDisplay">
    <transition name="move-right">
      <ContactInfo v-show="contentDisplay"/>
    </transition>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import {GET_ABOUT_DATA} from "../../store/actions";
  import ContactInfo from "../../components/ContactInfo";

  const contentDisplayName = 'contentDisplay'
  const initializationDisplays = [contentDisplayName]
  const displayOffset = 60

  export default {
    name: "index",
    data: () => ({
      contentDisplay: false
    }),
    components: {
      ContactInfo
    },
    computed: {
      ...mapGetters({
        infoTypes: 'getInfoTypes'
      })
    },
    methods: {
      isLink: function (value) {
        return value.includes('http')
      },
      checkElementDisplay: function (elementName) {
        let displayHeight = window.scrollY + window.innerHeight - displayOffset
        if (!this[elementName]) {
          this[elementName] = displayHeight > this.$refs[elementName].offsetTop
        }
      },
      initializeDisplays: function () {
        for (let display of initializationDisplays) {
          this.checkElementDisplay(display)
        }
      }
    },
    mounted() {
      this.initializeDisplays()
    },
    async asyncData({store}) {
      return store.dispatch(GET_ABOUT_DATA)
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/base.variables";
  @import "../../assets/css/base.mixins";
  @import "../../assets/css/transition";

  .content-wrapper {
    padding: 30px 0;
  }

  .item-wrapper {
    margin-bottom: 8px;
  }

  @media screen and (min-width: $screen-lg) {
    .about-left {
      width: 85%;
    }
  }

  @media screen and (min-width: $screen-xl) {
    .about-left {
      width: 75%;
    }
  }
</style>

<template>
  <ContactInfo/>
</template>

<script>
  import {mapGetters} from "vuex";
  import {GET_ABOUT_DATA} from "../../store/actions";
  import ContactInfo from "../../components/ContactInfo";
  import {observerMixin} from "../../mixins/observerMixin";

  export default {
    name: "index",
    data: () => ({
      contentDisplay: false
    }),
    mixins: [observerMixin],
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
      }
    },
    async asyncData({store}) {
      return store.dispatch(GET_ABOUT_DATA)
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/base.variables";
  @import "../../assets/css/base.mixins";

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

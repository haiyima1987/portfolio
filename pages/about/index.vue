<template>
  <div>
    <div v-for="infoType in infoTypes" :key="infoType.id">
      <Heading :name="infoType.name"/>
      <div class="content-wrapper">
        <div v-for="info in infoType.infos" :key="info.id"
             class="item-wrapper">
          <div v-if="info.key" class="text-item">
            {{ info.key }}:&nbsp;
            <a v-if="isLink(info.value)" :href="info.value" target="_blank">{{ info.value }}</a>
            <template v-else>{{ info.value }}</template>
          </div>
          <div v-else class="text-item">{{ info.value }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import {GET_ABOUT_DATA} from "../../store/actions";
  import Heading from "../../components/Heading";

  export default {
    name: "index",
    components: {
      Heading
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
  .content-wrapper {
    padding: 10px 15px;
  }

  .item-wrapper {
    margin-bottom: 8px;
  }
</style>

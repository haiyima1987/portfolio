<template>
  <div class="contact-wrapper">
    <div class="image-wrapper">
      <img class="image" src="../assets/img/selfie_red_square.png" alt="selfie">
    </div>
    <div v-for="(infoType, index) in infoTypes" :key="infoType.id">
      <HeadingSolid :name="infoType.name"
                    :background-color="backColors[index % infoTypes.length]"/>
      <div class="content-wrapper">
        <div v-for="info in infoType.infos" :key="info.id"
             class="item-wrapper">
          <div v-if="info.key" class="text-item">
            {{ info.key }}:&nbsp;
            <a v-if="isLink(info.value)" :href="info.value" class="page-url" target="_blank">
              {{ simplifyLink(info.value) }}
            </a>
            <template v-else>{{ info.value }}</template>
          </div>
          <div v-else class="text-item">{{ info.value }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import HeadingSolid from "./HeadingSolid";
  import {mapGetters} from "vuex";

  const PROTOCOL_HTTP = 'http';
  const PROTOCOL_HTTPS = 'https';

  export default {
    name: "ContactInfo",
    components: {
      HeadingSolid
    },
    data: () => ({
      backColors: ['#3F9CD7', '#37B553', '#D12741', '#E2763F']
    }),
    computed: {
      ...mapGetters({
        infoTypes: 'getInfoTypes'
      })
    },
    methods: {
      isLink: function (value) {
        return value.includes(PROTOCOL_HTTP)
      },
      simplifyLink: function (value) {
        if (value.includes(PROTOCOL_HTTPS)) {
          return value.substr(`${PROTOCOL_HTTPS}://`.length)
        } else if (value.includes(PROTOCOL_HTTP)) {
          return value.substr(`${PROTOCOL_HTTP}://`.length)
        }
        return value
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/css/base.variables";
  @import "../assets/css/base.mixins";

  .contact-wrapper {
    padding-top: 30px;
    background-color: $grey-opaque-03;
  }

  .image-wrapper {
    width: 100%;
    text-align: center;
  }

  .image {
    width: 80%;
    max-width: 320px;
  }

  .content-wrapper {
    padding: 20px;
  }

  .item-wrapper {
    margin-bottom: 8px;
  }

  .text-item {
    color: white;
  }

  .page-url {
    color: $blue-light-1;
    font-weight: 600;
  }
</style>

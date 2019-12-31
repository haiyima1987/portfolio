<template>
  <div class="element-group">
    <h3 v-if="!!fieldTitle"
        :class="titleClass">
      {{fieldTitle}}
    </h3>
    <div class="field-wrapper"
         :style="{ 'margin': fieldMargin }"
         v-for="(value, index) in iterator" :key="index">
      <h3 v-if="!!itemTitle"
          :class="titleClass">
        {{`${itemTitle} ${index + 1 + indexOffset}`}}
      </h3>
      <div class="option-wrapper">
        <slot name="option"
              :displayIndex="index + indexOffset"/>
        <div v-if="index + 1 > min"
             @click="deleteOption(index)"
             class="button-del-wrapper">
          <slot name="buttonDel"
                :displayIndex="index + indexOffset"/>
        </div>
      </div>
    </div>
    <div class="button-add-wrapper"
         @click="addOption">
      <slot name="buttonAdd"/>
    </div>
  </div>
</template>

<script>
  import {REMOVE_FORM_DATA_BY_NAME} from "../../store/mutations";

  export default {
    name: 'FieldGroup',
    props: {
      // required
      fieldTitle: {
        required: true
      },
      fieldName: {
        required: true
      },
      min: {
        required: true
      },
      max: {
        required: true
      },
      // not required
      titleClass: {
        default: 'form-input-title'
      },
      itemTitle: {
        required: false
      },
      indexOffset: {
        default: 0
      },
      fieldMargin: {
        default: '10px 0'
      },
      groupName: {
        required: false
      },
      value: {
        required: false
      }
    },
    inject: ['$validator'],
    data: () => ({
      iterator: []
    }),
    methods: {
      addOption: function () {
        if (this.iterator.length < this.$props.max) {
          this.iterator = this.iterator.concat([this.iterator.length])
        }
      },
      deleteOption: function (index) {
        if (this.iterator.length > this.$props.min) {
          this.iterator.splice(index, 1)
          this.$store.commit(REMOVE_FORM_DATA_BY_NAME, {
            groupName: this.$props.groupName,
            index
          })
        }
      },
      initializeIterator: function () {
        let total = this.$props.min
        if (this.$props.value) {
          total = this.$props.value
        }
        // make an array with a length of the total, the index is used, the value doesn't matter
        this.iterator = Array.from(Array(total).keys())
      }
    },
    mounted() {
      this.initializeIterator()
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/base.variables";
  @import "../../assets/css/base.mixins";

  .form-group {
    margin: 0;
    padding: 0;
  }

  label {
    margin: 0;
    padding: 0;
  }

  .option-wrapper {
    position: relative;
  }

  .button-add-wrapper {
    width: fit-content;
  }

  .button-del-wrapper {
    @include position(absolute, $top: 50%, $left: 100%);
    @include translate(20%, -50%);
  }
</style>

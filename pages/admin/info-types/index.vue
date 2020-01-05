<template>
  <div class="info-type-list-wrapper">
    <div class="title-wrapper">
      <h4 class="title-page">Information types</h4>
      <nuxt-link to="/admin/info-types/create" class="button button-green">
        <font-awesome-icon :icon="['fa', 'plus']"/>
      </nuxt-link>
    </div>
    <FormWrapper :send-form-data="updateInfoTypes" class="update-info-type-form">
      <DragList :drag-items="domInfoTypes"
                :header-height="60"
                :on-edit-click="editInfoType"
                :on-delete-click="showDeleteModal">
        <template v-slot:item="{ item }">
          <h5 class="title-item">{{ item.infoType.name }}</h5>
        </template>
        <template v-slot:buttonUp>
          <button type="button" class="button-mobile button-blue">
            <font-awesome-icon :icon="['fa', 'arrow-up']"/>
          </button>
        </template>
        <template v-slot:buttonDown>
          <button type="button" class="button-mobile button-blue">
            <font-awesome-icon :icon="['fa', 'arrow-down']"/>
          </button>
        </template>
        <template v-slot:buttonDrag>
          <button type="button" class="button button-blue">
            <font-awesome-icon :icon="['fas', 'arrows-alt']"/>
          </button>
        </template>
        <template v-slot:buttonEdit>
          <button type="button" class="button button-green">
            <font-awesome-icon :icon="['fas', 'edit']"/>
          </button>
        </template>
        <template v-slot:buttonDelete>
          <button type="button" class="button button-red">
            <font-awesome-icon :icon="['fas', 'trash-alt']"/>
          </button>
        </template>
      </DragList>
      <div class="button-submit-wrapper">
        <button type="submit" class="button-green button-save">
          SAVE
        </button>
      </div>
    </FormWrapper>
    <DynamicModal/>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import InputField from "../../../components/form/InputField";
  import FormWrapper from "../../../components/form/FormWrapper";
  import NumberField from "../../../components/form/NumberField";
  import DomInfoType from "../../../models/DomInfoType";
  import {RESET_MODAL_DATA, SET_MODAL_DATA} from "../../../store/mutations";
  import DynamicModal from "../../../components/element/DynamicModal";
  import DragList from "../../../components/element/DragList";
  import {SHORT_MONTHS} from "../../../utils/DomHandler";
  import {DELETE_INFO_TYPE, GET_INFO_TYPES, UPDATE_INFO_TYPE_DISPLAY_INDEX} from "../../../store/info/actions";

  export default {
    name: 'index',
    middleware: 'authenticated',
    components: {
      FormWrapper, InputField, NumberField, DragList, DynamicModal
    },
    data: () => ({
      domInfoTypes: []
    }),
    computed: {
      ...mapGetters('infoType', {
        infoTypes: 'getInfoTypes'
      })
    },
    methods: {
      async updateInfoTypes() {
        // update display indexes
        let updatedInfoTypes = this.domInfoTypes.map((domInfoType, index) => ({
          id: domInfoType.id,
          displayIndex: index + 1
        }))
        // send request
        await this.$store.dispatch(UPDATE_INFO_TYPE_DISPLAY_INDEX, updatedInfoTypes)
      },
      editInfoType: function (id) {
        return this.$router.push({path: `/admin/info-types/edit/${id}`})
      },
      showDeleteModal: function (id) {
        this.$store.commit(SET_MODAL_DATA, {
          modalContent: 'infoType',
          data: id,
          callback: this.deleteInfoType
        })
      },
      async deleteInfoType(id) {
        let infoTypes = await this.$store.dispatch(DELETE_INFO_TYPE, id)
        if (infoTypes) {
          // update local infoTypes
          this.domInfoTypes = infoTypes.map(infoType => new DomInfoType(infoType.id, infoType))
          // close the modal and reset the options
          this.$store.commit(RESET_MODAL_DATA)
        }
      }
    },
    async asyncData({store}) {
      let infoTypes = await store.dispatch(GET_INFO_TYPES);
      if (infoTypes) {
        return {domInfoTypes: infoTypes.map(infoType => new DomInfoType(infoType.id, infoType))}
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/css/base.variables";
  @import "../../../assets/css/base.mixins";

  .title-page {
    margin: 0;
    flex-grow: 1;
  }

  .title-item {
    font-weight: bold;
  }

  .text-item {
    margin-bottom: 5px;
  }
</style>

<template>
  <div class="type-list-wrapper">
    <div class="title-wrapper">
      <h4 class="title-page">Project types</h4>
      <nuxt-link to="/admin/types/create" class="button button-green">
        <font-awesome-icon :icon="['fa', 'plus']"/>
      </nuxt-link>
    </div>
    <FormWrapper :send-form-data="updateTypes" class="update-type-form">
      <DragList :drag-items="domTypes"
                :header-height="60"
                :on-delete-click="showDeleteModal">
        <template v-slot:item="{ item }">
          <InputField
            class="name-wrapper"
            :field-title="''"
            :field-name="`name-${item.id}`"
            :rule="'required'"
            :type="'text'"
            :value="item.type.name"
            :placeholder="'Enter project type'">
          </InputField>
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
  import DragList from "../../../components/element/DragList";
  import DynamicModal from "../../../components/element/DynamicModal";
  import {DELETE_TYPE, GET_TYPES, UPDATE_TYPES} from "../../../store/admin/actions";
  import {RESET_MODAL_DATA, SET_MODAL_DATA} from "../../../store/mutations";
  import FormWrapper from "../../../components/form/FormWrapper";
  import DomType from "../../../models/DomType";

  export default {
    name: "index",
    middleware: 'authenticated',
    components: {
      FormWrapper, InputField, DragList, DynamicModal
    },
    data: () => ({
      domTypes: []
    }),
    computed: {
      ...mapGetters('admin', {
        types: 'getTypes'
      })
    },
    methods: {
      async updateTypes(data) {
        // update display indexes
        let updatedTypes = this.domTypes.map((domType, index) => {
          // assign a new object to avoid mutating outside vuex store
          let type = Object.assign({}, domType.type)
          type.name = data[`name-${type.id}`]
          type.displayIndex = index + 1
          return type
        })
        // send request
        let types = await this.$store.dispatch(UPDATE_TYPES, updatedTypes)
        if (types) {
          this.domTypes = types.map(type => new DomType(type.id, type))
        }
      },
      showDeleteModal: function (id) {
        this.$store.commit(SET_MODAL_DATA, {
          modalContent: 'type',
          data: id,
          callback: this.deleteType
        })
      },
      async deleteType(id) {
        let types = await this.$store.dispatch(DELETE_TYPE, id)
        if (types) {
          // update local types
          this.domTypes = types.map(type => new DomType(type.id, type))
          // close the modal and reset the options
          this.$store.commit(RESET_MODAL_DATA)
        }
      }
    },
    async asyncData({store}) {
      let types = await store.dispatch(GET_TYPES);
      if (types) {
        return {domTypes: types.map(type => new DomType(type.id, type))}
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/css/base.variables";
  @import "../../../assets/css/base.mixins";

  .title-wrapper {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
  }

  .title-page {
    margin: 0;
    flex-grow: 1;
  }

  .name-wrapper {
    margin: 0;
  }
</style>

<template>
  <div class="scope-list-wrapper">
    <div class="title-wrapper">
      <h4 class="title-page">Skill scopes</h4>
      <nuxt-link to="/admin/scopes/create" class="button button-green">
        <font-awesome-icon :icon="['fa', 'plus']"/>
      </nuxt-link>
    </div>
    <FormWrapper :send-form-data="updateScopes" class="update-scope-form">
      <DragList :drag-items="domScopes"
                :header-height="60"
                :on-delete-click="showDeleteModal">
        <template v-slot:item="{ item }">
          <InputField
            class="name-wrapper"
            :field-title="''"
            :field-name="`name-${item.id}`"
            :rule="'required'"
            :type="'text'"
            :value="item.scope.name"
            :placeholder="'Enter skill scope'">
          </InputField>
          <div class="tag-wrapper">
            <div class="tag" v-for="skill in item.scope.skills" :key="skill.id">
              {{ skill.name }}
            </div>
          </div>
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
  import {DELETE_SCOPE, GET_SCOPES, UPDATE_SCOPES} from "../../../store/admin/actions";
  import {RESET_MODAL_DATA, SET_MODAL_DATA} from "../../../store/mutations";
  import FormWrapper from "../../../components/form/FormWrapper";
  import DomScope from "../../../models/dom/DomScope";

  export default {
    name: "index",
    middleware: 'authenticated',
    components: {
      FormWrapper, InputField, DragList, DynamicModal
    },
    data: () => ({
      domScopes: []
    }),
    computed: {
      ...mapGetters('admin', {
        scopes: 'getScopes'
      })
    },
    methods: {
      async updateScopes(data) {
        // update display indexes
        let updatedScopes = this.domScopes.map((domScope, index) => {
          // assign a new object to avoid mutating outside vuex store
          let scope = Object.assign({}, domScope.scope)
          scope.name = data[`name-${scope.id}`]
          scope.displayIndex = index + 1
          return scope
        })
        // send request
        let scopes = await this.$store.dispatch(UPDATE_SCOPES, updatedScopes)
        if (scopes) {
          this.domScopes = scopes.map(scope => new DomScope(scope.id, scope))
        }
      },
      showDeleteModal: function (id) {
        this.$store.commit(SET_MODAL_DATA, {
          modalContent: 'scope',
          data: id,
          callback: this.deleteScope
        })
      },
      async deleteScope(id) {
        let scopes = await this.$store.dispatch(DELETE_SCOPE, id)
        if (scopes) {
          // update local scopes
          this.domScopes = scopes.map(scope => new DomScope(scope.id, scope))
          // close the modal and reset the options
          this.$store.commit(RESET_MODAL_DATA)
        }
      }
    },
    async asyncData({store}) {
      let scopes = await store.dispatch(GET_SCOPES);
      if (scopes) {
        return {domScopes: scopes.map(scope => new DomScope(scope.id, scope))}
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

  .name-wrapper {
    margin: 0;
  }

  /* tags */
  .tag-wrapper {
    padding: 5px 0 10px 0;
  }

  .tag {
    margin: 0 8px 4px 0;
    padding: 2px 8px;
    display: inline-block;
    background-color: $green-main-1;
    color: white;
    @include border-radius(4px);
    font-size: 0.8rem;
    font-weight: 600;
  }
</style>

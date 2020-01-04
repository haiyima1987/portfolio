<template>
  <div class="category-list-wrapper">
    <div class="title-wrapper">
      <h4 class="title-page">Categories</h4>
      <nuxt-link to="/admin/categories/create" class="button button-green">
        <font-awesome-icon :icon="['fa', 'plus']"/>
      </nuxt-link>
    </div>
    <FormWrapper :send-form-data="updateCategories" class="update-category-form">
      <DragList :drag-items="domCategories"
                :header-height="60"
                :on-delete-click="showDeleteModal">
        <template v-slot:item="{ item }">
          <InputField
            class="name-wrapper"
            :field-title="''"
            :field-name="`name-${item.id}`"
            :rule="'required'"
            :type="'text'"
            :value="item.category.name"
            :placeholder="'Enter project category'">
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
  import {DELETE_CATEGORY, GET_CATEGORIES, UPDATE_CATEGORIES} from "../../../store/admin/actions";
  import {RESET_MODAL_DATA, SET_MODAL_DATA} from "../../../store/mutations";
  import FormWrapper from "../../../components/form/FormWrapper";
  import DomCategory from "../../../models/DomCategory";

  export default {
    name: "index",
    middleware: 'authenticated',
    components: {
      FormWrapper, InputField, DragList, DynamicModal
    },
    data: () => ({
      domCategories: []
    }),
    computed: {
      ...mapGetters('admin', {
        categories: 'getCategories'
      })
    },
    methods: {
      async updateCategories(data) {
        // update display indexes
        let updatedCategories = this.domCategories.map((domCategory, index) => {
          // assign a new object to avoid mutating outside vuex store
          let category = Object.assign({}, domCategory.category)
          category.name = data[`name-${category.id}`]
          category.displayIndex = index + 1
          return category
        })
        // send request
        let categories = await this.$store.dispatch(UPDATE_CATEGORIES, updatedCategories)
        if (categories) {
          this.domCategories = categories.map(category => new DomCategory(category.id, category))
        }
      },
      showDeleteModal: function (id) {
        this.$store.commit(SET_MODAL_DATA, {
          modalContent: 'category',
          data: id,
          callback: this.deleteCategory
        })
      },
      async deleteCategory(id) {
        let categories = await this.$store.dispatch(DELETE_CATEGORY, id)
        if (categories) {
          // update local categories
          this.domCategories = categories.map(category => new DomCategory(category.id, category))
          // close the modal and reset the options
          this.$store.commit(RESET_MODAL_DATA)
        }
      }
    },
    async asyncData({store}) {
      let categories = await store.dispatch(GET_CATEGORIES);
      if (categories) {
        return {domCategories: categories.map(category => new DomCategory(category.id, category))}
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

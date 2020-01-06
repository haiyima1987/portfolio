<template>
  <div class="info-list-wrapper">
    <div class="title-wrapper">
      <h4 class="title-page">Personal information</h4>
      <nuxt-link to="/admin/infos/create" class="button button-green">
        <font-awesome-icon :icon="['fa', 'plus']"/>
      </nuxt-link>
    </div>
    <FormWrapper :send-form-data="updateInfos" class="update-info-form">
      <div v-for="(dataItem, index) in infoData" class="info-data-wrapper">
        <button @click="showSelectedInfos(index)"
                type="button" class="button button-blue button-info-type">
          {{ dataItem.name }}
        </button>
        <DragList v-if="index == selectedIndex && dataItem.infos.length > 0"
                  :drag-items="dataItem.infos"
                  :header-height="60"
                  :on-edit-click="editInfo"
                  :on-delete-click="showDeleteModal">
          <template v-slot:item="{ item }">
            <h5 v-if="item.info.key" class="title-item">{{ item.info.key }}: {{ item.info.value }}</h5>
            <h5 v-else class="title-item">{{ item.info.value }}</h5>
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
        <div v-else-if="index == selectedIndex && dataItem.infos.length == 0"
             class="text-no-info">
          No information here
        </div>
      </div>
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
  import DomInfo from "../../../models/DomInfo";
  import {RESET_MODAL_DATA, SET_MODAL_DATA} from "../../../store/mutations";
  import DynamicModal from "../../../components/element/DynamicModal";
  import DragList from "../../../components/element/DragList";
  import {SHORT_MONTHS} from "../../../utils/DomHandler";
  import {DELETE_INFO, GET_INFOS, UPDATE_INFO_DISPLAY_INDEX} from "../../../store/info/actions";

  export default {
    name: 'index',
    middleware: 'authenticated',
    components: {
      FormWrapper, InputField, NumberField, DragList, DynamicModal
    },
    data: () => ({
      infoData: [],
      selectedIndex: 0
    }),
    methods: {
      showSelectedInfos: function (index) {
        this.selectedIndex = index
      },
      async updateInfos() {
        // update display indexes
        let updatedInfos = this.infoData[this.selectedIndex].infos.map((domInfo, index) => ({
          id: domInfo.id,
          displayIndex: index + 1
        }))
        // send request
        await this.$store.dispatch(UPDATE_INFO_DISPLAY_INDEX, updatedInfos)
      },
      editInfo: function (id) {
        return this.$router.push({path: `/admin/infos/edit/${id}`})
      },
      showDeleteModal: function (id) {
        this.$store.commit(SET_MODAL_DATA, {
          modalContent: 'information',
          data: id,
          callback: this.deleteInfo
        })
      },
      async deleteInfo(id) {
        let response = await this.$store.dispatch(DELETE_INFO, id)
        if (response) {
          // update local infos
          this.infoData[this.selectedIndex].infos = this.infoData[this.selectedIndex].infos
            .filter(domInfo => domInfo.id != id)
          // close the modal and reset the options
          this.$store.commit(RESET_MODAL_DATA)
        }
      }
    },
    async asyncData({store}) {
      let infoTypes = await store.dispatch(GET_INFOS);
      if (infoTypes) {
        let infoData = infoTypes.map(data => ({
          name: data.name,
          infos: data.infos.map(info => new DomInfo(info.id, info))
        }))
        return {infoData}
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

  .button-info-type {
    margin-bottom: 10px;
    width: 100%;
    font-size: 1.2rem;
    font-weight: bold;
  }

  .text-no-info {
    margin-bottom: 10px;
    padding-left: 15px;
    color: $red-main;
    font-weight: bold;
  }
</style>

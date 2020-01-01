<template>
  <div>
    <div v-for="project in projects" :key="project.id" class="item-project">
      <h4>{{ project.name }}</h4>
      <div class="button-group-wrapper">
        <button type="button" class="button button-green">
          <font-awesome-icon :icon="['fas', 'pencil-square-o']"/>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import {GET_PROJECTS} from "../../../store/actions";

  export default {
    computed: {
      ...mapGetters({
        projects: 'getProjects'
      })
    },
    async fetch({store}) {
      return store.dispatch(GET_PROJECTS);
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/css/base.variables";
  @import "../../../assets/css/base.mixins";

  /* buttons */
  .button-group-wrapper {
    display: flex;
  }

  .button-wrapper {
    padding: 10px 12px;
    flex-basis: 50%;
    display: flex;
    justify-content: center;
    font-weight: bold;
  }

  .button-left {
    padding: 4px 20px;
    width: 100%;
    text-align: center;
    color: $brown-main;
    border: 2px solid $brown-main;
    @include border-radius(20px);
  }

  .button-right {
    @extend .button-left;
    color: $green-dark;
    border: 2px solid $green-dark;
  }
</style>

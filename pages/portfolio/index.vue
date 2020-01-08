<template>
  <div class="project-list-wrapper">
    <div v-for="project in projects" :key="project.id" class="card-project">
      <div class="image-wrapper"
           :class="{ 'no-image-wrapper': !project.previewLink }">
        <img v-if="project.previewLink" :src="project.previewLink" :alt="project.name"
             class="image-preview">
        <div class="scope-project">{{ project.type.name }}</div>
      </div>
      <div class="content-wrapper">
        <div class="title-project-wrapper">
          <h1 class="title-project">{{ project.name }}</h1>
          <div class="year">Year {{ project.year }}</div>
        </div>
        <div class="tag-wrapper">
          <div v-for="skill in project.skills" :key="skill.id" class="tag-skill">
            {{ skill.name }}
          </div>
        </div>
        <div class="description-project">
          {{ project.description }}
        </div>
      </div>
      <div class="button-group-wrapper">
        <div class="button-wrapper">
          <a v-if="project.repository" :href="project.repository"
             target="_blank" class="button-right">
            <font-awesome-icon :icon="['fab', 'github']"/>
            GitHub
          </a>
        </div>
        <div class="button-wrapper">
          <a v-if="project.siteLink" :href="project.siteLink"
             target="_blank" class="button-left">
            <font-awesome-icon :icon="['fa', 'home']"/>
            Website
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import {GET_PUBLISHED} from "../../store/actions";

  export default {
    computed: {
      ...mapGetters({
        projects: 'getPublished'
      })
    },
    async asyncData({store}) {
      return store.dispatch(GET_PUBLISHED)
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/base.variables";
  @import "../../assets/css/base.mixins";

  /* layout */
  .card-project {
    margin-bottom: 15px;
    @include border-radius(10px);
    @include box-shadow(0, 0, 20px, rgba(160, 160, 160, 0.5));
  }

  /* image content */
  .image-wrapper {
    position: relative;
  }

  .no-image-wrapper {
    height: 26px;
  }

  .image-preview {
    width: 100%;
    @include border-radius-separate(10px, 10px, 0, 0);
  }

  .scope-project {
    padding: 0 8px 0 4px;
    background-color: $green-main;
    color: white;
    font-weight: bold;
    @include position(absolute, $right: 0, $bottom: 0);
    height: 26px;
    display: flex;
    align-items: center;
    font-size: 0.8rem;

    &:before {
      content: "";
      @include position(absolute, $left: 0);
      @include translate(-100%, 0);
      border-top: 26px solid transparent;
      border-right: 15px solid $green-main;
    }
  }

  /* text content */
  .content-wrapper {
    padding: 10px 20px;
  }

  .title-project-wrapper {
    display: flex;
    align-items: center;
  }

  .title-project {
    font-size: 1.2rem;
    font-weight: 800;
    color: $grey-text;
  }

  .year {
    color: $grey-text;
    font-size: 0.8rem;
    font-weight: 800;
    text-align: right;
    flex-grow: 1;
    margin-bottom: 8px;
  }

  .description-project {
    padding: 5px 0 0 0;
    @include line-clamp(3);
    line-height: 1rem;
  }

  /* tags */
  .tag-skill {
    margin: 0 8px 4px 0;
    padding: 2px 8px;
    display: inline-block;
    background-color: $green-main;
    color: white;
    @include border-radius(4px);
    font-size: 0.8rem;
    font-weight: 600;
  }

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

  @media screen and (min-width: $screen-md) {
    .project-list-wrapper {
      @include grid(2, 20px);
    }

    .card-project {
      margin-bottom: 0;
      display: flex;
      flex-direction: column;
    }

    .button-group-wrapper {
      flex-grow: 1;
      display: flex;
      align-items: flex-end;
    }
  }
</style>

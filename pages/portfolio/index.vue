<template>
  <div class="portfolio-wrapper">
    <TitlePage :name="'My projects'"/>
    <div class="project-list-wrapper">
      <div v-for="project in projects" :key="project.id" class="card-project lazy left-in-start" data-transition="left-in">
        <div class="image-wrapper"
             @click="setPreviewProject(project)"
             :class="{ 'no-image-wrapper': !project.previewLink }">
          <template v-if="project.previewLink">
            <div class="image-overlay"></div>
            <img :src="project.previewLink" :alt="project.name" class="image-preview">
          </template>
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
          <div class="read-more-wrapper">
            <button @click="setPreviewProject(project)" class="button-green-text button-read-more">Read more</button>
          </div>
        </div>
        <div v-if="!project.internal" class="button-group-wrapper">
          <div class="button-wrapper">
            <a :href="project.repository"
               :disabled="!project.repository"
               target="_blank" class="button-portfolio button-repo">
              <font-awesome-icon :icon="['fab', 'github']"/>
              GitHub
            </a>
          </div>
          <div class="button-wrapper">
            <a :href="project.siteLink"
               :disabled="!project.siteLink"
               target="_blank" class="button-portfolio button-site">
              <font-awesome-icon :icon="['fa', 'home']"/>
              Website
            </a>
          </div>
        </div>
<!--        <div v-else class="button-group-wrapper">-->
<!--          <div class="internal-text-wrapper">-->
<!--            <div>Links unavailable due to privacy (internal project)</div>-->
<!--          </div>-->
<!--        </div>-->
      </div>
    </div>
    <ImageModal/>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import {GET_PUBLISHED} from "../../store/actions";
  import TitlePage from "../../components/element/TitlePage";
  import {SET_PREVIEW_PROJECT} from "../../store/mutations";
  import ImageModal from "../../components/element/ImageModal";
  import {observerMixin} from "../../mixins/observerMixin";

  export default {
    components: {
      ImageModal, TitlePage
    },
    mixins: [observerMixin],
    computed: {
      ...mapGetters({
        projects: 'getPublished',
        previewLink: 'getPreviewLink'
      })
    },
    methods: {
      setPreviewProject: function (project) {
        if (project.previewLink) {
          this.$store.commit(SET_PREVIEW_PROJECT, project)
        }
      }
    },
    mounted() {
      this.initializeObserver()
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
    @include box-shadow(0, 0, 20px, $grey-opaque-09);
    border: 1px solid white;
  }

  /* image content */
  .image-wrapper {
    position: relative;
    overflow: hidden;
    @include border-radius-separate(10px, 10px, 0, 0);

    &:hover {
      cursor: pointer;

      .image-overlay {
        display: block;
      }

      .image-preview {
        @include scale(1.1, 1.1);
      }
    }
  }

  .no-image-wrapper {
    height: 26px;
  }

  .image-preview {
    width: 100%;
    transition: all .2s ease-in-out;
  }

  .image-overlay {
    @include position-equal(absolute, 0, $elevation: 5);
    background-color: $grey-opaque-03;
    display: none;
  }

  .scope-project {
    padding: 0 8px 0 4px;
    background-color: $green-main-1;
    color: white;
    font-weight: bold;
    @include position-elevation(absolute, $right: 0, $bottom: 0, $elevation: 10);
    height: 26px;
    display: flex;
    align-items: center;
    font-size: 1.2rem;

    &:before {
      content: "";
      @include position(absolute, $left: 0);
      @include translate(-100%, 0);
      border-top: 26px solid transparent;
      border-right: 15px solid $green-main-1;
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
    font-size: 2rem;
    font-weight: bold;
    color: $grey-medium-4;
  }

  .year {
    color: $grey-medium-4;
    font-size: 1.2rem;
    font-weight: 800;
    text-align: right;
    flex-grow: 1;
    margin-bottom: 8px;
  }

  .description-project {
    padding: 10px 0 0 0;
    @include line-clamp(3);
    line-height: 2rem;
  }

  .read-more-wrapper {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .button-read-more {
    font-weight: bold;
  }

  /* tags */
  .tag-skill {
    margin: 0 8px 4px 0;
    padding: 2px 8px;
    display: inline-block;
    background-color: $green-main-1;
    color: white;
    @include border-radius(4px);
    font-size: 1.2rem;
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

  .internal-text-wrapper {
    padding: 10px 20px;
    display: flex;
    justify-content: center;
    font-weight: bold;
  }

  .button-site {
    padding: 4px 20px;
    width: 100%;
    text-align: center;
    color: $brown-main-1;
    border: 2px solid $brown-main-1;
    @include border-radius(20px);

    &:hover {
      color: $brown-main-1;
    }

    &[disabled] {
      color: $grey-pale-a;
      border: 2px solid $grey-pale-a;
      cursor: not-allowed;
    }
  }

  .button-repo {
    @extend .button-site;
    color: $green-6;
    border: 2px solid $green-6;

    &:hover {
      color: $green-6;
    }

    &[disabled] {
      color: $grey-pale-a;
      border: 2px solid $grey-pale-a;
      cursor: not-allowed;
    }
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

    .button-wrapper {
      padding: 20px 20px 20px 10px;
    }

    .internal-text-wrapper {
      padding: 20px;
    }
  }

  @media screen and (min-width: $screen-xl) {
    .project-list-wrapper {
      @include grid(2, 40px);
    }
  }

  @media screen and (min-width: $screen-xxl) {
    .project-list-wrapper {
      @include grid(3, 40px);
    }

    .button-portfolio {
      width: auto;
    }
  }
</style>

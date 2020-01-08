<template>
  <div>
    <Heading :name="'Experiences'"/>
    <div class="content-wrapper">
      <div v-for="experience in experiences" :key="experience.id"
           class="item-wrapper">
        <h5 class="title-item text-item">{{ experience.position }}</h5>
        <div class="text-item">
          <i>{{ formatDate(experience.start) }}&nbsp;&nbsp;to&nbsp;&nbsp;{{ formatDate(experience.end) }}</i>
        </div>
        <div class="text-item">
          {{ parseValue(experience.company) }}{{ parseValue(experience.city) }}{{ parseValueLast(experience.country)}}
        </div>
      </div>
    </div>
    <Heading :name="'Skills'"/>
    <div class="content-wrapper">
      <div class="scope-group">
        <div v-for="scope in scopes" :key="scope.id"
             class="scope-wrapper">
          <template v-if="scope.skills.length > 0">
            <h5 class="name-scope">{{ scope.name }}:</h5>
            <div v-for="skill in scope.skills" :key="skill.id">
              <div class="background-bar">
                <div :style="{ width: `${skill.level}%` }" class="bar-skill">
                  {{ skill.name }}
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <Heading :name="'Educations'"/>
    <div class="content-wrapper">
      <div v-for="education in educations" :key="education.id">
        <h5 class="title-item">{{ education.major }}</h5>
        <div class="text-item">
          <i>{{ formatDate(education.start) }}&nbsp;&nbsp;to&nbsp;&nbsp;{{ formatDate(education.end) }}</i>
        </div>
        <div class="text-item">
          {{ parseValue(education.college) }}{{ parseValue(education.city) }}{{ parseValueLast(education.country)}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import Heading from "../../components/Heading";
  import {GET_RESUME_DATA} from "../../store/actions";
  import {SHORT_MONTHS} from "../../utils/DomHandler";

  export default {
    components: {
      Heading
    },
    computed: {
      ...mapGetters({
        scopes: 'getScopes',
        experiences: 'getExperiences',
        educations: 'getEducations',
      })
    },
    methods: {
      parseValue: function (location) {
        return location ? `${location}, ` : ''
      },
      parseValueLast: function (location) {
        return location ? location : ''
      },
      formatDate: function (date) {
        if (!date) {
          return 'present'
        }
        let temp = new Date(date)
        let year = temp.getFullYear()
        let month = temp.getMonth()
        return `${SHORT_MONTHS[month]} - ${year}`
      }
    },
    async asyncData({store}) {
      return store.dispatch(GET_RESUME_DATA)
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/base.variables";
  @import "../../assets/css/base.mixins";

  .content-wrapper {
    padding: 10px 15px;
  }

  .item-wrapper {
    margin-bottom: 15px;
  }

  .title-item {
    font-weight: bold;
  }

  .text-item {
    margin-bottom: 5px;
  }

  /** skills **/
  .scope-wrapper {
    margin-bottom: 20px;
  }

  .name-scope {
    margin-bottom: 8px;
    font-size: 1.2rem;
    font-weight: bold;
  }

  .background-bar {
    margin-bottom: 5px;
    height: 26px;
    position: relative;
    background-color: $grey-pale;
  }

  .bar-skill {
    padding-left: 10px;
    background-color: $green-dark;
    @include position(absolute, $top: 0, $bottom: 0, $left: 0);
    display: flex;
    align-items: center;
    color: white;
    font-weight: bold;
  }

  @media screen and (min-width: $screen-md) {
    .scope-group {
      @include grid(2, 20px);
    }

    .scope-wrapper {
      margin-bottom: 0;
    }
  }
</style>

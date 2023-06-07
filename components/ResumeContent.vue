<template>
  <div class="resume-wrapper">
    <HeadingLine :name="'Experiences'"/>
    <div class="content-wrapper">
      <div v-for="experience in experiences" :key="experience.id"
           class="item-wrapper lazy up-in-start" data-transition="up-in">
        <div class="date-item date-side">
          {{ formatDate(experience.start) }}&nbsp;&nbsp;--&nbsp;&nbsp;{{ formatDate(experience.end) }}
        </div>
        <div class="item-content-wrapper">
          <div class="date-item text-item">
            {{ formatDate(experience.start) }}&nbsp;&nbsp;--&nbsp;&nbsp;{{ formatDate(experience.end) }}
          </div>
          <h5 class="title-item">{{ experience.position }}</h5>
          <div class="location-item text-item">
            {{ parseValue(experience.company) }}
            {{ parseValue(experience.city) }}
            {{ parseValueLast(experience.country)}}
          </div>
          <div v-if="experience.explanation" class="tex-item">
            {{ experience.explanation }}
          </div>
        </div>
      </div>
    </div>
    <HeadingLine :name="'Skills'"/>
    <div class="content-wrapper">
      <div class="scope-group">
        <div v-for="scope in scopes" :key="scope.id"
             class="scope-wrapper lazy up-in-start" data-transition="up-in">
          <template v-if="isValidScope(scope)">
            <h5 class="name-scope">{{ scope.name }}:</h5>
            <div v-for="skill in scope.skills" :key="skill.id">
              <div v-if="isValidSkill(skill)" class="background-bar">
                <div :style="{ width: `${skill.level}%` }" class="bar-skill">
                  {{ skill.name }}
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <HeadingLine :name="'Educations'"/>
    <div class="content-wrapper">
      <div v-for="education in educations" :key="education.id"
           class="item-wrapper lazy up-in-start" data-transition="up-in">
        <div class="date-item date-side">
          {{ formatDate(education.start) }}&nbsp;&nbsp;--&nbsp;&nbsp;{{ formatDate(education.end) }}
        </div>
        <div class="item-content-wrapper">
          <div class="date-item text-item">
            {{ formatDate(education.start) }}&nbsp;&nbsp;--&nbsp;&nbsp;{{ formatDate(education.end) }}
          </div>
          <h5 class="title-item">{{ education.major }}</h5>
          <div class="location-item text-item">
            {{ parseValue(education.college) }}
            {{ parseValue(education.city) }}
            {{ parseValueLast(education.country)}}
          </div>
          <div v-if="education.explanation" class="tex-item">
            {{ education.explanation }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import HeadingLine from "./HeadingLine";
  import {mapGetters} from "vuex";
  import {SHORT_MONTHS} from "../utils/DomHandler";
  import {GET_RESUME_DATA} from "../store/actions";

  const minSkillLevel = 49

  export default {
    name: "ResumeContent",
    components: {
      HeadingLine
    },
    computed: {
      ...mapGetters({
        scopes: 'getScopes',
        experiences: 'getExperiences',
        educations: 'getEducations',
      })
    },
    methods: {
      isValidScope: function (scope) {
        // if there is no skill
        if (scope.skills.length == 0) {
          return false
        }
        // if at least one skill level above 50
        for (let skill of scope.skills) {
          if (skill.level > 50) {
            return true
          }
        }
        return true
      },
      isValidSkill: function (skill) {
        return skill.level > minSkillLevel
      },
      parseValue: function (location) {
        return location ? `${location}, ` : ''
      },
      parseValueLast: function (location) {
        return location ? location : ''
      },
      formatDate: function (date) {
        if (!date) {
          return 'Present'
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
  @import "../assets/css/base.variables";
  @import "../assets/css/base.mixins";

  .content-wrapper {
    padding: 30px 0;
  }

  /* wrapper of each experience, skill, and education */
  .item-wrapper {
    margin-bottom: 15px;
    display: flex;
  }

  .item-content-wrapper {
    padding: 0 0 0 15px;
    border-left: 5px solid $grey-pale-c;
  }

  .date-item {
    font-weight: bold;
    color: $blue-light-1;
  }

  .date-side {
    display: none;
  }

  .title-item {
    font-size: 2rem;
    font-weight: 800;
    text-transform: uppercase;
  }

  .location-item {
    color: $blue-light-1;
    font-style: italic;
    font-weight: bold;
  }

  .text-item {
    margin-bottom: 5px;

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  /** skills **/
  .scope-wrapper {
    margin-bottom: 20px;
  }

  .name-scope {
    margin-bottom: 8px;
    font-size: 1.8rem;
    font-weight: bold;
    text-transform: uppercase;
  }

  .background-bar {
    margin-bottom: 5px;
    height: 26px;
    position: relative;
    background-color: $grey-pale-d;
  }

  .bar-skill {
    padding-left: 10px;
    background-color: $green-main-1;
    @include position(absolute, $top: 0, $bottom: 0, $left: 0);
    display: flex;
    align-items: center;
    color: white;
    font-weight: bold;
  }

  @media screen and (min-width: $screen-md) {
    .date-item {
      display: none;
    }

    .date-side {
      padding-right: 15px;
      font-weight: bold;
      color: $blue-light-1;
      display: flex;
      flex: 0 0 220px;
    }

    .scope-group {
      @include grid(2, 20px);
    }

    .scope-wrapper {
      margin-bottom: 0;
    }
  }

  @media screen and (min-width: $screen-lg) {
    .resume-wrapper {
      padding: 30px 20px;
    }
  }

  @media screen and (min-width: $screen-xl) {
    .item-wrapper {
      margin-bottom: 25px;
    }
  }
</style>

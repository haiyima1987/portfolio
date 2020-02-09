<template>
  <div ref="contentDisplay">
    <transition name="move-up">
      <div v-show="contentDisplay"
           class="resume-page-wrapper">
        <div class="section-wrapper title-section">
          <div class="content-left title-content title-box">
            <div class="title-text title-name">Haiyi Ma</div>
            <div class="title-text">Web developer</div>
            <div class="title-text">Software engineer</div>
          </div>
          <div class="content-right title-content intro-box">
            A passionate web developer and software engineer, hard-working, creative, and responsible.
          </div>
        </div>
        <div class="section-wrapper">
          <ContactInfo class="content-left contact-info"/>
          <ResumeContent class="content-right"/>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import HeadingLine from "../../components/HeadingLine";
  import {GET_RESUME_DATA} from "../../store/actions";
  import {SHORT_MONTHS} from "../../utils/DomHandler";
  import ContactInfo from "../../components/ContactInfo";
  import ResumeContent from "../../components/ResumeContent";

  const contentDisplayName = 'contentDisplay'
  const initializationDisplays = [contentDisplayName]
  const displayOffset = 60

  export default {
    components: {
      ResumeContent,
      HeadingLine, ContactInfo
    },
    data: () => ({
      contentDisplay: false
    }),
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
          return 'Present'
        }
        let temp = new Date(date)
        let year = temp.getFullYear()
        let month = temp.getMonth()
        return `${SHORT_MONTHS[month]} - ${year}`
      },
      checkElementDisplay: function (elementName) {
        let displayHeight = window.scrollY + window.innerHeight - displayOffset
        if (!this[elementName]) {
          this[elementName] = displayHeight > this.$refs[elementName].offsetTop
        }
      },
      initializeDisplays: function () {
        for (let display of initializationDisplays) {
          this.checkElementDisplay(display)
        }
      }
    },
    mounted() {
      this.initializeDisplays()
    },
    async asyncData({store}) {
      return store.dispatch(GET_RESUME_DATA)
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/base.variables";
  @import "../../assets/css/base.mixins";
  @import "../../assets/css/transition";

  .title-section {
    display: none;
  }

  .contact-info {
    display: none;
  }

  @media screen and (min-width: $screen-lg) {
    /* layout wrappers */
    .resume-page-wrapper {
      @include box-shadow(0, 0, 20px, $grey-opaque-15);
    }

    .section-wrapper {
      display: flex;
    }

    .contact-info {
      display: block;
    }

    .content-left {
      flex: 0 0 32%;
    }

    .content-right {
      flex: 0 0 68%;
    }

    /* title texts */
    .title-content {
      padding: 15px 20px;
    }

    .title-box {
      text-align: right;
    }

    .title-text {
      font-weight: 600;
    }

    .title-name {
      font-size: 2.4rem;
      font-weight: bold;
      text-transform: uppercase;
    }

    .intro-box {
      display: flex;
      align-items: center;
      font-size: 1.2rem;
      font-weight: bold;
      color: white;
      background-color: $grey-dark-3;
    }
  }

  @media screen and (min-width: $screen-xl) {
    .content-left {
      flex: 0 0 30%;
    }

    .content-right {
      flex: 0 0 70%;
    }
  }
</style>

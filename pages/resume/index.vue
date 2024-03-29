<template>
  <div class="resume-page-wrapper">
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
</template>

<script>
  import {mapGetters} from "vuex";
  import HeadingLine from "../../components/HeadingLine";
  import {GET_RESUME_DATA} from "../../store/actions";
  import {SHORT_MONTHS} from "../../utils/DomHandler";
  import ContactInfo from "../../components/ContactInfo";
  import ResumeContent from "../../components/ResumeContent";
  import {observerMixin} from "../../mixins/observerMixin";

  export default {
    components: {
      ResumeContent, HeadingLine, ContactInfo
    },
    mixins: [observerMixin],
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
      @include border-radius(6px);
      overflow: hidden;
    }

    .section-wrapper {
      display: flex;
    }

    .contact-info {
      display: block;
    }

    .content-left {
      flex-basis: 32%;
    }

    .content-right {
      flex-basis: 68%;
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
      font-size: 3.6rem;
      font-weight: bold;
      text-transform: uppercase;
    }

    .intro-box {
      display: flex;
      align-items: center;
      font-size: 2rem;
      font-weight: bold;
      color: white;
      background-color: $grey-dark-3;
    }
  }

  @media screen and (min-width: $screen-xl) {
    .content-left {
      flex-basis: 30%;
    }

    .content-right {
      flex-basis: 70%;
    }
  }
</style>

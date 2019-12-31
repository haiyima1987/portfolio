<template>
  <div class="skill-list-wrapper">
    <Form :send-form-data="updateSkills"
          class="update-skill-form">
      <div v-for="(skill, index) in skills" :key="skill.id"
           class="skill-wrapper">
        <InputField
          :field-title="''"
          :field-name="`name-${index}`"
          :rule="'required'"
          :type="'text'"
          :value="skill.name"
          :placeholder="'Enter your skill'">
        </InputField>
        <div class="score-button-wrapper">
          <NumberField
            :field-title="''"
            :field-name="`score-${index}`"
            :rule="'required'"
            :value="skill.level"
            :min="0"
            :max="100"
            :placeholder="'Score'">
          </NumberField>
        </div>
      </div>
    </Form>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import {GET_SKILLS} from "../../store/admin/actions";
  import InputField from "../../components/form/InputField";
  import Form from "../../components/form/Form";
  import NumberField from "../../components/form/NumberField";

  export default {
    name: "skill",
    components: {
      Form, InputField, NumberField
    },
    computed: {
      ...mapGetters('admin', {
        skills: 'getSkills'
      })
    },
    methods: {
      updateSkills: function () {

      }
    },
    async asyncData({store}) {
      return store.dispatch(GET_SKILLS);
    }
  }
</script>

<style scoped>

</style>

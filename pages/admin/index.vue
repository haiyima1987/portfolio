<template>
  <div class="admin-wrapper">
    <FormWrapper :send-form-data="login"
                 class="create-account-form">
      <InputField
        :field-title="'Username'"
        :field-name="'email'"
        :rule="'required'"
        :type="'email'"
        :placeholder="'Enter you username'">
      </InputField>
      <InputField
        :field-title="'Password'"
        :field-name="'password'"
        :rule="'required'"
        :type="'password'"
        :placeholder="'Enter your password'">
      </InputField>
      <p v-show="isAuthError" class="text-error">Login failed</p>
      <div class="button-submit-wrapper">
        <button type="submit" class="button-green button-login">
          LOGIN
        </button>
      </div>
    </FormWrapper>
  </div>
</template>

<script>
  import FormWrapper from "../../components/form/FormWrapper";
  import InputField from "../../components/form/InputField";
  import {LOGIN} from "../../store/auth/actions";
  import {mapGetters} from "vuex";

  export default {
    name: "index",
    components: {
      FormWrapper, InputField
    },
    computed: {
      ...mapGetters('auth', {
        isAuthError: 'getAuthError'
      })
    },
    methods: {
      async login(data) {
        let response = await this.$store.dispatch(LOGIN, data)
        if (response) {
          return this.$router.push({path: '/admin/skills'})
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .admin-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .create-account-form {
    width: 600px;
    max-width: 100%;
  }

  .button-submit-wrapper {
    text-align: right;
  }
</style>

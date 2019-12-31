<template>
  <div class="admin-wrapper">
    <Form :send-form-data="login"
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
      <div class="button-wrapper">
        <button type="submit" class="button-green-main button-login">
          LOGIN
        </button>
      </div>
    </Form>
  </div>
</template>

<script>
  import Form from "../../components/form/Form";
  import InputField from "../../components/form/InputField";
  import {LOGIN} from "../../store/auth/actions";
  import {mapGetters} from "vuex";

  export default {
    name: "index",
    components: {
      Form, InputField
    },
    computed: {
      ...mapGetters('auth', {
        isAuthError: 'getAuthError'
      })
    },
    methods: {
      login: function (data) {
        this.$store.dispatch(LOGIN, data).then(response => {
          if (response) {
            this.$router.push({path: '/admin/skill'})
          }
        })
      }
    }
  }
</script>

<style scoped>
  .button-wrapper {
    text-align: right;
  }
</style>

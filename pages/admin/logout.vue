<template>
  <div>Logging out...</div>
</template>

<script>
  import {LOGOUT} from "../../store/auth/mutations";

  export default {
    name: "logout",
    created() {
      this.$store.commit(LOGOUT)
      this.$router.push({path: '/'})
    }
  }
</script>

<style scoped>

</style>

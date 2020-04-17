<template>
  <div>
    <login-header></login-header>
    <login-page></login-page>
  </div>
</template>

<script>
import LoginHeader from './components/Header'
import LoginPage from './components/LoginPage'
export default {
  name: 'Login',
  components: {
    LoginHeader,
    LoginPage
  }
}
</script>

<style lang="scss" scoped>

</style>

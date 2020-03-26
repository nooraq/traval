<template>
  <div>
    <header-menu></header-menu>
  <router-view></router-view>
  </div>
</template>

<script>
import Header from './Header';

export default {
  name: 'BasicLayout',
  components: {
    HeaderMenu: Header
  }
};
</script>

<style>

</style>

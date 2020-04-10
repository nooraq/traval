<template>
  <div class="header">this is header</div>
</template>

<script>
export default {
  name: 'Header'
};
</script>

<style lang='scss' scoped>
@import '@/theme/variable.scss';
.header {
  background-color: #FFF;
  height: 56px;
  box-shadow: 0 2px 10px rgba(0,0,0,.05);
  width:100%;
  color: $header-color;
}
</style>

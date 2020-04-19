<template>
  <div class="logo-wrapper">
    <img class="logo" src="@/assets/icons/travelLogo.png">
    <div class="site-name">轻足迹</div>
    <p class="desc">开启你的旅途记录!</p>
  </div>
</template>

<script>
export default {
  name: 'LoginHeader'
};
</script>

<style lang="scss" scoped>
@import '@/theme/variable.scss';
.logo-wrapper {
  position: absolute;
  height: 200px;
  width: 150px;
  display: inline-block;
  top: 30px;
  left: 50px;
}
.logo {
  width: 80px;
}
.site-name {
  color: $theme-4-hex;
  font-weight: 800;
  font-size: 32px;
}
.desc {
  font-size: 14px;
  color: $theme-4-hex;
  // padding: 5px 0;
  margin-top: 5px; //两个块之间的间距用margin拉开
}
</style>

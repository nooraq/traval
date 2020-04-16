<template>
  <div class="login-wrapper">
    <div class="choice">
      <span class="choose-to">登录</span>
      <span class="choose-to">注册</span>
    </div>
    <div class="user-mes">
      <input class="input-mes" type="text" name="userName" placeholder="请输入账号">
      <input class="input-mes" type="password" name="password" placeholder="请输入密码">
      <input class="submit-mes" type="submit" value="提交">
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage"
}
</script>

<style lang="scss">
@import '@/theme/variable.scss';
.login-wrapper {
  height: 450px;
  width: 380px;
  background-color: $--background-color-base;
  margin: 100px auto 0;
  border: 1px solid rgb(221, 218, 218);
  border-radius: 5px;
}
.choice {
  text-align: center;
  margin: 50px 20px;
}
.choose-to {
  padding: 12px;
  margin: 0 10px;
  font-size: 20px;
  color: $--color-text-regular;
  cursor: pointer;
}
.user-mes {
  width: 280px;
  margin: 0 auto;
}
.input-mes {
  width: 100%;
  height: 50px;
  border: 2px solid rgb(221, 218, 218);
  background-color: rgb(243, 237, 237);
  margin: 10px 0;
  border-radius: 3px;
}
.submit-mes {
  width: 100%;
  height: 50px;
  margin: 20px auto;
  width: 280px;
  border-radius: 20px;
  background: #2ebc4f;
  font-size: 18px;
  color: #fff;
  border: none;
  outline: none;
}
</style>

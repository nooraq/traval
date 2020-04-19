<template>
  <div class="login-wrapper">
    <div class="choice">
      <span class="choose-to" :class="{ todo: tologin }" @click="loginHandleClick">登录</span>
      <span class="choose-to" :class="{ todo: toregi }" @click="regiHandleClick">注册</span>
    </div>
    <!-- 优先显示登录页面，若未注册则点击“注册”实现注册功能-->
    <div
      class="user-mes"
      v-if="showLogin"
    >
      <!-- 显示登录页-->
      <input
        class="input-mes"
        v-model="loginMessage.Userid"
        type="text" name="userName"
        placeholder="请输入账号"
        @click="inputHandleClick"
      />
      <input class="input-mes"
        v-model="loginMessage.Password"
        type="password" name="password"
        placeholder="请输入密码"
        @click="inputHandleClick"
      />
      <p class="errorWarn" v-show="showWarn">*输入的账号或密码有误，请重新输入！</p>
      <input class="submit-mes blueBGC" type="submit" value="登录" @click="loginToClick">
      <p class="tips" @click="regiHandleClick">还未有账号？请先注册。</p>
    </div>
    <div
      class="user-mes"
      v-else
    >
      <!-- 显示注册页-->
      <input class="input-mes" v-model="regiMessage.UserName" type="text" name="userName" placeholder="请输入用户名">
      <input class="input-mes" type="text" v-model="regiMessage.Userid" name="userName" placeholder="请输入账号">
      <input class="input-mes" type="password" v-model="regiMessage.Password" name="password" placeholder="请输入密码">
      <input class="submit-mes greenBGC" type="submit" value="注册" @click="regiToClick">
    </div>

    <!-- element-ui的tab 写法 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="登陆" name="login">    <!-- 里面是内容-->
    <div
      class="user-mes"
    >
      <!-- 显示登录页-->
      <input
        class="input-mes"
        v-model="loginMessage.Userid"
        type="text" name="userName"
        placeholder="请输入账号"
        @click="inputHandleClick"
      />
      <input class="input-mes"
        v-model="loginMessage.Password"
        type="password" name="password"
        placeholder="请输入密码"
        @click="inputHandleClick"
      />
      <p class="errorWarn" v-show="showWarn">*输入的账号或密码有误，请重新输入！</p>
      <input class="submit-mes blueBGC" type="submit" value="登录" @click="loginToClick">
      <p class="tips" @click="regiHandleClick">还未有账号？请先注册。</p>
    </div></el-tab-pane>
    <el-tab-pane label="注册" name="regi">注册的input</el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'LoginPage',
  data() {
    return {
      // 有相关登录/注册选择的data
      showLogin: true,
      tologin: true,
      toregi: false,
      showWarn: false,
      // 有关账号密码提交的data
      loginMessage: {
        Userid: '',
        Password: ''
      },
      regiMessage: {
        UserName: '',
        Userid: '',
        Password: '',
        signDate: null
      },
    };
  },
  computed: {
     ...mapState(['isLogin'])
  },
  methods: {
    ...mapMutations(['changeLoginStatus', 'saveRegiMes']),
    // 登录/注册 功能选择
    loginHandleClick() {
      this.showLogin = true;
      this.tologin = true;
      this.toregi = false;
    },
    regiHandleClick() {
      this.showLogin = false;
      this.tologin = false;
      this.toregi = true;
    },
    // 登录 信息提交,并判断是否存在对应账号
    loginToClick() {
      this.changeLoginStatus(this.loginMessage);
      if (this.isLogin) {
        alert('登录成功！');
        this.$router.push('/mapTrack');
      } else {
        this.showWarn = true;
      }
    },
    // 注册 信息提交
    regiToClick() {
      const time = new Date();
      this.signDate = time.getDay();
      this.saveRegiMes(this.regiMessage);
      this.loginHandleClick();
    },
    inputHandleClick() {
      this.showWarn = false;
    }
  }
};
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
// 登录页提示
.tips {
  font-size: 14px;
  color: $--color-text-regular;
  text-decoration: underline;
  cursor: pointer;
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
  font-size: 18px;
  color: #fff;
  border: none;
  outline: none;
}
.blueBGC {
  background: $--color-primary;
}
.greenBGC {
  background: #2ebc4f;
}
.errorWarn {
  font-size: 12px;
  color: $theme-5-hex;
}
// todo选择器实现登录/注册特殊样式
.todo {
  font-weight: bold;
  color: $theme-5-hex;
  border-bottom: 2px solid $theme-5-hex;
}
</style>

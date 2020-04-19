<template>
  <div class="login-wrapper">
    <el-tabs v-model="activeName" @tab-click="tabHandleClick" class="tabs">
      <!-- 登录项(优先显示) -->
      <el-tab-pane label="登录" name="login">
        <div class="user-mes">
          <el-input class="input-mes" size="large" v-model="loginMessage.Userid" placeholder="请输入账号" clearable @focus="inputHandleClick"></el-input>
          <el-input class="input-mes" size="large" v-model="loginMessage.Password" placeholder="请输入密码" clearable show-password @focus="inputHandleClick"></el-input>
          <p class="errorWarn" v-show="showWarn">*输入的账号或密码有误，请重新输入！</p>
          <el-button type="primary" class="button" @click="loginToClick">登录</el-button>
          <p class="login-tips">还未有账号？请先注册。</p>
        </div>
      </el-tab-pane>
      <!-- 注册项 -->
      <el-tab-pane label="注册" name="register">
        <div class="user-mes">
          <el-input class="input-mes" size="large" v-model="regiMessage.UserName" placeholder="请输入用户名" clearable></el-input>
          <el-input class="input-mes" size="large" v-model="regiMessage.Userid" placeholder="请输入账号" clearable></el-input>
          <el-input class="input-mes" size="large" v-model="regiMessage.Password" placeholder="请输入密码" show-password clearable></el-input>
          <el-button type="success" class="button" @click="regiToClick">注册</el-button>
        </div>
      </el-tab-pane>
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
      //要设置初始值为login才能刷新时立即显示login输入框部分
      activeName: 'login'
    };
  },
  computed: {
    ...mapState(['isLogin'])
  },
  methods: {
    ...mapMutations(['changeLoginStatus', 'saveRegiMes']),
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
      alert('注册成功，请重新登录！');
      this.activeName = 'login';
    },
    inputHandleClick() {
      this.showWarn = false;
    },
    tabHandleClick(tab) {
      console.log(tab.name);
      console.log(this.activeName);
    }
  }
};
</script>

<style lang="scss">
//修改tab中的label标签
//需要在无scoped限制的style中设置，且需要父级选择器加持优先级
.login-wrapper #tab-register,#tab-login {
  font-size: 16px;
}
</style>
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
.tabs {
  margin: 30px 50px;
}
// 登录页提示
.login-tips {
  font-size: 13px;
  color: $--color-text-regular;
  text-decoration: underline;
  margin-top: 50px;
}
.user-mes {
  width: 280px;
  margin: 0 auto;
}
//输入框样式
.input-mes {
  margin: 10px 0;
}
//提交按钮样式
.button {
  width: 100%;
  height: 50px;
  margin: 30px auto 0;
  font-size: 16px;
}
.errorWarn {
  font-size: 12px;
  color: $theme-5-hex;
}
</style>

<template>
  <div class="login-wrapper">
    <el-tabs v-model="activeName" class="tabs">
      <!-- 登录项(优先显示) -->
      <el-tab-pane label="登录" name="login">
        <div class="user-mes">
          <el-form :model="loginMessage" size="large" status-icon :rules="rules" ref="loginMessage" class="demo-ruleForm">
            <el-form-item prop="username">
              <el-input v-model="loginMessage.username" placeholder="请输入账号" autocomplete="off" @focus="inputHandleClick"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="loginMessage.password" placeholder="请输入密码" show-password autocomplete="off" @focus="inputHandleClick"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="button" @click="submitLoginForm('loginMessage')">登录</el-button>
            </el-form-item>
          </el-form>
          <p class="errorWarn" v-show="showWarn">*你输入的账号或密码有误，请重新输入！</p>
          <p class="login-tips">还未有账号？请先注册。</p>
        </div>
      </el-tab-pane>
      <!-- 注册项 -->
      <el-tab-pane label="注册" name="register">
        <!-- <div class="user-mes">
          <el-input maxlength="15" show-word-limit class="input-mes" size="large"
            v-model="regiMessage.Userid" placeholder="请输入账号" clearable @change="emptyRegisterCheck"
          ></el-input>
          <el-input
            maxlength="15" class="input-mes" size="large" placeholder="请输入密码"
            v-model="regiMessage.Password" show-password clearable @change="emptyRegisterCheck"
          ></el-input>
          <el-button type="success" class="button" @click="regiToClick">注册</el-button>
          <p class="errorWarn" v-show="emptyRWarn">*输入的账号或密码为空，请输入完整！</p> -->
        <div class="user-mes">
          <el-form :model="regiMessage" status-icon size="large" :rules="rules" ref="regiMessage" class="demo-ruleForm">
            <el-form-item prop="username">
              <el-input maxlength="15" minlength="6" show-word-limit class="input-mes" v-model="regiMessage.username" placeholder="请输入账号" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input maxlength="15" placeholder="请输入密码" v-model="regiMessage.password" show-password autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" class="button" @click="submitRegiForm('regiMessage')">注册</el-button>
            </el-form-item>
          </el-form>
          <p class="login-tips">请输入6-15字符的账号和密码。<br/>期待你的加入！</p>
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
    const validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('别忘记输入账号呀！'));
      } else {
        if (this.loginMessage.password !== '') {
          this.$refs.loginMessage.validateField('password');
        }
        if (this.regiMessage.password !== '') {
          this.$refs.regiMessage.validateField('password');
        }
        // callback();
      }
      setTimeout(() => {
        if (value.length < 6 || value.length > 15) {
          callback(new Error('账号和密码不能少于6位数或大于15位数呀！'));
        } else {
          callback();
        }
      }, 1000);
    };
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('别忘记输入密码呀!'));
      } else {
        setTimeout(() => {
          if (value.length < 6 || value.length > 15) {
            callback(new Error('账号和密码不能少于6位数或大于15位数呀！'));
          } else {
            callback();
          }
        }, 1000);
      }
    };
    return {
      // 有相关登录/注册选择的data
      showWarn: false,
      // 有关账号密码提交的data
      loginMessage: {
        username: '',
        password: ''
      },
      // 规则
      rules: {
        username: [
          { validator: validateName, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ]
      },
      regiMessage: {
        username: '',
        password: ''
      },
      // 要设置初始值为login才能刷新时立即显示login输入框部分
      activeName: 'login'
    };
  },
  computed: {
    ...mapState(['isLogin'])
  },
  methods: {
    ...mapMutations(['changeLoginStatus', 'saveRegiMes']),
    // 登录 信息提交,并判断是否存在对应账号
    submitLoginForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.changeLoginStatus(this.loginMessage);
          if (this.isLogin) {
            alert('登录成功！');
            this.$router.push('/mapTrack');
          } else if (!this.isLogin) {
            this.showWarn = true;
          }
        } else {
          console.log('error submit!');
          return false;
        }
      });
    },
    submitRegiForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.saveRegiMes(this.regiMessage);
          alert('注册成功，请重新登录！');
          this.activeName = 'login';
        } else {
          console.log('error submit!');
          return false;
        }
      });
    },
    // loginToClick() {
    //   if (!this.noInput) {
    //     this.changeLoginStatus(this.loginMessage);
    //     if (this.isLogin) {
    //       alert('登录成功！');
    //       this.$router.push('/mapTrack');
    //     } else {
    //       this.showWarn = true;
    //     }
    //   } else { this.emptyLWarn = true; }
    // },
    // 注册 信息提交
    // regiToClick() {
    //   if (!this.noInput) {
    //     this.saveRegiMes(this.regiMessage);
    //     alert('注册成功，请重新登录！');
    //     this.activeName = 'login';
    //   } else { this.emptyRWarn = true; }
    // },
    inputHandleClick() {
      this.showWarn = false;
    },
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
  color: $--color-info;
  text-decoration: underline;
  margin-top: 50px;
}
.user-mes {
  width: 280px;
  margin: 0 auto;
  margin-top: 10px;
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
  color: $--color-danger;
}
</style>

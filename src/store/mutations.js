export default {
  NotLogin(state) {
    state.isLogin = false;
    localStorage.isLogin = false;
    console.log('changed');
  },
  // 判断登录的用户账号密码是否存在
  changeLoginStatus(state, mes) {
    try {
      if (state.users.Userid === mes.Userid && state.users.Password === mes.Password) {
        // 账号密码匹配成功，isLogin 为 true
        state.isLogin = true;
        localStorage.isLogin = true;
        console.log(state.users);
        console.log(state.isLogin);
      } else {
        // 不匹配则改为 false ，防止上一次匹配结果影响本次匹配
        state.isLogin = false;
        localStorage.isLogin = false;
        console.log(state.isLogin);
        console.log(state.users);
      }
    } catch (error) {}
  },
  // 保存用户注册的账号
  saveRegiMes(state, regimes) {
    try {
      localStorage.Userid = regimes.Userid;
      localStorage.Password = regimes.Password;
      state.users = regimes;
    } catch (error) {}
  }
};

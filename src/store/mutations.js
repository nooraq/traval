export default {
  NotLogin(state) {
    state.isLogin = false;
    localStorage.isLogin = false;
    console.log('login state changed');
  },
  // 判断登录的用户账号密码是否存在
  changeLoginStatus(state, mes) {
    try {
      if (state.users.username === mes.username && state.users.password === mes.password) {
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
      localStorage.username = regimes.username;
      localStorage.password = regimes.password;
      state.users = regimes;
      console.log('regi msg:');
      console.log(state.users);
    } catch (error) {}
  }
};

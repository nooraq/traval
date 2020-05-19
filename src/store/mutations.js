export default {
  NotLogin(state) {
    state.isLogin = false;
    localStorage.isLogin = false;
    console.log('unlogin!');
  },
  // 判断登录的用户账号密码是否存在
  changeLoginStatus(state, mes) {
    try {
      state.isLogin = true;
      localStorage.isLogin = true;
      localStorage.username = mes.username;
      localStorage.password = mes.password;
      localStorage.userid = mes.userid;
      state.user = mes;
      console.log(state.user);
      console.log('登录状态', state.isLogin, state.user);
    } catch (error) { console.log(''); }
  },
};

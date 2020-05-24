export default {
  NotLogin(state) {
    state.isLogin = false;
    localStorage.isLogin = false;
  },
  saveId(state, userid) {
    state.user.userid = userid;
    localStorage.userid = userid;
  },
  // 判断登录的用户账号密码是否存在
  changeLoginStatus(state, mes) {
    try {
      state.user.isLogin = true;
      state.user.username = mes.username;
      localStorage.isLogin = true;
      localStorage.username = mes.username;
      localStorage.password = mes.password;
    } catch (error) { console.log(''); }
  },
};

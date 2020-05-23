export default {
  NotLogin(state) {
    state.isLogin = false;
    localStorage.isLogin = false;
    console.log('unlogin!');
  },
  // 保存最近显示的文章的id
  changeArticleId(state,id) {
    state.latestArticleId = id;
    localStorage.latestArticleId = id;
  },
  saveId(state, userid) {
    state.userid = userid;
    localStorage.userid = userid;
    console.log('localStorage', localStorage.userid);
    console.log('state', state.userid);
  },
  // 判断登录的用户账号密码是否存在
  changeLoginStatus(state, mes) {
    try {
      state.isLogin = true;
      state.username = mes.username;
      localStorage.isLogin = true;
      localStorage.username = mes.username;
      localStorage.password = mes.password;
      console.log(state.user);
      console.log('登录状态', state.isLogin, state.user);
    } catch (error) { console.log(''); }
  },
};

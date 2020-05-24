export default {
  NotLogin(state) {
    state.isLogin = 0;
    localStorage.isLogin = '0';
  },
  // 保存最近显示的文章的id
  changeArticleId(state, id) {
    state.user.latestArticleId = id;
    localStorage.latestArticleId = id;
  },
  saveId(state, userid) {
    state.user.userid = userid;
    localStorage.userid = userid;
  },
  // 判断登录的用户账号密码是否存在
  changeLoginStatus(state, mes) {
    state.user.isLogin = 1;
    state.user.username = mes.username;
    localStorage.isLogin = '1';
    localStorage.username = mes.username;
    localStorage.password = mes.password;
  }
};

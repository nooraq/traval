export default {
  NotLogin(state) {
    //退出登录
    state.isLogin = 0;
    localStorage.isLogin = '0';
    localStorage.loginTime = null;
  },
  saveId(state, userid) {
    state.user.userid = userid;
    localStorage.userid = userid;
  },
  // 判断登录的用户账号密码是否存在
  changeLoginStatus(state, mes) {
    //添加一个登录态有效时间
    let loginTime = new Date();
    loginTime.setDate(loginTime.getDate() + 7);
    state.isLogin = 1;
    state.user.username = mes.username;
    localStorage.isLogin = '1';
    localStorage.loginTime = loginTime.getFullYear()+','+loginTime.getMonth()+','+loginTime.getDate();
    console.log(localStorage.loginTime);
    localStorage.username = mes.username;
    localStorage.password = mes.password;
  }
};

let defaultUsers = {
  username: '',
  password: '',
  userid: null
};
let defaultIsLogin = false;
try {
  if (window.localStorage) {
    defaultIsLogin = localStorage.isLogin;
    defaultUsers.username = localStorage.username;
    defaultUsers.password = localStorage.password;
    defaultUsers.userid = localStorage.userid;
  }
} catch (error) {
}

export default {
  isLogin: defaultIsLogin,
  user: defaultUsers,
}
let defaultUsers = {
  username: '',
  password: ''
};
let defaultIsLogin = false;
try {
  if (window.localStorage) {
    defaultIsLogin = localStorage.isLogin;
    defaultUsers.username = localStorage.username;
    defaultUsers.password = localStorage.password;
    defaultUsers.signDate = localStorage.signDate;
  }
} catch (error) {
}

export default {
  isLogin: defaultIsLogin,
  token: '',
  users: defaultUsers
}
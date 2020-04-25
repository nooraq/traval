let defaultUsers = {
  Userid: '',
  Password: ''
};
let defaultIsLogin = false;
try {
  if (window.localStorage) {
    defaultIsLogin = localStorage.isLogin;
    defaultUsers.Userid = localStorage.Userid;
    defaultUsers.Password = localStorage.Password;
    defaultUsers.signDate = localStorage.signDate;
  }
} catch (error) {
}

export default {
  isLogin: defaultIsLogin,
  token: '',
  users: defaultUsers
}
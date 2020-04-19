let defaultUsers = {
  UserName:'',
  Userid: '',
  Password: '',
  signDate: null

};
let defaultIsLogin = false;
try {
  if (window.localStorage) {
    defaultIsLogin = localStorage.isLogin;
    defaultUsers.Userid = localStorage.Userid;
    defaultUsers.Password = localStorage.Password;
    defaultUsers.UserName = localStorage.UserName;
    defaultUsers.signDate = localStorage.signDate;
  }
} catch (error) {
}

export default {
  isLogin: defaultIsLogin,
  token: '',
  users: defaultUsers
}
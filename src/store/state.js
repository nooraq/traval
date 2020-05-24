const defaultUsers = {
  username: '',
  password: '',
  userid: null,
};
let defaultIsLogin = 0;
if (window.localStorage) {
  if (localStorage.isLogin === undefined) {
    defaultIsLogin = 0;
  } else {
    defaultIsLogin = parseInt(localStorage.isLogin, 10);
  }
  defaultUsers.username = localStorage.username;
  defaultUsers.password = localStorage.password;
  defaultUsers.userid = parseInt(localStorage.userid, 10);
}

export default {
  isLogin: defaultIsLogin,
  user: defaultUsers,
  allLocals: [
    { value: '北京' },
    { value: '天津市' },
    { value: '上海市' },
    { value: '重庆市' },
    { value: '河北' },
    { value: '河南' },
    { value: '云南' },
    { value: '辽宁' },
    { value: '黑龙江' },
    { value: '湖南' },
    { value: '安徽' },
    { value: '山东' },
    { value: '新疆' },
    { value: '江苏' },
    { value: '浙江' },
    { value: '江西' },
    { value: '湖北' },
    { value: '广西壮族自治区' },
    { value: '甘肃' },
    { value: '山西' },
    { value: '内蒙古自治区' },
    { value: '陕西' },
    { value: '吉林' },
    { value: '福建' },
    { value: '贵州' },
    { value: '广东' },
    { value: '青海' },
    { value: '西藏自治区' },
    { value: '四川' },
    { value: '宁夏回族自治区' },
    { value: '海南' },
    { value: '台湾' },
    { value: '香港特别行政区' },
    { value: '澳门特别行政区' }
  ]
};

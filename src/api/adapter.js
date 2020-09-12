/**
 * axios
 * api: https://github.com/axios/axios
 */

import axios from 'axios';
import { domains } from '@/config';
import { Message } from 'element-ui';

// eslint-disable-next-line no-unused-vars
const getInstance = (baseURL) => {
  const instance = axios.create({
    baseURL: 'http://59.110.225.87:9000/',
    timeout: 30000,
    withCredentials: false,
    // headers: {

    // }
  });
  instance.interceptors.response.use((response = {}) => {
    const { data: { status, ret }, data } = response;
    if (status === 200 || ret === 0) {
      return data;
    }
    Message.error(data.msg || data.message);
    return Promise.reject(response.data);
  }, error => Promise.reject(error));
  return instance;
};

export const demo = getInstance(domains.demo);

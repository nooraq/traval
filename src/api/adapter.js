/**
 * axios
 * api: https://github.com/axios/axios
 */

import axios from 'axios';
import { domains } from '@/config';

// eslint-disable-next-line no-unused-vars
const getInstance = (baseURL) => {
  const instance = axios.create({
    baseURL: 'http://175.24.28.193:8080/',
    timeout: 30000,
    withCredentials: false,
    // headers: {

    // }
  });
  instance.interceptors.response.use((response = {}) => {
    const { data: { code, ret }, data } = response;
    if (code === 200 || ret === 0) {
      return data;
    }
    return Promise.reject(response.data);
  }, error => Promise.reject(error));
  return instance;
};

export const demo = getInstance(domains.demo);

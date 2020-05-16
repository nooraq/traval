/**
 * axios
 * api: https://github.com/axios/axios
 */

import axios from 'axios';
import { domains } from '@/config';

const getInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
    timeout: 30000,
    withCredentials: false,
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

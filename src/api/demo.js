import { Message } from 'element-ui';
import { demo } from './adapter';

export const getLocation = async (params) => {
  try {
    const res = await demo.get('/article', {
      params
    });
    return res;
  } catch (e) {
    Message.error(e);
  }
};

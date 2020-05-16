import { demo } from './adapter';

export const getLocation = async (params) => {
  await demo.get('/article', {
    params
  });
};

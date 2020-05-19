import qs from 'qs';
import { demo } from '@/api/adapter';

export default url => async params => await demo.post(url, qs.stringify(params));

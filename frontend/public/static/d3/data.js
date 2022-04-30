'use strict'
import { getCookie } from 'cookies-next';

let staticData = {
  server: getCookie('server') ? getCookie('server') : 'Mari',
  data: []
};
export default staticData;

import cloudscraper from 'cloudscraper';
import {
  URLOptions
} from '../interfaces/url';

export const req = (url: string): Promise<any> =>{
  return new Promise(async(resolve, reject) =>{
    try {
      const options: URLOptions = {
        uri: url,
        method: 'GET'
      };
      const res = await cloudscraper(options)
      resolve(res);
    } catch (err) {
      reject(err)
    }
  })
};
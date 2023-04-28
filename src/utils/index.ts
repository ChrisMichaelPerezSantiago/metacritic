import axios from "axios";
import { URLOptions } from "../interfaces/url";

export const req = (url: string): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const options: URLOptions = {
        url: url,
        method: "GET",
      };
      const { data } = await axios(options);

      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
};

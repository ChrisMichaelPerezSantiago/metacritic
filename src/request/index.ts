import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

type Props = AxiosRequestConfig;

export default function request(props: Props): Promise<any> {
  return new Promise((resolve, reject) => {
    axios(props)
      .then((response: AxiosResponse) => {
        resolve(response.data);
      })
      .catch((error: AxiosError) => {
        if (error.response) {
          reject(error.response.data);
        } else if (error.request) {
          reject("No response received");
        } else {
          reject("Error occurred while making the request");
        }
      });
  });
}

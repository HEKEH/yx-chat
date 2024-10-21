import { RESPONSE_CODE } from '@yx-chat/shared/types';
import axios, { AxiosRequestConfig } from 'axios';
import { ElNotification } from 'element-plus';
import { ResponseDataWrapper } from '../types';

interface CommonRequestParams<RequestParams> {
  baseURL: string;
  method: 'get' | 'post';
  path: string;
  params?: RequestParams;
  headers?: Record<string, string | undefined>;
  data?: FormData;
}

const commonRequest = async <
  ResponseData,
  RequestParams extends Record<string, any> = Record<string, any>,
>({
  baseURL,
  method,
  path,
  params,
  headers,
  data: requestData,
}: CommonRequestParams<RequestParams>): Promise<
  ResponseDataWrapper<ResponseData>
> => {
  const config: AxiosRequestConfig = {
    method,
    baseURL,
    url: path,
    headers,
    // {
    //   ...headers,
    //   'Access-Control-Allow-Origin': '*', // 添加跨域头
    // },
  };
  if (params) {
    if (method === 'get') {
      config.params = params;
    } else if (method === 'post') {
      config.data = params;
    }
  } else if (requestData) {
    config.data = requestData;
  }
  const { data } = await axios<ResponseDataWrapper<ResponseData>>(config);
  if (data.status !== RESPONSE_CODE.SUCCESS) {
    ElNotification.error({
      message: data.message,
    });
  }
  return data;
};

export default commonRequest;

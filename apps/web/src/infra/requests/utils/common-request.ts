import { RESPONSE_CODE } from '@yx-chat/shared/types';
import axios, { AxiosRequestConfig } from 'axios';
import { ElNotification } from 'element-plus';
import { LANGUAGE_HEADER_KEY } from '@yx-chat/shared/constants';
import i18n from '~/infra/i18n';
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
    headers: {
      [LANGUAGE_HEADER_KEY]: i18n.global.locale.value,
      ...headers,
    },
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

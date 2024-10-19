import { RESPONSE_CODE } from '@yx-chat/shared/types';
import { logger } from '@yx-chat/shared/logger';
import axios, { AxiosRequestConfig } from 'axios';
import { ResponseDataWrapper } from '../types';

interface CommonRequestParams<RequestParams> {
  baseURL: string;
  method: 'get' | 'post';
  path: string;
  params?: RequestParams;
  headers?: Record<string, string | undefined>;
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
}: CommonRequestParams<RequestParams>): Promise<
  ResponseDataWrapper<ResponseData>
> => {
  try {
    const config: AxiosRequestConfig = {
      method,
      baseURL,
      url: path,
      headers,
    };
    if (params) {
      if (method === 'get') {
        config.params = params;
      } else if (method === 'post') {
        config.data = params;
      }
    }
    logger.log('[request] config:', config);
    const { data } = await axios<ResponseDataWrapper<ResponseData>>(config);
    if (data.status === RESPONSE_CODE.SUCCESS) {
      logger.log('[response] success:', data.data);
    } else {
      logger.error('[response] business error:', data.message);
    }
    return data;
  } catch (error) {
    logger.error('[response] system error:', error);
    throw error;
  }
};

export default commonRequest;

import { RESPONSE_CODE } from '@yx-chat/shared/types';
import axios, { AxiosRequestConfig } from 'axios';
import logger from '~/utils/logger';
import { LANGUAGE } from '@yx-chat/shared/constants';
import { ResponseDataWrapper } from '../types';

interface CommonRequestParams<RequestParams> {
  baseURL: string;
  method: 'get' | 'post';
  path: string;
  params: RequestParams;
  lng?: LANGUAGE;
}

const commonRequest = async <
  ResponseData,
  RequestParams extends Record<string, any> = Record<string, any>,
>({
  baseURL,
  method,
  path,
  params,
  lng,
}: CommonRequestParams<RequestParams>): Promise<
  ResponseDataWrapper<ResponseData>
> => {
  try {
    const config: AxiosRequestConfig = {
      method,
      baseURL,
      url: path,
      headers: {
        'X-Language': lng,
      },
    };

    if (method === 'get') {
      config.params = params;
    } else if (method === 'post') {
      config.data = params;
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

import { TOKEN_HEADER_KEY } from '@yx-chat/shared/constants';
import { UploadFileSuccessResponse } from '@yx-chat/shared/types';
import config from '~/config';
import getToken from '../local-storage-store/get-token';
import commonRequest from './utils/common-request';

const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  return commonRequest<UploadFileSuccessResponse>({
    baseURL: config.fileCenterUrl,
    method: 'post',
    path: '/upload',
    headers: {
      [TOKEN_HEADER_KEY]: getToken(),
    },
    data: formData,
  });
};
export default uploadFile;

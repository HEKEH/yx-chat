import { TOKEN_HEADER_KEY } from '@yx-chat/shared/constants';
import { UploadFilesSuccessResponse } from '@yx-chat/shared/types';
import config from '~/config';
import getToken from '../local-storage-store/get-token';
import commonRequest from './utils/common-request';

const uploadFiles = async (files: File[]) => {
  const formData = new FormData();
  files.forEach(file => {
    formData.append('files', file);
  });

  return commonRequest<UploadFilesSuccessResponse>({
    baseURL: config.fileCenterUrl,
    method: 'post',
    path: '/upload-files',
    headers: {
      [TOKEN_HEADER_KEY]: getToken(),
    },
    data: formData,
  });
};
export default uploadFiles;

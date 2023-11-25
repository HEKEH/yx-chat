import type {
  LoginRequestBody,
  LoginSuccessResponse,
  ErrorResponse,
} from '@yx-chat/shared/types';
import { errorResponse } from '@yx-chat/shared/utils';
import logger from '../../utils/logger';
import { SocketContext } from '../context';

export default async function login(
  context: SocketContext,
  data: LoginRequestBody,
): Promise<LoginSuccessResponse | ErrorResponse> {
  const { username, password, os, browser, environment } = data;
  logger.info(`login ${username}`);
  return errorResponse('Not implement yet');
}

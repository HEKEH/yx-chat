import { ErrorResponse } from '../types/error';

export function isErrorResponse(response: any): response is ErrorResponse {
  return (
    response &&
    response instanceof Object &&
    response.status === 'error' &&
    typeof response.message === 'string'
  );
}

export function errorResponse(message: string): ErrorResponse {
  return { status: 'error', message };
}

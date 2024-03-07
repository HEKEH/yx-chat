import { ErrorResponse } from '../types/error.mjs';

declare function isErrorResponse(response: any): response is ErrorResponse;
declare function errorResponse(message: string): ErrorResponse;

export { errorResponse, isErrorResponse };

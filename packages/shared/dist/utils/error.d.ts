import { ErrorResponse } from '../types/error.js';

declare function isErrorResponse(response: any): response is ErrorResponse;
declare function errorResponse(message: string): ErrorResponse;

export { errorResponse, isErrorResponse };

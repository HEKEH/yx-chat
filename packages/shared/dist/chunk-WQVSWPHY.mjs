// src/utils/error.ts
function isErrorResponse(response) {
  return response && response instanceof Object && response.status === "error" && typeof response.message === "string";
}
function errorResponse(message) {
  return { status: "error", message };
}

export {
  isErrorResponse,
  errorResponse
};

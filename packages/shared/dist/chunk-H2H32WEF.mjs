import {
  LANGUAGE_HEADER_KEY,
  LOG_ID_HEADER_KEY,
  TOKEN_HEADER_KEY
} from "./chunk-Z2QSX4GD.mjs";

// src/utils/middlewares.ts
function corsMiddleware(allowOrigin) {
  return async (ctx, next) => {
    ctx.set("Access-Control-Allow-Origin", allowOrigin);
    ctx.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    ctx.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, Accept"
    );
    ctx.set("Access-Control-Max-Age", "1000");
    ctx.set(
      "Access-Control-Allow-Headers",
      `Content-Type, Authorization, Accept, ${TOKEN_HEADER_KEY}, ${LOG_ID_HEADER_KEY}, ${LANGUAGE_HEADER_KEY}`
    );
    if (ctx.method === "OPTIONS") {
      ctx.status = 204;
      return;
    }
    await next();
  };
}

export {
  corsMiddleware
};

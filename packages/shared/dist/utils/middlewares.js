"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/utils/middlewares.ts
var middlewares_exports = {};
__export(middlewares_exports, {
  corsMiddleware: () => corsMiddleware
});
module.exports = __toCommonJS(middlewares_exports);

// src/constants/language.ts
var LANGUAGE = /* @__PURE__ */ ((LANGUAGE2) => {
  LANGUAGE2["EN"] = "en";
  LANGUAGE2["ZH_CN"] = "zh-cn";
  return LANGUAGE2;
})(LANGUAGE || {});
var ACCEPT_LANGUAGES = Object.values(LANGUAGE);

// src/constants/index.ts
var TOKEN_HEADER_KEY = "x-yx-token";
var LOG_ID_HEADER_KEY = "x-yx-log-id";
var LANGUAGE_HEADER_KEY = "x-language";

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  corsMiddleware
});

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

// src/constants/index.ts
var constants_exports = {};
__export(constants_exports, {
  ACCEPT_LANGUAGES: () => ACCEPT_LANGUAGES,
  LANGUAGE: () => LANGUAGE,
  LANGUAGE_HEADER_KEY: () => LANGUAGE_HEADER_KEY,
  LOG_ID_HEADER_KEY: () => LOG_ID_HEADER_KEY,
  NAME_REGEXP: () => NAME_REGEXP,
  TOKEN_HEADER_KEY: () => TOKEN_HEADER_KEY
});
module.exports = __toCommonJS(constants_exports);

// src/constants/language.ts
var LANGUAGE = /* @__PURE__ */ ((LANGUAGE2) => {
  LANGUAGE2["EN"] = "en";
  LANGUAGE2["ZH_CN"] = "zh-cn";
  return LANGUAGE2;
})(LANGUAGE || {});
var ACCEPT_LANGUAGES = Object.values(LANGUAGE);

// src/constants/name.ts
var NAME_REGEXP = /^([0-9a-zA-Z]{1,2}|[\u4e00-\u9eff]|[\u3040-\u309Fー]|[\u30A0-\u30FF]){1,8}$/;

// src/constants/index.ts
var TOKEN_HEADER_KEY = "x-yx-token";
var LOG_ID_HEADER_KEY = "x-yx-log-id";
var LANGUAGE_HEADER_KEY = "x-language";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ACCEPT_LANGUAGES,
  LANGUAGE,
  LANGUAGE_HEADER_KEY,
  LOG_ID_HEADER_KEY,
  NAME_REGEXP,
  TOKEN_HEADER_KEY
});

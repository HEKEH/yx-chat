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

// src/utils/index.ts
var utils_exports = {};
__export(utils_exports, {
  enum2KeyArray: () => enum2KeyArray,
  enum2ValueArray: () => enum2ValueArray,
  errorResponse: () => errorResponse,
  getRandomAvatarPath: () => getRandomAvatarPath,
  isErrorResponse: () => isErrorResponse,
  regexEscape: () => regexEscape
});
module.exports = __toCommonJS(utils_exports);

// src/utils/error.ts
function isErrorResponse(response) {
  return response && response instanceof Object && response.status === "error" && typeof response.message === "string";
}
function errorResponse(message) {
  return { status: "error", message };
}

// src/utils/enum.ts
function enum2ValueArray(obj) {
  const values = Object.values(obj);
  return values;
}
function enum2KeyArray(obj) {
  const values = Object.keys(obj);
  return values;
}

// src/utils/regex.ts
function regexEscape(input) {
  return input.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&");
}

// src/utils/avatar.ts
var AVATAR_COUNT = 15;
function getRandomAvatarPath() {
  const number = Math.floor(Math.random() * AVATAR_COUNT);
  return `/avatar/${number}.jpg`;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  enum2KeyArray,
  enum2ValueArray,
  errorResponse,
  getRandomAvatarPath,
  isErrorResponse,
  regexEscape
});

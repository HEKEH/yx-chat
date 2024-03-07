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

// utils/index.ts
var utils_exports = {};
__export(utils_exports, {
  enum2KeyArray: () => enum2KeyArray,
  enum2ValueArray: () => enum2ValueArray,
  errorResponse: () => errorResponse,
  isErrorResponse: () => isErrorResponse,
  regexEscape: () => regexEscape
});
module.exports = __toCommonJS(utils_exports);

// utils/error.ts
function isErrorResponse(response) {
  return response && response instanceof Object && response.status === "error" && typeof response.message === "string";
}
function errorResponse(message) {
  return { status: "error", message };
}

// utils/enum.ts
function enum2ValueArray(obj) {
  const values = Object.values(obj);
  return values.slice(values.length / 2);
}
function enum2KeyArray(obj) {
  const values = Object.values(obj);
  return values.slice(0, values.length / 2);
}

// utils/regex.ts
function regexEscape(input) {
  return input.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  enum2KeyArray,
  enum2ValueArray,
  errorResponse,
  isErrorResponse,
  regexEscape
});

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

// src/types/response.ts
var response_exports = {};
__export(response_exports, {
  RESPONSE_CODE: () => RESPONSE_CODE
});
module.exports = __toCommonJS(response_exports);
var RESPONSE_CODE = /* @__PURE__ */ ((RESPONSE_CODE2) => {
  RESPONSE_CODE2[RESPONSE_CODE2["SUCCESS"] = 0] = "SUCCESS";
  RESPONSE_CODE2[RESPONSE_CODE2["BIZ_ERROR"] = 1] = "BIZ_ERROR";
  RESPONSE_CODE2[RESPONSE_CODE2["SERVER_ERROR"] = 2] = "SERVER_ERROR";
  return RESPONSE_CODE2;
})(RESPONSE_CODE || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RESPONSE_CODE
});

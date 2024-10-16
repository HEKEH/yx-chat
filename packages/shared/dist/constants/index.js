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

// constants/index.ts
var constants_exports = {};
__export(constants_exports, {
  ACCEPT_LANGUAGES: () => ACCEPT_LANGUAGES,
  LANGUAGE: () => LANGUAGE
});
module.exports = __toCommonJS(constants_exports);

// constants/language.ts
var LANGUAGE = /* @__PURE__ */ ((LANGUAGE2) => {
  LANGUAGE2["EN"] = "en";
  LANGUAGE2["ZH_CN"] = "zh-cn";
  return LANGUAGE2;
})(LANGUAGE || {});
var ACCEPT_LANGUAGES = Object.values(LANGUAGE);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ACCEPT_LANGUAGES,
  LANGUAGE
});

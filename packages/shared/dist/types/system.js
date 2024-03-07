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

// types/system.ts
var system_exports = {};
__export(system_exports, {
  SystemRequestType: () => SystemRequestType
});
module.exports = __toCommonJS(system_exports);
var SystemRequestType = /* @__PURE__ */ ((SystemRequestType2) => {
  SystemRequestType2["searchUsersAndGroups"] = "searchUsersAndGroups";
  return SystemRequestType2;
})(SystemRequestType || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SystemRequestType
});

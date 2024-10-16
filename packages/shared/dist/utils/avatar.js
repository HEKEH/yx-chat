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

// utils/avatar.ts
var avatar_exports = {};
__export(avatar_exports, {
  getRandomAvatarPath: () => getRandomAvatarPath
});
module.exports = __toCommonJS(avatar_exports);
var AVATAR_COUNT = 15;
function getRandomAvatarPath() {
  const number = Math.floor(Math.random() * AVATAR_COUNT);
  return `/avatar/${number}.jpg`;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getRandomAvatarPath
});